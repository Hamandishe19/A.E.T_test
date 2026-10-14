"""Vercel serverless entry point. Vercel runs each file in api/ as a function and calls its `handler` class;
all the logic lives in server.py, which also runs the same handler locally (npm run dev)."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import server  # noqa: E402

handler = server.vercel_handler()
