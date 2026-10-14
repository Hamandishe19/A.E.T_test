/**
 * Absolute Electronic Technologies - Client Relations Assistant
 * Core Client-side State, Markdown Rendering, AI Simulation, and Interactive UI Logic
 */

(function () {
  'use strict';

  // --- Configuration & Default State ---
  const STORAGE_KEYS = {
    CONVERSATIONS: 'chatgpt_clone_conversations',
    ACTIVE_ID: 'chatgpt_clone_active_id',
    SETTINGS: 'chatgpt_clone_settings',
    THEME: 'chatgpt_clone_theme'
  };

  const MAX_ATTACHMENT_BYTES = 15 * 1024 * 1024;
  const RAG_SERVER_PORT = '3000';
  const ASSISTANT_NAME = 'Tendai';
  const ASSISTANT_ROLE = 'Client Relations Assistant';
  const COMPANY_NAME = 'Absolute Electronic Technologies';
  const QUICK_REPLIES = [
    'I want solar for my home',
    'Backup power for my business',
    'Warranty and returns',
    'How can I contact you?'
  ];

  const DEFAULT_SETTINGS = {
    theme: 'light',
    voiceAccent: 'default',
    streamingEnabled: true,
    customInstructions: '',
    ragEndpoint: '/api/chat',
    ragEnabled: true,
    designVersion: 3
  };

  const state = {
    conversations: [],
    activeConversationId: null,
    currentModel: 'gpt-4o',
    isTemporaryChat: false,
    isGenerating: false,
    abortController: null,
    searchWebActive: false,
    reasoningActive: false,
    attachedFiles: [],
    settings: { ...DEFAULT_SETTINGS },
    isVoiceSessionActive: false,
    speechRecognition: null,
    isListeningVoice: false,
    currentSpeechUtterance: null
  };

  // DOM Elements Cache
  const elements = {
    app: document.getElementById('app'),
    sidebar: document.getElementById('sidebar'),
    sidebarBackdrop: document.getElementById('sidebar-backdrop'),
    sidebarToggleBtn: document.getElementById('sidebar-toggle-btn'),
    sidebarCloseBtn: document.getElementById('sidebar-close-btn'),
    newChatBtn: document.getElementById('new-chat-btn'),
    chatList: document.getElementById('chat-list'),
    openSearchModalBtn: document.getElementById('open-search-modal-btn'),
    userProfileBtn: document.getElementById('user-profile-btn'),
    
    // Header
    currentModelName: document.getElementById('current-model-name'),
    shareChatBtn: document.getElementById('share-chat-btn'),

    // Chat Area
    chatCanvas: document.getElementById('chat-canvas'),
    heroState: document.getElementById('hero-state'),
    messagesContainer: document.getElementById('messages-container'),
    scrollBottomBtn: document.getElementById('scroll-bottom-btn'),

    // Input Section
    promptInput: document.getElementById('prompt-input'),
    sendBtn: document.getElementById('send-btn'),
    sendIcon: document.getElementById('send-icon'),
    stopIcon: document.getElementById('stop-icon'),
    attachmentTray: document.getElementById('attachment-tray'),

    // Fullscreen Voice Overlay
    voiceOverlay: document.getElementById('voice-overlay'),
    closeVoiceBtn: document.getElementById('close-voice-btn'),
    voiceOrb: document.getElementById('voice-orb'),
    voiceStatusText: document.getElementById('voice-status-text'),
    voiceTranscript: document.getElementById('voice-transcript'),
    voiceMuteBtn: document.getElementById('voice-mute-btn'),
    muteLabel: document.getElementById('mute-label'),
    endVoiceBtn: document.getElementById('end-voice-btn'),

    // Modals
    settingsModal: document.getElementById('settings-modal'),
    closeSettingsModalBtn: document.getElementById('close-settings-modal-btn'),
    searchModal: document.getElementById('search-modal'),
    chatSearchInput: document.getElementById('chat-search-input'),
    searchResultsList: document.getElementById('search-results-list'),
    closeSearchModalBtn: document.getElementById('close-search-modal-btn'),
    shareModal: document.getElementById('share-modal'),
    closeShareModalBtn: document.getElementById('close-share-modal-btn'),
    copyShareLinkBtn: document.getElementById('copy-share-link-btn'),
    shareLinkInput: document.getElementById('share-link-input'),
    exportMarkdownBtn: document.getElementById('export-markdown-btn'),

    // Settings fields
    themeSelect: document.getElementById('theme-select'),
    voiceAccentSelect: document.getElementById('voice-accent-select'),
    streamSpeedCheckbox: document.getElementById('stream-speed-checkbox'),
    customInstructionsInput: document.getElementById('custom-instructions'),
    ragEndpointInput: document.getElementById('rag-endpoint-input'),
    enableRagCheckbox: document.getElementById('enable-rag-checkbox'),
    exportChatsBtn: document.getElementById('export-chats-btn'),
    clearAllChatsBtn: document.getElementById('clear-all-chats-btn'),
    toastContainer: document.getElementById('toast-container')
  };

  // --- Initialization ---
  function init() {
    loadSettings();
    loadConversations();
    setupMarkdownRenderer();
    setupEventListeners();
    setupSpeechRecognition();
    renderSidebar();
    renderActiveConversation();
    autoResizeTextarea();
  }

  // --- LocalStorage & Settings Persistence ---
  function loadSettings() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        state.settings = { ...DEFAULT_SETTINGS, ...parsed };
        if (parsed.designVersion !== DEFAULT_SETTINGS.designVersion) {
          // The redesign starts everyone on the light theme; a theme chosen afterwards is kept
          state.settings.theme = DEFAULT_SETTINGS.theme;
          state.settings.designVersion = DEFAULT_SETTINGS.designVersion;
        }
        // Settings saved before the built-in RAG server existed have no endpoint; point them at it
        if (!state.settings.ragEndpoint) {
          state.settings.ragEndpoint = DEFAULT_SETTINGS.ragEndpoint;
          state.settings.ragEnabled = DEFAULT_SETTINGS.ragEnabled;
        }
      }
    } catch (e) {
      console.warn('Failed to parse settings:', e);
    }
    applyTheme(state.settings.theme);
    syncSettingsUI();
  }

  function saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(state.settings));
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  }

  function syncSettingsUI() {
    if (elements.themeSelect) elements.themeSelect.value = state.settings.theme;
    if (elements.voiceAccentSelect) elements.voiceAccentSelect.value = state.settings.voiceAccent;
    if (elements.streamSpeedCheckbox) elements.streamSpeedCheckbox.checked = state.settings.streamingEnabled;
    if (elements.customInstructionsInput) elements.customInstructionsInput.value = state.settings.customInstructions;
    if (elements.ragEndpointInput) elements.ragEndpointInput.value = state.settings.ragEndpoint;
    if (elements.enableRagCheckbox) elements.enableRagCheckbox.checked = state.settings.ragEnabled;
  }

  function applyTheme(theme) {
    let resolvedTheme = theme;
    if (theme === 'system') {
      resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', resolvedTheme);
  }

  // Chats live only in this page: a refresh forgets them and starts with a fresh greeting.
  function loadConversations() {
    try {
      // Remove chats saved by earlier versions of the app
      localStorage.removeItem(STORAGE_KEYS.CONVERSATIONS);
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_ID);
    } catch (e) {
      console.warn('Could not clear saved conversations:', e);
    }
    state.conversations = [];
    const conv = buildGreetedConversation();
    state.conversations.push(conv);
    state.activeConversationId = conv.id;
  }

  // Kept as a hook for every place that changes a chat; nothing is written to the browser.
  function saveConversations() {}

  function timeOfDayGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }

  // Every conversation opens with the assistant introducing itself and asking who it is speaking to.
  function buildGreetedConversation() {
    const now = Date.now();
    return {
      id: 'conv-' + now,
      title: 'New conversation',
      createdAt: now,
      updatedAt: now,
      messages: [{
        id: 'msg-a-' + now,
        role: 'assistant',
        isGreeting: true,
        content: `${timeOfDayGreeting()}, and welcome to **${COMPANY_NAME}**.\n\n` +
          `My name is **${ASSISTANT_NAME}**, your ${ASSISTANT_ROLE}. I can help with our solar products, quotations, warranties and company policies.\n\n` +
          `Before we begin, may I have your **name** and the **company or organisation** you represent?`,
        timestamp: now
      }]
    };
  }

  function hasClientMessages(conv) {
    return conv.messages.some(m => m.role === 'user');
  }

  // --- Markdown Configuration ---
  function setupMarkdownRenderer() {
    if (typeof marked !== 'undefined') {
      const renderer = new marked.Renderer();

      renderer.code = function ({ text, lang }) {
        const language = lang && hljs.getLanguage(lang) ? lang : '';
        let highlighted = text;
        try {
          if (language) {
            highlighted = hljs.highlight(text, { language }).value;
          } else {
            highlighted = hljs.highlightAuto(text).value;
          }
        } catch (e) {
          highlighted = escapeHtml(text);
        }

        const encoded = encodeURIComponent(text);
        return `
          <div class="code-block-wrapper">
            <div class="code-block-header">
              <span>${escapeHtml(language || 'code')}</span>
              <button class="copy-code-btn" data-code="${encoded}" aria-label="Copy code to clipboard">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                <span>Copy code</span>
              </button>
            </div>
            <pre><code class="hljs ${escapeHtml(language)}">${highlighted}</code></pre>
          </div>
        `;
      };

      marked.setOptions({
        renderer: renderer,
        breaks: true,
        gfm: true
      });
    }
  }

  // --- Conversation Management ---
  function getActiveConversation() {
    return state.conversations.find(c => c.id === state.activeConversationId) || null;
  }

  function createNewConversation() {
    // If the client has not written anything in the current conversation yet, just keep it
    const active = getActiveConversation();
    if (active && !hasClientMessages(active)) {
      renderActiveConversation();
      focusInput();
      return;
    }

    const newConv = buildGreetedConversation();
    const newId = newConv.id;

    if (!state.isTemporaryChat) {
      state.conversations.unshift(newConv);
      state.activeConversationId = newId;
      saveConversations();
    } else {
      state.activeConversationId = newId;
    }

    renderSidebar();
    renderActiveConversation();
    focusInput();
    closeMobileSidebar();
  }

  function switchConversation(convId) {
    if (state.isGenerating) {
      showToast('Please wait or stop the current generation first');
      return;
    }
    state.activeConversationId = convId;
    saveConversations();
    renderSidebar();
    renderActiveConversation();
    focusInput();
    closeMobileSidebar();
  }

  function deleteConversation(convId, e) {
    if (e) e.stopPropagation();
    state.conversations = state.conversations.filter(c => c.id !== convId);
    if (state.conversations.length === 0) {
      state.conversations.push(buildGreetedConversation());
    }
    if (state.activeConversationId === convId) {
      state.activeConversationId = state.conversations[0].id;
    }
    saveConversations();
    renderSidebar();
    renderActiveConversation();
    showToast('Conversation deleted');
  }

  function renameConversation(convId, newTitle, e) {
    if (e) e.stopPropagation();
    const conv = state.conversations.find(c => c.id === convId);
    if (conv && newTitle.trim()) {
      conv.title = newTitle.trim();
      saveConversations();
      renderSidebar();
    }
  }

  // --- Sidebar Rendering & Grouping ---
  function renderSidebar() {
    if (!elements.chatList) return;
    elements.chatList.innerHTML = '';

    if (state.conversations.length === 0) {
      elements.chatList.innerHTML = `<div style="padding: 16px 10px; font-size: 13px; color: var(--text-muted); text-align: center;">No chat history yet</div>`;
      return;
    }

    const groups = categorizeConversations(state.conversations);

    for (const [groupName, convList] of Object.entries(groups)) {
      if (convList.length === 0) continue;

      const heading = document.createElement('div');
      heading.className = 'chat-group-heading';
      heading.textContent = groupName;
      elements.chatList.appendChild(heading);

      convList.forEach(conv => {
        const item = document.createElement('div');
        item.className = `chat-item ${conv.id === state.activeConversationId ? 'active' : ''}`;
        item.dataset.id = conv.id;

        item.innerHTML = `
          <span class="chat-item-title" title="${escapeHtml(conv.title)}">${escapeHtml(conv.title)}</span>
          <div class="chat-item-actions">
            <button class="chat-action-btn rename-btn tooltip-trigger" data-tooltip="Rename" aria-label="Rename chat">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
            </button>
            <button class="chat-action-btn delete-btn tooltip-trigger" data-tooltip="Delete" aria-label="Delete chat">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        `;

        item.addEventListener('click', () => switchConversation(conv.id));

        const renameBtn = item.querySelector('.rename-btn');
        renameBtn.addEventListener('click', (ev) => {
          ev.stopPropagation();
          promptRename(conv.id, conv.title, item);
        });

        const deleteBtn = item.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', (ev) => deleteConversation(conv.id, ev));

        elements.chatList.appendChild(item);
      });
    }
  }

  function promptRename(convId, currentTitle, itemEl) {
    const titleSpan = itemEl.querySelector('.chat-item-title');
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentTitle;
    input.className = 'settings-input';
    input.style.width = '100%';
    input.style.padding = '2px 6px';
    input.style.fontSize = '13px';

    titleSpan.replaceWith(input);
    input.focus();
    input.select();

    function finish() {
      renameConversation(convId, input.value);
    }

    input.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') finish();
      if (ev.key === 'Escape') renderSidebar();
    });

    input.addEventListener('blur', finish);
  }

  function categorizeConversations(convs) {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const groups = {
      'Today': [],
      'Yesterday': [],
      'Previous 7 Days': [],
      'Earlier': []
    };

    convs.forEach(c => {
      const diff = now - (c.updatedAt || c.createdAt);
      if (diff < oneDay) {
        groups['Today'].push(c);
      } else if (diff < 2 * oneDay) {
        groups['Yesterday'].push(c);
      } else if (diff < 7 * oneDay) {
        groups['Previous 7 Days'].push(c);
      } else {
        groups['Earlier'].push(c);
      }
    });

    return groups;
  }

  // --- Active Conversation & Message Rendering ---
  function renderActiveConversation() {
    const conv = getActiveConversation();

    if (!conv || conv.messages.length === 0) {
      elements.heroState.classList.remove('hidden');
      elements.messagesContainer.classList.add('hidden');
      elements.messagesContainer.innerHTML = '';
      return;
    }

    elements.heroState.classList.add('hidden');
    elements.messagesContainer.classList.remove('hidden');
    elements.messagesContainer.innerHTML = '';

    conv.messages.forEach(msg => {
      const row = createMessageRowElement(msg);
      elements.messagesContainer.appendChild(row);
    });

    scrollToBottom();
  }

  function createMessageRowElement(msg) {
    const row = document.createElement('div');
    row.className = `message-row ${msg.role}`;
    row.dataset.id = msg.id;

    if (msg.role === 'user') {
      let attachmentsHtml = '';
      if (msg.attachments && msg.attachments.length > 0) {
        attachmentsHtml = `
          <div class="user-msg-attachments">
            ${msg.attachments.map(att => `
              <div class="msg-attachment-chip">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                <span>${escapeHtml(att.name)}</span>
              </div>
            `).join('')}
          </div>
        `;
      }

      row.innerHTML = `
        <div class="message-bubble">
          ${attachmentsHtml}
          <div class="user-text">${escapeHtml(msg.content)}</div>
        </div>
      `;
    } else {
      // Assistant message
      let reasoningHtml = '';
      if (msg.reasoning) {
        reasoningHtml = `
          <div class="reasoning-box">
            <div class="reasoning-header">
              <svg class="reasoning-sparkle" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              <span>Reasoning</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: auto;"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            <div class="reasoning-content">${escapeHtml(msg.reasoning)}</div>
          </div>
        `;
      }

      let webSearchHtml = '';
      if (msg.webSearch) {
        const sources = msg.webSearch.sources || [
          { title: 'OpenAI Docs', url: 'https://openai.com' },
          { title: 'Python Docs', url: 'https://docs.python.org' },
          { title: 'GitHub', url: 'https://github.com' }
        ];
        webSearchHtml = `
          <div class="web-search-box">
            <div class="search-pill">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
              <span>Searched ${sources.length} sources</span>
            </div>
            ${sources.map(s => `
              <a class="search-pill" href="${escapeHtml(s.url || '#')}" target="_blank" rel="noopener noreferrer" style="background: rgba(255,255,255,0.06); border-color: var(--border-subtle); color: var(--text-secondary); text-decoration: none;">
                ${escapeHtml(s.title)}
              </a>
            `).join('')}
          </div>
        `;
      }

      const renderedMarkdown = typeof marked !== 'undefined' ? marked.parse(msg.content) : escapeHtml(msg.content);

      row.innerHTML = `
        <div class="assistant-avatar" title="${ASSISTANT_NAME}" aria-hidden="true"><img class="logo-img" src="assets/aet-logo.png" alt=""></div>
        <div class="message-bubble">
          ${webSearchHtml}
          ${reasoningHtml}
          <div class="markdown-body">${renderedMarkdown}</div>
          <div class="message-actions">
            <button class="msg-action-btn copy-msg-btn tooltip-trigger" data-tooltip="Copy" aria-label="Copy message">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            </button>
            <button class="msg-action-btn tts-btn tooltip-trigger" data-tooltip="Read aloud" aria-label="Read aloud">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
            </button>
            <button class="msg-action-btn like-btn tooltip-trigger" data-tooltip="Good response" aria-label="Like response">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
            </button>
            <button class="msg-action-btn dislike-btn tooltip-trigger" data-tooltip="Bad response" aria-label="Dislike response">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"/></svg>
            </button>
            <button class="msg-action-btn regen-btn tooltip-trigger" data-tooltip="Regenerate" aria-label="Regenerate response">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
            </button>
          </div>
        </div>
      `;

      // Accordion click toggle for reasoning
      const reasonHeader = row.querySelector('.reasoning-header');
      if (reasonHeader) {
        reasonHeader.addEventListener('click', () => {
          const content = row.querySelector('.reasoning-content');
          content.classList.toggle('hidden');
        });
      }

      // Action buttons
      const copyBtn = row.querySelector('.copy-msg-btn');
      copyBtn.addEventListener('click', () => copyToClipboard(msg.content, 'Response copied'));

      const ttsBtn = row.querySelector('.tts-btn');
      ttsBtn.addEventListener('click', () => toggleTextToSpeech(msg.content, ttsBtn));

      if (msg.isGreeting) {
        row.querySelectorAll('.like-btn, .dislike-btn, .regen-btn').forEach(btn => btn.classList.add('hidden'));
      }

      const likeBtn = row.querySelector('.like-btn');
      const dislikeBtn = row.querySelector('.dislike-btn');
      likeBtn.classList.toggle('active', msg.feedback === 'up');
      dislikeBtn.classList.toggle('active', msg.feedback === 'down');
      const rate = (rating) => {
        msg.feedback = msg.feedback === rating ? null : rating;
        likeBtn.classList.toggle('active', msg.feedback === 'up');
        dislikeBtn.classList.toggle('active', msg.feedback === 'down');
        saveConversations();
        sendFeedback(msg);
      };
      likeBtn.addEventListener('click', () => rate('up'));
      dislikeBtn.addEventListener('click', () => rate('down'));

      const regenBtn = row.querySelector('.regen-btn');
      regenBtn.addEventListener('click', () => regenerateLastResponse());

      // Quick replies under the greeting until the client writes something
      const conv = getActiveConversation();
      if (msg.isGreeting && conv && !hasClientMessages(conv)) {
        const replies = document.createElement('div');
        replies.className = 'quick-replies';
        QUICK_REPLIES.forEach(text => {
          const chip = document.createElement('button');
          chip.className = 'quick-reply';
          chip.textContent = text;
          chip.addEventListener('click', () => submitPrompt(text));
          replies.appendChild(chip);
        });
        row.querySelector('.message-bubble').insertBefore(replies, row.querySelector('.message-actions'));
      }
    }

    // Attach copy button listeners inside code blocks
    attachCodeBlockCopyListeners(row);

    return row;
  }

  function attachCodeBlockCopyListeners(container) {
    const codeButtons = container.querySelectorAll('.copy-code-btn');
    codeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const codeText = decodeURIComponent(btn.dataset.code || '');
        copyToClipboard(codeText, 'Code copied to clipboard');
        btn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          <span style="color: var(--accent-green)">Copied!</span>
        `;
        setTimeout(() => {
          btn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span>Copy code</span>
          `;
        }, 2000);
      });
    });
  }

  // --- Submitting User Prompts ---
  async function submitPrompt(customText = null) {
    const text = (customText !== null ? customText : elements.promptInput.value).trim();
    if (!text && state.attachedFiles.length === 0) return;
    if (state.isGenerating) return;

    // Ensure we have an active conversation
    let conv = getActiveConversation();
    if (!conv) {
      const newId = 'conv-' + Date.now();
      conv = {
        id: newId,
        title: text.slice(0, 32) || 'New chat',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        messages: []
      };
      if (!state.isTemporaryChat) {
        state.conversations.unshift(conv);
      }
      state.activeConversationId = newId;
    } else if (!hasClientMessages(conv)) {
      conv.title = text.slice(0, 32) || 'Chat';
    }

    conv.updatedAt = Date.now();

    // User Message Object
    const userMsg = {
      id: 'msg-u-' + Date.now(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
      attachments: state.attachedFiles.map(f => ({ name: f.name, size: f.size, type: f.type }))
    };

    // Read attached files so the RAG server can use them
    let attachments = [];
    if (state.attachedFiles.length > 0 && state.settings.ragEnabled && state.settings.ragEndpoint) {
      const totalBytes = state.attachedFiles.reduce((sum, f) => sum + f.size, 0);
      if (totalBytes > MAX_ATTACHMENT_BYTES) {
        showToast('Attachments are too large (15 MB limit in total)');
        return;
      }
      try {
        attachments = await Promise.all(state.attachedFiles.map(readFileAsAttachment));
      } catch (e) {
        showToast('Could not read one of the attached files');
        return;
      }
    }

    conv.messages.push(userMsg);

    // Reset input box & attached files
    elements.promptInput.value = '';
    state.attachedFiles = [];
    renderAttachmentTray();
    autoResizeTextarea();
    updateSendButtonState();

    saveConversations();
    renderSidebar();
    renderActiveConversation();

    // Generate AI Response
    await generateAIResponse(conv, text, attachments);
  }

  function readFileAsAttachment(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve({
        name: file.name,
        type: file.type,
        data: String(reader.result).split(',')[1] || ''
      });
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }

  // Locally the RAG server runs on port 3000. If the page was opened from another local server
  // (e.g. VS Code Live Server), relative endpoints must still reach port 3000. When hosted
  // (e.g. Vercel), the page and the API share one address, so relative endpoints are used as they are.
  function resolveEndpoint(endpoint) {
    const local = ['localhost', '127.0.0.1'].includes(window.location.hostname);
    if (endpoint.startsWith('/') && local && window.location.port !== RAG_SERVER_PORT) {
      return `http://localhost:${RAG_SERVER_PORT}${endpoint}`;
    }
    return endpoint;
  }

  // --- AI Response Simulation & Backend Routing ---
  async function generateAIResponse(conv, userPrompt, attachments = []) {
    state.isGenerating = true;
    updateSendButtonState();

    const useRag = Boolean(state.settings.ragEnabled && state.settings.ragEndpoint);
    const wantsReasoning = state.reasoningActive || state.currentModel === 'o1-reasoning';

    const assistantMsgId = 'msg-a-' + Date.now();
    const assistantMsg = {
      id: assistantMsgId,
      role: 'assistant',
      model: state.currentModel,
      // With the RAG server these are filled in from its reply; the offline simulation fakes them
      reasoning: (!useRag && wantsReasoning)
        ? 'Analyzing constraints, identifying key principles, structuring response, and generating complete solution.'
        : null,
      webSearch: (!useRag && state.searchWebActive) ? { query: userPrompt, sources: generateMockSources(userPrompt) } : null,
      content: '',
      timestamp: Date.now()
    };

    conv.messages.push(assistantMsg);

    // Create message element in DOM
    let row = createMessageRowElement(assistantMsg);
    elements.messagesContainer.appendChild(row);
    scrollToBottom();

    let markdownBody = row.querySelector('.markdown-body');
    // Typing dots while waiting for the reply; they turn into the text cursor once the answer streams in
    const cursor = document.createElement('span');
    cursor.className = 'streaming-cursor typing';
    cursor.innerHTML = '<span></span><span></span><span></span>';
    markdownBody.appendChild(cursor);

    let fullAnswer = '';

    // If RAG Endpoint is active, attempt to call it
    if (useRag) {
      state.abortController = new AbortController();
      try {
        const response = await fetch(resolveEndpoint(state.settings.ragEndpoint), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: state.abortController.signal,
          body: JSON.stringify({
            prompt: userPrompt,
            customInstructions: state.settings.customInstructions,
            webSearch: state.searchWebActive,
            reasoning: wantsReasoning,
            attachments,
            history: conv.messages.slice(0, -1).map(m => ({ role: m.role, content: m.content, timestamp: m.timestamp }))
          })
        });
        const data = await response.json().catch(() => ({}));
        if (response.ok) {
          fullAnswer = data.response || data.answer || data.message || JSON.stringify(data);
          if (data.memoryExpired) {
            showToast('Earlier messages in this chat have expired, so this answer starts fresh');
          }
          assistantMsg.reasoning = data.reasoning || null;
          assistantMsg.webSearch = (data.webSources && data.webSources.length)
            ? { query: userPrompt, sources: data.webSources }
            : null;
          if (assistantMsg.reasoning || assistantMsg.webSearch) {
            // Rebuild the row so the reasoning and web source boxes appear above the answer
            const rebuilt = createMessageRowElement(assistantMsg);
            row.replaceWith(rebuilt);
            row = rebuilt;
            markdownBody = row.querySelector('.markdown-body');
            markdownBody.appendChild(cursor);
          }
        } else {
          fullAnswer = `> **RAG Server Notice:** ${data.error || `Received status ${response.status} from the RAG endpoint.`}`;
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          // Stopped before the server replied: drop the empty answer
          conv.messages.pop();
          row.remove();
          saveConversations();
          return;
        }
        fullAnswer = `> **Connection Warning:** I couldn't reach our assistant service just now. Please try again in a moment.`;
      }
    } else {
      fullAnswer = generateIntelligentResponse(userPrompt, state.currentModel);
    }

    // Stream text if enabled
    cursor.classList.remove('typing');
    cursor.innerHTML = '';
    if (state.settings.streamingEnabled) {
      await streamTextToElement(fullAnswer, markdownBody, cursor, assistantMsg);
    } else {
      assistantMsg.content = fullAnswer;
      markdownBody.innerHTML = typeof marked !== 'undefined' ? marked.parse(fullAnswer) : escapeHtml(fullAnswer);
    }

    cursor.remove();
    attachCodeBlockCopyListeners(row);
    state.isGenerating = false;
    updateSendButtonState();
    saveConversations();
    scrollToBottom();
  }

  async function streamTextToElement(text, targetEl, cursorEl, msgObj) {
    const chunkSize = 3; // characters per tick
    let currentIdx = 0;

    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (!state.isGenerating) {
          // Aborted by user
          clearInterval(interval);
          resolve();
          return;
        }

        currentIdx += chunkSize;
        const slice = text.slice(0, currentIdx);
        msgObj.content = slice;
        targetEl.innerHTML = (typeof marked !== 'undefined' ? marked.parse(slice) : escapeHtml(slice));
        targetEl.appendChild(cursorEl);

        scrollToBottom();

        if (currentIdx >= text.length) {
          clearInterval(interval);
          msgObj.content = text;
          targetEl.innerHTML = typeof marked !== 'undefined' ? marked.parse(text) : escapeHtml(text);
          resolve();
        }
      }, 15);
    });
  }

  // Record a thumbs up/down with the RAG server (logs/feedback.jsonl)
  async function sendFeedback(msg) {
    if (!msg.feedback) {
      showToast('Feedback removed');
      return;
    }
    if (!(state.settings.ragEnabled && state.settings.ragEndpoint)) {
      showToast('Feedback noted');
      return;
    }
    const conv = getActiveConversation();
    const idx = conv ? conv.messages.findIndex(m => m.id === msg.id) : -1;
    const question = idx > 0 ? conv.messages[idx - 1].content : '';
    try {
      const response = await fetch(resolveEndpoint(state.settings.ragEndpoint).replace(/chat\/?$/, 'feedback'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: msg.feedback, question, answer: msg.content })
      });
      showToast(response.ok ? 'Feedback saved' : 'Feedback could not be saved');
    } catch (e) {
      showToast('Feedback could not be saved');
    }
  }

  function stopGenerating() {
    if (state.abortController) {
      state.abortController.abort();
      state.abortController = null;
    }
    state.isGenerating = false;
    updateSendButtonState();
    showToast('Generation stopped');
  }

  function regenerateLastResponse() {
    const conv = getActiveConversation();
    if (!conv || conv.messages.length === 0 || state.isGenerating) return;

    // Find last user message
    let lastUserPrompt = '';
    for (let i = conv.messages.length - 1; i >= 0; i--) {
      if (conv.messages[i].role === 'user') {
        lastUserPrompt = conv.messages[i].content;
        break;
      }
    }

    if (!lastUserPrompt) return;

    // Remove trailing assistant message if present
    if (conv.messages[conv.messages.length - 1].role === 'assistant') {
      conv.messages.pop();
    }

    renderActiveConversation();
    generateAIResponse(conv, lastUserPrompt);
  }

  // --- Intelligent Offline Simulation Engine ---
  function generateIntelligentResponse(prompt, model) {
    const lower = prompt.toLowerCase();

    if (lower.includes('python') || lower.includes('scrape') || lower.includes('script')) {
      return `Here is a complete, production-ready Python solution:

\`\`\`python
import httpx
from bs4 import BeautifulSoup
import asyncio

async def fetch_news_feed(target_url: str):
    """
    Fetches and extracts headlines asynchronously using httpx.
    """
    headers = {"User-Agent": "ChatGPT-Bot/1.0"}
    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.get(target_url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, "html.parser")
        items = []
        for tag in soup.select("h2, .titleline a")[:8]:
            text = tag.get_text(strip=True)
            link = tag.get("href", "")
            if text:
                items.append({"title": text, "url": link})
        return items

if __name__ == "__main__":
    articles = asyncio.run(fetch_news_feed("https://news.ycombinator.com"))
    for idx, item in enumerate(articles, 1):
        print(f"[{idx}] {item['title']}")
\`\`\`

### Key Features
1. **Asynchronous I/O**: High throughput via \`httpx\` without blocking thread execution.
2. **Error Resiliency**: Configured timeouts and standard header emulation.
3. **Clean Extraction**: CSS selector targeting with clean whitespace trimming.`;
    }

    if (lower.includes('quantum') || lower.includes('physics') || lower.includes('entanglement')) {
      return `### Understanding Quantum Entanglement

Quantum entanglement is a phenomenon where pairs or groups of particles interact in ways such that the quantum state of each particle cannot be described independently of the state of the others, no matter how far apart they are.

> *"I cannot seriously believe in it because the theory cannot be reconciled with the idea that physics should represent a reality in time and space, free from spooky actions at a distance."*  
> — **Albert Einstein**

#### 1. The Coin Analogy
Imagine two special coins. If you flip one in New York and it lands on **Heads**, the other coin flipped instantaneously in Tokyo is *guaranteed* to land on **Tails**. 
- In classical physics, you would assume their sides were pre-determined before departure.
- In quantum mechanics (proven by **Bell's Inequality** tests), neither coin had a determined face until the moment of measurement!

#### 2. Key Applications
| Field | Core Benefit |
| :--- | :--- |
| **Quantum Cryptography (QKD)** | Eavesdropping collapses superposition, immediately alerting both parties. |
| **Quantum Superdense Coding** | Transmit two classical bits of information using just one entangled qubit. |
| **Quantum Computing** | Exponential computational state space ($2^n$ simultaneous states for $n$ qubits). |`;
    }

    if (lower.includes('email') || lower.includes('extension') || lower.includes('deadline')) {
      return `Here are two professional options you can use depending on your relationship with the project lead:

### Option 1: Direct & Solution-Oriented (Recommended)
**Subject:** Update on [Project Name] – Timeline adjustment request

Hi [Manager/Client Name],

I am writing to provide a quick update on our progress with **[Project Name]**. We have completed the foundational milestones including [mention 1-2 completed items], and the results look great.

To ensure the final deliverables meet our quality standards—specifically around [mention specific critical task like QA testing, performance benchmarking, or final design review]—I would like to request an extension of the deadline to **[Proposed Date]**.

This additional buffer will allow us to deliver a polished product without cutting corners. Please let me know if this works for your schedule or if you would like to review the current draft together.

Best regards,  
[Your Name]

---

### Option 2: Collaborative & Brief
**Subject:** [Project Name] delivery date

Hi [Name],

Our team is making strong headway on [Project Name]. To give [specific component] the thorough polish it deserves, could we push our delivery date to **[Proposed Date]**?

I am confident this will yield a significantly higher-impact outcome. Let me know your thoughts!

Thanks,  
[Your Name]`;
    }

    if (lower.includes('rag') || lower.includes('retrieval') || lower.includes('vector')) {
      return `### Production RAG Architectural Blueprint

A production-ready **Retrieval-Augmented Generation (RAG)** architecture requires moving beyond naive vector search:

\`\`\`
[User Query] 
     │
     ├──► [Query Expansion / HyDE]
     │
     ├──► [Dense Vector Search (HNSW)] ──┐
     │                                   ├──► [RRF Fusion] ──► [Cross-Encoder Reranker] ──► [LLM Generation]
     └──► [BM25 Lexical Keyword Search] ─┘
\`\`\`

#### 1. Critical Pipeline Layers
1. **Query Rewriting & HyDE**: Generate hypothetical document embeddings to bridge the vocabulary gap between short user questions and detailed document passages.
2. **Hybrid Retrieval**: Combine dense semantic embeddings with sparse keyword search using **Reciprocal Rank Fusion (RRF)**.
3. **Cross-Encoder Reranking**: Re-score the top 50 candidates down to top 5 using models like Cohere Rerank or BGE-Reranker.
4. **Context Compression**: Strip irrelevant sentences before injecting context into the prompt window to minimize hallucination.`;
    }

    // Default intelligent conversational response
    return `Thank you for your question! Here is an in-depth breakdown:

### Overview & Key Insights
When approaching **${escapeHtml(prompt.slice(0, 40))}...**, there are several core principles to consider:

1. **Architecture & Design**: Establish clean modular boundaries to separate concerns and ensure maintainability.
2. **Performance & Scalability**: Avoid premature optimization while ensuring asymptotic efficiency.
3. **Security & Validation**: Sanitize inputs at all system boundaries.

\`\`\`javascript
// Example helper implementation
function processRequest(input) {
  const sanitized = input.trim();
  console.log(\`Processing \${sanitized} with \${'${model}'}\`);
  return { status: "success", timestamp: Date.now() };
}
\`\`\`

Feel free to ask follow-up questions, request specific code refactors, or dive deeper into any aspect!`;
  }

  function generateMockSources(query) {
    return [
      { title: 'developer.mozilla.org', url: 'https://developer.mozilla.org' },
      { title: 'github.com/openai', url: 'https://github.com' },
      { title: 'arxiv.org/abs/2312.00752', url: 'https://arxiv.org' }
    ];
  }

  // --- Voice Mode & Speech Recognition ---
  function setupSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      state.speechRecognition = new SpeechRecognition();
      state.speechRecognition.continuous = false;
      state.speechRecognition.interimResults = true;
      state.speechRecognition.lang = 'en-US';

      state.speechRecognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }

        if (state.isVoiceSessionActive) {
          elements.voiceTranscript.textContent = transcript || 'Listening...';
          elements.voiceStatusText.textContent = 'Speaking...';
          elements.voiceOrb.classList.add('speaking');
        } else {
          elements.promptInput.value = transcript;
          autoResizeTextarea();
          updateSendButtonState();
        }
      };

      state.speechRecognition.onend = () => {
        if (state.isVoiceSessionActive) {
          elements.voiceStatusText.textContent = 'Thinking...';
          elements.voiceOrb.classList.remove('speaking');
          const speech = elements.voiceTranscript.textContent;
          if (speech && speech !== `Speak naturally, ${ASSISTANT_NAME} is listening` && speech !== 'Listening...') {
            // Process voice message
            setTimeout(() => {
              elements.voiceStatusText.textContent = 'Responding...';
              elements.voiceOrb.classList.add('speaking');
              speakText('I heard your question regarding ' + speech.slice(0, 30) + '. Here is the answer.', () => {
                elements.voiceStatusText.textContent = 'Listening...';
                elements.voiceOrb.classList.remove('speaking');
                if (state.isVoiceSessionActive) state.speechRecognition.start();
              });
            }, 800);
          }
        }
      };

      state.speechRecognition.onerror = (e) => {
        console.warn('Speech recognition error:', e.error);
        if (state.isVoiceSessionActive) {
          elements.voiceStatusText.textContent = 'Listening...';
        }
      };
    }
  }

  function toggleVoiceModeOverlay(show) {
    state.isVoiceSessionActive = show;
    if (show) {
      elements.voiceOverlay.classList.remove('hidden');
      elements.voiceStatusText.textContent = 'Listening...';
      elements.voiceTranscript.textContent = `Speak naturally, ${ASSISTANT_NAME} is listening`;
      if (state.speechRecognition) {
        try { state.speechRecognition.start(); } catch (e) {}
      }
    } else {
      elements.voiceOverlay.classList.add('hidden');
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      if (state.speechRecognition) {
        try { state.speechRecognition.stop(); } catch (e) {}
      }
    }
  }

  function toggleTextToSpeech(text, btnElement) {
    if (!('speechSynthesis' in window)) {
      showToast('Text-to-speech is not supported in this browser');
      return;
    }

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      if (btnElement) btnElement.classList.remove('active');
      return;
    }

    // Clean markdown symbols for natural speech
    const cleanText = text.replace(/```[\s\S]*?```/g, 'Code snippet omitted.')
                          .replace(/[#*`_\[\]()]/g, '')
                          .slice(0, 1000);

    speakText(cleanText, () => {
      if (btnElement) btnElement.classList.remove('active');
    });

    if (btnElement) btnElement.classList.add('active');
  }

  function speakText(text, onEndCallback) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    utterance.onend = () => {
      if (onEndCallback) onEndCallback();
    };
    window.speechSynthesis.speak(utterance);
  }

  // --- Attachment Handling ---
  function handleFilesSelected(fileList) {
    for (let i = 0; i < fileList.length; i++) {
      state.attachedFiles.push(fileList[i]);
    }
    renderAttachmentTray();
    updateSendButtonState();
  }

  function renderAttachmentTray() {
    if (state.attachedFiles.length === 0) {
      elements.attachmentTray.classList.add('hidden');
      elements.attachmentTray.innerHTML = '';
      return;
    }

    elements.attachmentTray.classList.remove('hidden');
    elements.attachmentTray.innerHTML = state.attachedFiles.map((file, idx) => `
      <div class="attachment-pill">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        <span>${escapeHtml(file.name)}</span>
        <button class="attachment-remove-btn" data-index="${idx}" aria-label="Remove attachment">&times;</button>
      </div>
    `).join('');

    elements.attachmentTray.querySelectorAll('.attachment-remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.dataset.index, 10);
        state.attachedFiles.splice(index, 1);
        renderAttachmentTray();
        updateSendButtonState();
      });
    });
  }

  // --- UI Helpers & Event Bindings ---
  function autoResizeTextarea() {
    const el = elements.promptInput;
    if (!el) return;
    el.style.height = 'auto';
    const newHeight = Math.min(el.scrollHeight, 180);
    el.style.height = newHeight + 'px';
  }

  function updateSendButtonState() {
    const hasText = elements.promptInput.value.trim().length > 0;
    const hasAttachments = state.attachedFiles.length > 0;

    if (state.isGenerating) {
      elements.sendBtn.classList.remove('disabled');
      elements.sendBtn.classList.add('generating');
      elements.sendBtn.disabled = false;
      elements.sendIcon.classList.add('hidden');
      elements.stopIcon.classList.remove('hidden');
      elements.sendBtn.setAttribute('aria-label', 'Stop generating');
    } else {
      elements.sendBtn.classList.remove('generating');
      elements.sendIcon.classList.remove('hidden');
      elements.stopIcon.classList.add('hidden');
      elements.sendBtn.setAttribute('aria-label', 'Send message');

      if (hasText || hasAttachments) {
        elements.sendBtn.classList.remove('disabled');
        elements.sendBtn.disabled = false;
      } else {
        elements.sendBtn.classList.add('disabled');
        elements.sendBtn.disabled = true;
      }
    }
  }

  function scrollToBottom() {
    elements.chatCanvas.scrollTo({
      top: elements.chatCanvas.scrollHeight,
      behavior: 'smooth'
    });
  }

  function focusInput() {
    if (elements.promptInput) {
      elements.promptInput.focus();
    }
  }

  function closeMobileSidebar() {
    elements.sidebar.classList.remove('mobile-open');
    elements.sidebarBackdrop.classList.remove('mobile-open');
  }

  function copyToClipboard(text, message = 'Copied to clipboard') {
    navigator.clipboard.writeText(text).then(() => {
      showToast(message);
    }).catch(() => {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      showToast(message);
    });
  }

  function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
      <span>${escapeHtml(msg)}</span>
    `;
    elements.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 2500);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --- Search Modal (Cmd+K) ---
  function openSearchModal() {
    elements.searchModal.classList.remove('hidden');
    elements.chatSearchInput.value = '';
    renderSearchResults('');
    elements.chatSearchInput.focus();
  }

  function closeSearchModal() {
    elements.searchModal.classList.add('hidden');
  }

  function renderSearchResults(query) {
    const list = elements.searchResultsList;
    list.innerHTML = '';
    const q = query.toLowerCase().trim();

    const matches = state.conversations.filter(c => {
      if (!q) return true;
      if (c.title.toLowerCase().includes(q)) return true;
      return c.messages.some(m => m.content.toLowerCase().includes(q));
    });

    if (matches.length === 0) {
      list.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 13px;">No conversations found matching "${escapeHtml(query)}"</div>`;
      return;
    }

    matches.forEach(c => {
      const item = document.createElement('div');
      item.className = 'search-result-item';
      const snippet = c.messages.length > 0 ? c.messages[0].content.slice(0, 80) : 'No messages yet';
      item.innerHTML = `
        <span class="search-result-title">${escapeHtml(c.title)}</span>
        <span class="search-result-snippet">${escapeHtml(snippet)}</span>
      `;
      item.addEventListener('click', () => {
        closeSearchModal();
        switchConversation(c.id);
      });
      list.appendChild(item);
    });
  }

  // --- Export Chat Features ---
  function exportConversationsJSON() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state.conversations, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `chat-export-${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    showToast('Exported conversations to JSON');
  }

  function conversationToMarkdown(conv) {
    let md = `# ${conv.title}\n\n*Exported on ${new Date().toLocaleDateString()}*\n\n---\n\n`;
    conv.messages.forEach(m => {
      const sender = m.role === 'user' ? '### User' : `### ${ASSISTANT_NAME}`;
      md += `${sender}\n\n${m.content}\n\n---\n\n`;
    });
    return md;
  }

  function exportCurrentChatMarkdown() {
    const conv = getActiveConversation();
    if (!conv) return;

    const md = conversationToMarkdown(conv);

    const dataStr = 'data:text/markdown;charset=utf-8,' + encodeURIComponent(md);
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `${conv.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.md`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    showToast('Exported chat to Markdown');
  }

  // --- Setup Event Listeners ---
  function setupEventListeners() {
    // Sidebar toggle (desktop collapse & mobile drawer)
    elements.sidebarToggleBtn.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        elements.sidebar.classList.toggle('mobile-open');
        elements.sidebarBackdrop.classList.toggle('mobile-open');
      } else {
        elements.sidebar.classList.toggle('collapsed');
      }
    });

    elements.sidebarCloseBtn.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        closeMobileSidebar();
      } else {
        elements.sidebar.classList.add('collapsed');
      }
    });

    elements.sidebarBackdrop.addEventListener('click', closeMobileSidebar);

    // New Chat buttons
    elements.newChatBtn.addEventListener('click', createNewConversation);
    document.getElementById('restart-chat-btn').addEventListener('click', createNewConversation);

    // Hero Prompt Inspiration Cards
    document.querySelectorAll('.prompt-card').forEach(card => {
      card.addEventListener('click', () => {
        const prompt = card.dataset.prompt;
        submitPrompt(prompt);
      });
    });

    // Prompt input textarea
    elements.promptInput.addEventListener('input', () => {
      autoResizeTextarea();
      updateSendButtonState();
    });

    elements.promptInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (state.isGenerating) {
          stopGenerating();
        } else {
          submitPrompt();
        }
      }
    });

    // Send / Stop button
    elements.sendBtn.addEventListener('click', () => {
      if (state.isGenerating) {
        stopGenerating();
      } else {
        submitPrompt();
      }
    });

    // Voice overlay controls (the overlay is no longer opened from the page)
    elements.closeVoiceBtn.addEventListener('click', () => toggleVoiceModeOverlay(false));
    elements.endVoiceBtn.addEventListener('click', () => toggleVoiceModeOverlay(false));

    elements.voiceMuteBtn.addEventListener('click', () => {
      state.isListeningVoice = !state.isListeningVoice;
      elements.muteLabel.textContent = state.isListeningVoice ? 'Unmute' : 'Mute';
      if (state.speechRecognition) {
        if (state.isListeningVoice) {
          try { state.speechRecognition.stop(); } catch (e) {}
        } else {
          try { state.speechRecognition.start(); } catch (e) {}
        }
      }
    });

    // Modals: Settings
    elements.userProfileBtn.addEventListener('click', () => {
      syncSettingsUI();
      elements.settingsModal.classList.remove('hidden');
    });
    elements.closeSettingsModalBtn.addEventListener('click', () => elements.settingsModal.classList.add('hidden'));

    // Settings tabs
    document.querySelectorAll('.settings-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.settings-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.settings-tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const tabId = 'tab-' + btn.dataset.tab;
        const panel = document.getElementById(tabId);
        if (panel) panel.classList.add('active');
      });
    });

    // Settings form updates
    elements.themeSelect.addEventListener('change', (e) => {
      state.settings.theme = e.target.value;
      applyTheme(state.settings.theme);
      saveSettings();
    });

    elements.streamSpeedCheckbox.addEventListener('change', (e) => {
      state.settings.streamingEnabled = e.target.checked;
      saveSettings();
    });

    elements.customInstructionsInput.addEventListener('change', (e) => {
      state.settings.customInstructions = e.target.value;
      saveSettings();
      showToast('Custom instructions saved');
    });

    elements.ragEndpointInput.addEventListener('change', (e) => {
      state.settings.ragEndpoint = e.target.value;
      saveSettings();
    });

    elements.enableRagCheckbox.addEventListener('change', (e) => {
      state.settings.ragEnabled = e.target.checked;
      saveSettings();
      showToast(state.settings.ragEnabled ? 'Custom RAG endpoint enabled' : 'Custom RAG endpoint disabled');
    });

    elements.exportChatsBtn.addEventListener('click', exportConversationsJSON);

    elements.clearAllChatsBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete all conversation history? This cannot be undone.')) {
        state.conversations = [buildGreetedConversation()];
        state.activeConversationId = state.conversations[0].id;
        saveConversations();
        renderSidebar();
        renderActiveConversation();
        elements.settingsModal.classList.add('hidden');
        showToast('All conversations deleted');
      }
    });

    // Search modal triggers
    elements.openSearchModalBtn.addEventListener('click', openSearchModal);
    elements.closeSearchModalBtn.addEventListener('click', closeSearchModal);
    elements.chatSearchInput.addEventListener('input', (e) => renderSearchResults(e.target.value));

    // Share modal triggers
    elements.shareChatBtn.addEventListener('click', () => {
      const active = getActiveConversation();
      if (!active) return;
      elements.shareLinkInput.value = active.title;
      elements.shareModal.classList.remove('hidden');
    });
    elements.closeShareModalBtn.addEventListener('click', () => elements.shareModal.classList.add('hidden'));
    elements.copyShareLinkBtn.addEventListener('click', () => {
      const active = getActiveConversation();
      if (active) copyToClipboard(conversationToMarkdown(active), 'Conversation copied to clipboard');
    });
    elements.exportMarkdownBtn.addEventListener('click', exportCurrentChatMarkdown);

    // Global keyboard shortcuts (Cmd+K, Escape)
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openSearchModal();
      }
      if (e.key === 'Escape') {
        elements.settingsModal.classList.add('hidden');
        elements.searchModal.classList.add('hidden');
        elements.shareModal.classList.add('hidden');
        toggleVoiceModeOverlay(false);
      }
    });

    // Close modals on overlay backdrop click
    [elements.settingsModal, elements.searchModal, elements.shareModal].forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
        }
      });
    });

    // Scroll to bottom trigger
    elements.chatCanvas.addEventListener('scroll', () => {
      const threshold = 150;
      const distanceFromBottom = elements.chatCanvas.scrollHeight - elements.chatCanvas.scrollTop - elements.chatCanvas.clientHeight;
      if (distanceFromBottom > threshold) {
        elements.scrollBottomBtn.classList.remove('hidden');
      } else {
        elements.scrollBottomBtn.classList.add('hidden');
      }
    });

    elements.scrollBottomBtn.addEventListener('click', scrollToBottom);
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
