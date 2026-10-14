# Category 01 — Solar Inverters

Source: Anern "SOLAR CATALOG" (`SOLAR_CATALOG.pdf`). Page references are **PDF page numbers**. The printed page numbers on the spreads are given in brackets.

This category contains 15 product families and 50 modules (models). Each family lists its modules, a specification table (models are columns) and the features printed on the source page.

Values are copied as printed in the catalog. Items marked ⚠️ are ambiguous in the source layout or look like typos. Check them against the datasheet before quoting them to a customer.

---

## 1. Single Phase Hybrid Inverter — AN-HYI-S 10KW/16KW
- **Source:** PDF p.9 [printed 11–12]
- **Type:** Hybrid inverter with grid-tie, off-grid and hybrid operation. Single phase, IP65, built-in BMS.
- **Modules:** `HYI-S10000` (10 kW), `HYI-S16000` (16 kW)

| Specification | HYI-S10000 | HYI-S16000 |
|---|---|---|
| Phase | 1-phase in / 1-phase out | 1-phase in / 1-phase out |
| Maximum PV input power | 16200 W | 21800 W |
| Rated output power | 10000 W | 16000 W |
| Maximum charging power | 10000 W | 14000 W |
| Maximum DC voltage | 520 Vdc | 520 Vdc |
| Start-up / initial feeding voltage | 90 Vdc / 120 Vdc | 90 Vdc / 120 Vdc |
| MPPT voltage range | 80–450 Vdc | 80–450 Vdc |
| MPPT trackers / max input current | 2 / 27A+27A | 3 / 18A+18A+36A |
| Nominal output voltage | 220/230/240 VAC | 220/230/240 VAC |
| Output voltage range | 184–264.5 VAC or 195.5–253 VAC or 184–264.4 VAC (selectable) | same |
| Nominal output current | 43.5 A | 69.6 A |
| Power factor | >0.99 | >0.99 |
| Max conversion efficiency (DC/AC) | 97% | 97% |
| AC start-up / auto-restart voltage | 120–140 VAC / 180 VAC | same |
| Acceptable AC input range | 90–280 VAC (off-grid); 90–280 VAC or 170–280 VAC (hybrid) | same |
| Max AC input current | 60 A | 100 A (passthrough) |
| Battery-mode output | Pure sine wave, 220/230/240 VAC, 93% efficiency (DC→AC) | same |
| Nominal DC (battery) voltage | 48 Vdc | 48 Vdc |
| Max solar / AC / total charging current | 210 A / 210 A / 210 A | 260 A / 260 A / 260 A |
| Dimensions (D×W×H) | 517.5×502×242 mm | 664×492×287 mm |
| Net weight | 32.5 kg | 48 kg |
| Parallel operation | Yes, up to 6 units | Yes, up to 6 units |
| Communication ports | RS232 / RS485 / CAN / WiFi / dry contact | same |
| IP rating | IP65 | IP65 |
| Humidity | 5%–95% RH, non-condensing | same |
| Operating / storage temperature | −10 °C to 50 °C / −15 °C to 60 °C | same |

**Features (as printed):** maximize PV input power (2 MPPTs), parallel operation up to 6 units, 50–450 Vdc, Wi-Fi, touchscreen, current transformer, 2 independent AC inputs and 2 outputs, high efficiency (max 98%), IP65, built-in BMS.

---

## 2. Hybrid Solar Inverter, Single Phase — AN-HYI-E 3KW/6KW
- **Source:** PDF p.10 [printed 13–14]
- **Type:** Single-phase hybrid inverter, with grid-tie, off-grid and hybrid modes.
- **Modules:** `AN-HYI-E3000W` (3 kW), `AN-HYI-E6000W` (6 kW)

| Specification | AN-HYI-E3000W | AN-HYI-E6000W |
|---|---|---|
| Phase | 1-phase in / 1-phase out | same |
| Maximum PV input power | 4500 W | 9000 W |
| Rated output power | 3000 W | 6000 W |
| Maximum charging power | 3000 W | 6000 W |
| Grid-tied: max DC voltage / start-up / MPPT / trackers | "/" (not listed) | 500 Vdc / 90 Vdc–120 Vdc / 60–450 Vdc / 2 trackers, 18 A ⚠️ |
| Grid-tied: nominal output voltage / output range | "/" | 220/230/240 VAC / 184–264.5 VAC or 195.5–253 VAC or 184–264.4 VAC |
| Grid-tied: nominal output current | "/" | 26.1 A |
| Power factor / max conversion efficiency | "/" / "/" | >0.99 / 97% |
| Off-grid: AC start-up / acceptable input | 120–140 VAC / 180 VAC; 90–280 VAC | same |
| Off-grid: max AC input current | 18 A | 40 A |
| Off-grid: max DC voltage / MPPT range / trackers | 500 Vdc / 50–450 Vdc / 1 tracker, 18 A | 520 Vdc / 50–450 Vdc / 2 trackers, 18 A |
| Battery-mode output | 220/230/240 VAC, pure sine wave, 93% (DC→AC) | same |
| Hybrid: nominal output current | 13 A | 26.1 A |
| Hybrid: AC input (acceptable / max current) | 90–280 VAC or 170–280 VAC / 16 A | 90–280 VAC or 170–280 VAC / 40 A |
| Nominal DC (battery) voltage | 24 Vdc | 48 Vdc |
| Max solar / AC / total charging current | 100 A / 100 A / 100 A | 135 A / 135 A / 135 A |
| Dimensions (D×W×H) | 451×353×160 mm | 471×444×200 mm |
| Net weight | 12.3 kg | 18.2 kg |
| Parallel operation | "/" (not listed) | Yes, up to 6 units |
| Communication ports | RS232 / RS485 / Wi-Fi | RS232 / RS485 / CAN / Wi-Fi / dry contact |
| IP rating / humidity / operating temp | IP65 / 5–95% RH / −10 °C to 50 °C | same |
| Storage temperature | −15 °C to 60 °C | same |

⚠️ The source table uses "/" for several AN-HYI-E3000W grid-tie values and mixes single values with two-column rows. Check the datasheet before quoting grid-tie values for the 3 kW model.

**Features (as printed):** maximize PV input power (2 MPPTs), parallel operation up to 6 units, 50–450 Vdc, Wi-Fi, touchscreen, current transformer, 2 independent AC inputs and 2 outputs, high efficiency (max 98%).

---

## 3. On-Grid Solar Inverter — AN-OGI 6000W/10000W
- **Source:** PDF p.11 [printed 15–16]
- **Type:** Transformerless on-grid (grid-tie) inverter, single-phase, IP65.
- **Modules:** `AN-OGI-6KW` (6 kW), `AN-OGI-10KW` (10 kW)

| Specification | AN-OGI-6KW | AN-OGI-10KW |
|---|---|---|
| Rated power | 6000 W | 10000 W |
| Phase | 1-phase in / 1-phase out | same |
| Maximum PV input power | 9000 W | 135000 W ⚠️ (printed as-is, likely a typo) |
| Maximum input voltage / start voltage | 500 VDC / 90 VDC | 500 VDC / 90 VDC |
| Rated input voltage / MPPT range | 360 VDC / 60–450 VDC | same |
| Number of MPPT trackers | 2 | 3 |
| Strings per MPPT | 1 / 2 | 1 / 3 |
| Max current per MPPT | 18 A × 2 | 18 A × 3 |
| Max short-circuit current per MPPT | 23 A | 23 A (single value in source) |
| Maximum output current | 26 A | 43 A |
| Rated / maximum output power | 6 kW / 12 kW | 10 kW / 20 kW |
| Rated grid frequency / voltage | 50 Hz or 60 Hz / 220, 230 or 240 VAC | same |
| Power factor / THDi | >0.99 / <3% | same |
| Maximum efficiency / European efficiency / MPPT efficiency | 98.3% / 97.3% / 99% | same |
| Protections | DC switch, DC reverse polarity, anti-islanding, AC short circuit, residual current monitoring, insulation resistance monitoring, ground fault monitoring, grid monitoring, PV string monitoring, surge protection | same |
| Dimensions (D×W×H) | 480×425×122 mm | 495×435×128 mm |
| Net weight | 12 kg | 17.5 kg |
| Display / communication | Colour LCD + LED + APP; RS485 / RS232 / Wi-Fi | same |
| Cooling / IP rating | Fan / smart cooling; IP65 | same |
| Humidity / operating temp | 5–95% (non-condensing) / −10 °C to 60 °C | same |
| Topology / max altitude | Transformerless / 4000 m | same |

**Features (as printed):** pure sine wave; input voltage range for home appliances and PCs set via LCD; grid-connection mode set via LCD; compatible with mains voltage; auto-restart on AC recovery; overload, over-temperature and short-circuit protection; cold-start function; IP65 waterproof and dustproof; built-in current transformer and Wi-Fi; solar and utility can power home load together; full load powered from solar alone.

---

## 4. MPPT Solar Inverter — AN-FGI-P 6.5KW/12KW
- **Source:** PDF p.12 [printed 17–18]
- **Type:** Off-grid MPPT solar inverter / charger with UPS (battery) mode, 48 V. Can run without a battery, and is parallel-capable up to 9 units.
- **Modules:** `AN-FGI-P6500` (6.5 kW), `AN-FGI-P12000` (12 kW)

| Specification | AN-FGI-P6500 | AN-FGI-P12000 |
|---|---|---|
| Rated power | 6500 W | 12000 W |
| Phase | 1-phase in / 1-phase out | same |
| Maximum PV input power | 9000 W | 15000 W |
| Permitted parallel number | NO / 1–9 | NO / 1–9 |
| AC input voltage range | 90–280 ±3 VAC (normal mode); 170–280 ±3 VAC (UPS mode) | same |
| AC input frequency / rated input voltage | 50/60 Hz (auto) / 208/220/230/240 VAC, L+N+PE | same |
| Nominal output voltage / power factor | 208/220/230/240 VAC / 1 PF | same |
| Surge power | 12 kVA | 24 kVA |
| Switch time | 10 ms (normal) / 10 ms (UPS) | same |
| Waveform | Pure sine wave | same |
| Efficiency (battery mode) | 94% at 48 VDC | same |
| Overload capacity (battery mode) | 1 min at 102–120%; 10 s at >120% | same |
| Output frequency | 50/60 Hz ±0.1% | same |
| MPPT voltage range | 60–450 Vdc | same |
| MPPT trackers / max input current | 1 / 27 A | 2 / 22.5 A |
| Max PV / AC / total charge current | 120 A / 120 A / 120 A | 160 A / 160 A / 160 A |
| Max PV open-circuit voltage | 500 VDC | 500 VDC |
| Normal DC voltage / battery type | 48 VDC / lithium and lead-acid | same |
| Dimensions (D×W×H) | 440×355×117 mm | 527×435×138 mm |
| Net weight | 8.4 kg | 14.5 kg |
| HMI / communication | LCD / RS485, RS232, USB; Wi-Fi optional | same |
| IP rating / humidity | IP21 / 5–95% (non-condensing) | same |
| Operating / storage temp | −10 °C to 60 °C / −15 °C to 60 °C | same |
| Max operating altitude | 4000 m (derating above 1000 m) | same |

**Features (as printed):** pure sine wave solar inverter; can run without battery; one-key restore to factory settings; lithium battery automatic activation by AC and PV; built-in MPPT controller (max charge 120 A); wide PV input range; built-in anti-dust kit for harsh environments; smart battery charge design; Wi-Fi remote monitoring (optional); RGB lights; parallel operation up to 9 units.

---

## 5. MPPT Solar Inverter — AN-FGI-S 1.5K / 2.5KW / 4KW / 5KW / 6.5KW / 12KW
- **Source:** PDF p.13 [printed 19–20]
- **Type:** Off-grid MPPT solar inverter / charger, pure sine wave, 12/24/48 V systems.
- **Modules:** `FGI-S1500`, `FGI-S2500`, `FGI-S4000`, `FGI-S5000`, `FGI-S6500`, `FGI-S12000`

| Specification | FGI-S1500 | FGI-S2500 | FGI-S4000 | FGI-S5000 | FGI-S6500 | FGI-S12000 |
|---|---|---|---|---|---|---|
| Rated power | 1500 W | 2500 W | 4000 W | 5000 W | 6500 W | 12000 W |
| Maximum PV input power | 800 W | 3000 W | 5000 W | 9000 W | 9000 W | 15000 W |
| Surge power | 2.4 kVA | 4 kVA | 7.2 kVA | 10 kVA | 12 kVA | 24 kVA |
| Max efficiency (battery mode) | 90% (12 V) | 91% (12 V) | 92% (24 V) | 93.5% (24 V) | 94% (48 V) | 94% (48 V) |
| Normal DC (battery) voltage | 12 VDC / 24 VDC / 48 VDC ⚠️ (three values printed for six models; mapping not clear) | same | same | same | same | same |
| Max PV open-circuit voltage | 115 VDC | 450 VDC | 500 VDC | 500 VDC | 500 VDC | 500 VDC |
| Max PV charge current | 50 A | 100 A | 100 A | 160 A | 120 A | 160 A |
| Max AC charge current | 50 A | 100 A | 100 A | 160 A | 120 A | 160 A |
| Max charge current (PV + AC) | 100 A | 100 A | 100 A | 160 A | 120 A | 160 A |
| Dimensions (D×W×H) | 320×227×110 mm | 375×290×110 mm | 435×285×98 mm | 410×336×115 mm | 440×355×117 mm | 527×435×138 mm |
| Net weight | 3.5 kg | 4.9 kg | 5.6 kg | 8.0 kg | 8.4 kg | 14.5 kg |

⚠️ The source lists the MPPT voltage ranges (17–115 / 30–400 / 40–450 / 60–450 Vdc) and PV start-up voltages (20 / 40 / 60 / 80 Vdc) as shorter lists than six models. The mapping to each model is not clear from the layout. Confirm them before quoting.

| Other specs (all models) | Value |
|---|---|
| AC input range / frequency | 90–280 VAC / 50 or 60 Hz (auto) |
| Rated input / nominal output voltage | 220/230/240 VAC / 220/230/240 VAC |
| Power factor / switch time | 1 PF / 10 ms (APP/UPS mode), 20 ms (GEN mode) |
| Waveform | Pure sine wave |
| Battery type | Lithium and lead-acid |
| Communication | RS485 / CAN / RS232 |
| Monitoring | Wi-Fi (optional; not for FGI-S1500) |
| HMI | LCD |
| IP rating / humidity | IP21 / 5–95% (non-condensing) |
| Operating / storage temperature | −10 °C to 60 °C / −15 °C to 60 °C |
| Max operating altitude | 4000 m (derating above 1000 m) |

**Features (as printed):** pure sine wave; can run without battery; one-key restore; lithium battery automatic activation by AC and PV; built-in 160 A MPPT controller; wide PV input range; built-in anti-dust kit; smart battery charge design; Wi-Fi remote monitoring (optional, not S1500); RGB lights (S5000, S6500, S12000).

---

## 6. Split-Phase MPPT Solar Inverter — AN-FGI-AS 7.2KW / 10KW / 12KW
- **Source:** PDF p.14 [printed 21–22]
- **Type:** Split-phase / single-phase off-grid MPPT inverter / charger with grid-hybrid capability and UPS-level switching. Supports diesel generator input. Up to 6 units in parallel.
- **Modules:** `AN-FGI-AS7200P` (7.2 kW), `AN-FGI-AS10000P` (10 kW), `AN-FGI-AS12000P` (12 kW)

| Specification | AN-FGI-AS7200P | AN-FGI-AS10000P | AN-FGI-AS12000P |
|---|---|---|---|
| Rated output power (VA) — split phase / single phase | 7200 / 6000 | 10000 / 7200 | 12000 / 7200 |
| Rated output power (W) — split phase / single phase | 7200 / 6000 | 10000 / 7200 | 12000 / 7200 |
| Rated output voltage | 120 VAC (L1/N, L2/N) / 240 VAC (L1/L2) | same | same |
| Output voltage error / output frequency | ±5% / 50 Hz ±0.3 Hz or 60 Hz ±0.3 Hz | same | same |
| Power factor / max efficiency | 1 / >91% | 1 / >91% | 1 / >91% |
| Peak power (VA) — split / single phase | 12000 / 12000 | 18000 / 18000 | 18000 / 18000 |
| Motor capability | 4 HP | 6 HP | 6 HP |
| Bypass breaker | 2-pole 63 A / 63 A (L1/L2) | same | same |
| Rated battery input voltage | 51.2 V (min. starting 44 V) | same | same |
| Battery voltage range | 40.0–58.6 Vdc ±0.6 V | same | same |
| Power-saving mode | Load ≤25 W enters power-saving mode | same | same |
| Max charge current (AC charging, settable) | 120 A | 160 A | 160 A |
| Charge voltage range | 40–58.6 Vdc | same | same |
| Circuit-breaker spec (charging side) | 2-pole 40 A / 40 A (L1/L2) | 2-pole 60 A / 60 A (L1/L2) | 2-pole 60 A / 60 A (L1/L2) |
| Number of MPPT groups | 2 | 2 | 2 |
| Max PV open-circuit voltage | 500 Vdc | 500 Vdc | 500 Vdc |
| PV operating voltage / MPPT voltage range | 90–500 Vdc / 90–450 Vdc | same | same |
| Max PV input power | 4500 W + 4500 W | 6000 W + 6000 W | 9000 W + 9000 W |
| Max PV input current | 16 A + 16 A | 22 A + 22 A | 27 A + 27 A |
| PV charging current range (settable) | 150 A | 220 A | 250 A |
| AC input voltage / frequency | 85–140 VAC (±2%) / 50 or 60 Hz (auto) | same | same |
| Max charger current (AC, settable) | 0–150 A | 0–220 A | 0–250 A |
| Output waveform / overload-short-circuit protection | Pure sine / circuit breaker | same | same |
| Dimensions (L×W×H) | 580×359×127 mm | 620×450×132 mm | 620×450×132 mm |
| Net weight | 15.9 kg | 23.8 kg | 23.8 kg |
| Communication | USB / RS485 (/Wi-Fi/GPRS) / dry-node control | same | same |
| Operating / storage temp | −10 °C to 55 °C (derate above 45 °C) / −25 °C to 60 °C | same | same |
| Humidity | 5–95% (conformal coating) | same | same |
| Noise / conversion time | ≤60 dB / 10 ms (typical) | same | same |
| Cooling | Forced air, variable fan speed | same | same |
| Certification | UL 1741, EMC | same | same |

**Features (as printed):** pure sine wave solar inverter; CT zero-export to grid (optional); inverter and grid hybrid power supply capable of withstanding continuous impact loads; motor-start capability; Wi-Fi remote monitoring (optional); supports diesel generator input; parallel up to 6 units; capacitive touchscreen; can run without battery; PV and grid can power the load together; AC charging; lithium battery auto-activation by AC and PV; 125% EPS peak output for 5 s; UPS-level switching time down to 10 ms.

---

## 7. Off-Grid Solar Inverter — AN-FGI-AS 3.6KW / 6.2KW
- **Source:** PDF p.15 [printed 23–24]
- **Type:** Pure sine wave solar inverter (on/off-grid), 120 VAC output, with built-in 120 A (3.6 kW) / 100 A (6.2 kW) MPPT.
- **Modules:** `AN-FGI-AS 3.6KW`, `AN-FGI-AS 6.2KW`

| Specification | AN-FGI-AS 3.6KW | AN-FGI-AS 6.2KW |
|---|---|---|
| Phase | 1-phase | 1-phase |
| Maximum PV input power | 4200 W | 6000 W |
| Rated output power | 3600 W / 3600 VA (3000 / 3150 / 3300 as printed) | 6200 W / 6200 VA (5300 / 5500 / 5700 as printed) |
| Nominal DC / maximum DC voltage | 360 / 500 VDC | 360 / 500 VDC |
| Start-up / initial feeding voltage | 60 VDC / 90 VDC | 60 VDC / 90 VDC |
| MPPT voltage range | 60–450 VDC | 60–450 VDC |
| Max PV input current | 1 / 18 A | 1 / 22 A |
| Nominal output voltage | 120 VAC (100 / 105 / 115 V settable) | same |
| Nominal output current | 30 A | 51.5 A |
| Power factor | >0.99 | >0.99 |
| Max conversion efficiency (DC/AC) | 98% | 98% |
| Two-load output (full load = main load) | 3600 W | 6200 W |
| Second load (battery mode) | 1200 W | 2067 W |
| Load cut-off / return voltage (battery) | 26 VDC / 27 VDC | 52 VDC / 54 VDC |
| AC input start-up / auto-restart voltage | 110 VAC / 120 VAC (off-grid table) | same |
| Acceptable AC input range | 90–145 VAC ±2% (off-grid); 90–280 VAC or 170–280 VAC (hybrid) | same |
| Max AC input current | 40 A | 80 A |
| Battery-mode output | Pure sine wave, 94% (DC→AC) | same |
| Nominal DC voltage | 24 VDC | 48 VDC |
| Max solar / AC / solar+AC charging current | 120 A / 100 A / 120 A | 100 A / 100 A / 120 A ⚠️ (the solar-current value differs between two tables in the source) |
| Dimensions (D×W×H) | 420×350×110 mm | same |
| Carton dimensions | 500×415×180 mm | same |
| Net / gross weight | 8.8 kg / 10 kg | 9.5 kg / 11.5 kg |
| Communication | RS232 / RS485 / Wi-Fi / GPRS / lithium battery | same |
| Humidity / operating temperature | 5–95% / −10 °C to 50 °C | same |
| Compliance | CE | same |

⚠️ The source gives the AC input range in two different forms (110/120 VAC vs 120–140 VAC) and the charge currents in two slightly different tables. Check the datasheet before quoting these.

**Features (as printed):** pure sine wave solar inverter (on/off-grid); output power factor 1.0; Wi-Fi and GPRS for iOS and Android; can run without battery; one-key restore to factory settings; lithium battery automatic activation; dual output; built-in MPPT; high PV input voltage range (60–500 VDC); built-in anti-dust kit; smart battery-charge design.

---

## 8. Off-Grid Solar Inverter (Dual-Use) — AN-FGI-DU-4200
- **Source:** PDF p.16 [printed 25–26]
- **Type:** "Dual use on one inverter" — the catalog states this is the world's first such innovation, launched in 2025. The inverter works at 12 V or 24 V, and the battery voltage sets the rated output.
- **Modules:** `AN-FGI-DU-4200` (single module)

| Specification | 12 V battery | 24 V battery |
|---|---|---|
| Rated output power | 2300 VA / 2300 W | 4200 VA / 4200 W |
| Surge power | 4600 W | 8400 W |
| Floating charge voltage | 13.5 V | 27 V |
| Overcharge protection | 16 VDC | 32 VDC |
| Efficiency (battery → inverter, peak) | 94% | 94% |

| Other specs | Value |
|---|---|
| Input voltage | 230 VAC; selectable range 170–280 VAC (PCs) or 90–280 VAC (home appliances) |
| Input frequency | 50 / 60 Hz (auto) |
| AC voltage regulation (battery mode) | 230 VAC ±5% |
| Transfer time | 10 ms (PCs); 20 ms (home appliances) |
| Max charge current (battery) | 100 A |
| Max PV array power | 4000 W |
| MPPT range at operating voltage | 55–500 VDC |
| Max PV open-circuit voltage | 500 VDC |
| Max solar charge current | 100 A |
| Dimensions (H×W×D) | 405×305×108 mm |
| Net weight | 6.7 kg |
| Communication | RS485 / RS232 / BMS / Wi-Fi / Bluetooth (RS485 port used for BMS) |
| Humidity / operating temp / storage temp | 5–95% / −20 °C to 55 °C / −20 °C to 60 °C |

**Features (as printed):** pure sine wave output; 12 V or 24 V operation selectable (parallel or series wiring as shown in the diagram); solar and utility grid can power loads at the same time; AC input compatible with mains and generator; automatic restart when mains returns; overload, over-temperature and short-circuit protection; intelligent battery charging; cold-start function; built-in MPPT 55–500 V; Wi-Fi remote monitoring (optional); built-in anti-dust kit; RGB lights.

---

## 9. PV Solar Inverter — AN-PVI-6000W / 10000W
- **Source:** PDF p.17 [printed 27–28]
- **Type:** Pure sine wave grid-tie / hybrid-capable PV inverter, single phase.
- **Modules:** `AN-PVI-6000W` (6 kVA / 6 kW), `AN-PVI-10000W` (10 kVA / 10 kW)

| Specification | AN-PVI-6000W | AN-PVI-10000W |
|---|---|---|
| Rated power | 6 kVA / 6 kW | 10 kVA / 10 kW |
| Phase | 1-phase in / 1-phase out | same |
| Maximum PV input power | 4500 W × 2 | 4500 W × 3 |
| Maximum DC voltage | 500 Vdc | 500 Vdc |
| Start-up / initial feeding voltage | 90 Vdc / 120 Vdc | same |
| MPPT voltage range | 60–450 Vdc | same |
| MPPT trackers / max input current | 2 / 18 A | 3 / 18 A |
| Nominal output voltage | 220/230/240 VAC | same |
| Output voltage range | 184–264.5 VAC or 195.5–253 VAC or 184–264.4 VAC (selectable) | same |
| Nominal output current | 26 A | 43 A |
| Power factor / max conversion efficiency | >0.99 / 97% | >0.99 / 97% |
| AC start-up / auto-restart voltage | 120–140 VAC / 180 VAC | same |
| Acceptable AC input | 90–280 VAC or 170–280 VAC | same |
| Max AC input current | 40 A | 50 A |
| Frequency range | 50 / 60 Hz (auto) | same |
| Dimensions (D×W×H) | 300×278×106 mm | 316.8×310.6×107.3 mm |
| Net weight | 4.92 kg | 5.69 kg |
| Parallel function | No | No |
| Communication | RS232 (Wi-Fi), CAN (parallel) | same |
| IP rating / humidity | IP21 / 5–95% (non-condensing) | same |
| Operating / storage temp | −10 °C to 50 °C / −15 °C to 60 °C | same |

**Features (as printed):** pure sine wave inverter; input voltage range for home appliances and PCs configurable via LCD; grid-connection mode set via LCD; compatible with mains; auto-restart on AC recovery; overload, over-temperature and short-circuit protection; cold start; full load on solar alone; dual MPPT at 4 kW and 6 kW, triple MPPT at 10 kW and 15 kW ⚠️ (15 kW not in this table); motor capability: 1.5 HP with 4 kW, 3 HP with 6 kW, 1.5 HP + 3 HP with 10 kW, 3 HP + 3 HP with 15 kW.

---

## 10. MPPT Solar Inverter — AN-SCI-EVO 4200/6200L
- **Source:** PDF p.18 [printed 29–30]
- **Type:** Off-grid MPPT solar inverter / charger, single phase, 48 V, dual AC output, RGB lights.
- **Modules:** `AN-SCI-4200L` (4.2 kW), `AN-SCI-6200L` (6.2 kW)

| Specification | AN-SCI-4200L | AN-SCI-6200L |
|---|---|---|
| Rated power | 4200 W | 6200 W |
| Maximum PV input power | 6200 W | 8000 W |
| Nominal DC / max DC voltage | 360 / 500 VDC | same |
| Start-up / initial feeding voltage | 90 VDC / 120 VDC | same |
| MPPT voltage range | 60–450 VDC | same |
| MPPT trackers / max input current | 1 / 27 A | same |
| Nominal output voltage / range | 220/230/240 VAC / 195.5–253 VAC | same |
| Nominal output current | 27 A | 27 A |
| Power factor | >0.99 | >0.99 |
| Feed-in grid frequency range | 49–51 ±1 Hz / 59–61 ±1 Hz | same |
| Max conversion efficiency (solar → AC) | 98% | 98% |
| Full load / max main load | 4200 W | 6200 W |
| Second-load range | 840–2940 W | 1240–4340 W |
| Main-load cut-off / return voltage | 22 VDC / 26 VDC | 44 VDC / 52 VDC |
| AC start-up / auto-restart voltage | 120–140 VAC / 180 VAC | same |
| Acceptable AC input range | 90–280 VAC or 170–280 VAC | same |
| Max AC input current | 30 A | 40 A |
| Nominal operating frequency | 50 / 60 Hz | same |
| Surge power | 8400 W | 12400 W |
| Battery-mode output | 220/230/240 VAC, pure sine wave, 94% | same |
| Nominal DC (battery) voltage | 24 VDC | 48 VDC |
| Max charging current (solar → AC) / max AC charging current | 120 A / 120 A | 120 A / 120 A |
| Dimensions (D×W×H) | 423×344×112 mm | 423×344×112 mm |
| Net weight | 7.2 kg | 8.2 kg |
| Communication | Wi-Fi | Wi-Fi |
| Humidity / operating temp / storage temp | 5–95% / −10 °C to 50 °C / −15 °C to 60 °C | same |

**Features (as printed):** pure sine wave; can run without battery; one-key restore to factory settings; lithium battery automatic activation by AC and PV; built-in MPPT controller (max charge 120 A); wide PV input range; dual AC output; built-in anti-dust kit; smart battery-charge design; Wi-Fi remote monitoring (optional); RGB lights.

---

## 11. Off-Grid Solar Inverter — AN-SCI-ES Series
- **Source:** PDF p.19 [printed 31–32]
- **Type:** Compact pure sine wave off-grid inverter with built-in 40 A MPPT solar charger and 40 A AC charger.
- **Modules:** `AN-SCI-ES-1000` (1000 W), `AN-SCI-ES-1500` (1500 W)

| Specification | AN-SCI-ES-1000 | AN-SCI-ES-1500 |
|---|---|---|
| Rated power | 1000 W | 1500 W |
| Input voltage | 230 VAC | 230 VAC |
| Selectable input range | 170–280 VAC (PCs) / 90–280 VAC (home appliances) | same |
| Input frequency | 50 / 60 Hz (auto) | same |
| AC voltage regulation | 230 VAC ±5% | same |
| Surge power | 2000 VA | 3000 VA |
| Efficiency (peak) PV → INV / battery → INV | 98% / 94% | 98% / 94% |
| Transfer time | 10 ms (PCs); 20 ms (home appliances) | same |
| Battery voltage | 12 VDC | 24 VDC |
| Floating charging voltage | 13.5 VDC | 27 VDC |
| Overcharging protection | 16 VDC | 32 VDC |
| Max AC charging current | 40 A | 40 A |
| Max PV array power | 600 W | 1200 W |
| MPPT range at operating voltage | 20–150 VDC | 30–150 VDC |
| Max PV open-circuit voltage | 150 VDC | 150 VDC |
| Max solar charging current | 40 A | 40 A |
| Max (AC + solar) charging current | 80 A | 80 A |
| Maximum efficiency | 98% | 98% |
| Dimensions (D×W×H) | 286×240×91 mm | 286×240×91 mm |
| Carton dimensions | 335×295×145 mm | same |
| Net / gross weight | 3 kg / 3.5 kg | 3.5 kg / 4 kg |
| Humidity / operating temp / storage temp | 5–95% / −10 °C to 50 °C / −15 °C to 60 °C | same |

**Features (as printed):** pure sine wave solar inverter; built-in 40 A MPPT solar charger; PV input voltage range 20–150 VDC (1000 W) or 30–150 VDC (1500 W); built-in anti-dust kit; smart battery-charge design; can be customised to meet various demands.

---

## 12. Off-Grid Solar Inverter (EVO Series) — AN-SCI-EVO-2000 / 3200
- **Source:** PDF p.20 [printed 33–34]
- **Type:** Off-grid pure sine wave inverter with built-in 80 A MPPT, Wi-Fi and GPRS. Compatible with lithium batteries.
- **Modules:** `AN-SCI-EVO-2000` (2000 VA / 1600 W), `AN-SCI-EVO-3200` (3200 VA / 3000 W)

| Specification | AN-SCI-EVO-2000 | AN-SCI-EVO-3200 |
|---|---|---|
| Rated power | 2000 VA / 1600 W | 3200 VA / 3000 W |
| Input voltage | 230 VAC | 230 VAC |
| Selectable input range | 170–280 VAC (PCs) / 90–280 VAC (home appliances) | same |
| Input frequency | 50 / 60 Hz (auto) | same |
| AC voltage regulation (battery mode) | 230 VAC ±5% | same |
| Surge power | 4000 VA | 6400 VA |
| Efficiency (peak) PV → INV / battery → INV | 98% / 94% | 98% / 94% |
| Transfer time | 10 ms (PCs); 20 ms (home appliances) | same |
| Max efficiency | 98% | 98% |
| Battery voltage | 12 VDC | 24 VDC |
| Floating charge voltage | 13.5 VDC | 27 VDC |
| Overcharge protection | 16 VDC | 33 VDC |
| Max AC charge current | 60 A | 60 A |
| Max PV array power | 2000 W | 3000 W |
| MPPT range at operating voltage | 30–400 VDC | same |
| Max PV open-circuit voltage | 400 VDC | same |
| Max charging current | 80 A | 80 A |
| Dimensions (D×W×H) | 360×270×100 mm | 390×270×100 mm |
| Net weight | 4.4 kg | 5.4 kg |
| Communication | RS232 / GPRS / Wi-Fi | same |
| Ingress protection | IP21 | IP21 |
| Humidity / operating temp / storage temp | 5–95% / −10 °C to 50 °C / −15 °C to 60 °C | same |

**Features (as printed):** pure sine wave solar inverter; power factor 1.0; built-in 80 A MPPT controller; max solar input 2000 W / 3000 W; high PV input voltage range (30–400 VDC); built-in anti-dust kit; smart battery-charge design; compatible with lithium batteries.

---

## 13. Hybrid Solar Inverter (EVO Series, 4.2–10.2 kW) — AN-SCI-EVO-4200 / 6200 / 7200 / 8200 / 10200
- **Source:** PDF p.21–22 [printed 35–38] (one product, spread over two pages)
- **Type:** Grid-tie / hybrid solar inverter with battery backup. Pure sine wave, can work without a battery, built-in MPPT (120 A or 140–160 A), Wi-Fi, dual output.
- **Modules:** `AN-SCI-EVO-4200`, `AN-SCI-EVO-6200` (p.21); `AN-SCI-EVO-7200`, `AN-SCI-EVO-8200`, `AN-SCI-EVO-10200` (p.22)

| Specification | EVO-4200 | EVO-6200 | EVO-7200 | EVO-8200 | EVO-10200 |
|---|---|---|---|---|---|
| Rated power | 4200 W | 6200 W | 7200 W | 8200 W | 10200 W |
| Maximum PV input power | 6200 W | 6500 W | 7500 W | 8200 W | 10800 W |
| Nominal DC / max DC voltage | 360 / 500 VDC | same | same | same | same |
| Start-up / initial feeding voltage | 90 / 120 VDC | same | same | same | same |
| MPPT voltage range | 60–450 VDC | 60–450 VDC | 90–450 VDC | 90–450 VDC | 90–450 VDC ⚠️ |
| Max input current / trackers | 1 / 18 A | 1 / 22 A | 1 / 27 A ⚠️ | 1 / 27 A ⚠️ | 2 / 18 A ⚠️ |
| Nominal output voltage / range | 220/230/240 VAC / 195.5–253 VAC | same | same | same | same |
| Nominal output current | 18.2 A | 27.0 A | 31.3 A | 35.6 A | 44.3 A |
| Power factor | >0.99 | >0.99 | >0.99 | >0.99 | >0.99 |
| Feed-in grid frequency range | 49–51 ±1 Hz / 59–61 ±1 Hz | same | same | same | same |
| Max conversion efficiency (solar → AC) | 98% | 98% | 98% | 98% | 98% |
| Full load / max main load | 4200 W | 6200 W | 7200 W | 8200 W | 10200 W |
| Max second load (battery mode) | 1400 W | 2067 W | 2400 W | 2733 W | 3400 W |
| Main-load cut-off / return voltage | 22 / 26 VDC | 44 / 52 VDC | 44 / 48 VDC | 44 / 48 VDC | 44 / 48 VDC |
| AC start-up / auto-restart voltage | 120–140 VAC / 180 VAC | same | same | same | same |
| Acceptable AC input range | 90–280 or 170–280 VAC | same | same | same | same |
| Max AC input current | 30 A | 40 A | 40 A | 40 A | 50 A |
| Nominal operating frequency | 50 / 60 Hz | same | same | same | same |
| Surge power | 8400 W | 12400 W | 14400 W | 16400 W | 20400 W |
| Battery-mode output | 220/230/240 VAC, pure sine, 94% | same | same | same | same |
| Nominal DC (battery) voltage | 24 VDC | 48 VDC | 48 VDC | 48 VDC | 48 VDC |
| Max charge current (solar → AC) | 120 A | 120 A | 140 A | 160 A | 160 A |
| Max AC charging current | 100 A | 100 A | 120 A | 140 A | 160 A |
| Built-in MPPT controller | 120 A | 120 A | 140 A | 160 A | 160 A |
| Dimensions (D×W×H) | 420×350×110 mm | 450×350×110 mm | 500×390×130 mm | 500×390×130 mm | 530×390×130 mm |
| Net weight | 9 kg | 10 kg | 13.1 kg | 13.1 kg | 14.5 kg |
| Communication | Wi-Fi (p.22 also lists GPRS) | same | same | same | same |
| Humidity / operating temp / storage temp | 5–95% / −10 °C to 50 °C / −15 °C to 60 °C | same | same | same | same |

⚠️ On the source pages, some rows (MPPT range, trackers/current, max input current, and the 7200 W/8200 W column order) are printed as shorter lists than five models. The mapping above follows the layout, so verify it against the datasheet.

**Features (as printed):** pure sine wave; can work without battery; one-key restore to factory settings; lithium battery automatic activation by PV; built-in MPPT (120 A; 140 A for 7.2 kW; 160 A for 8.2 kW and 10.2 kW); high PV input voltage range; built-in anti-dust kit; smart battery-charge design; dual output; touch buttons; LCD display; Wi-Fi and GPRS (iOS and Android); RGB lighting by mode (red = battery, blue = utility, purple = PV).

---

## 14. Low Frequency Inverter — AN-SPI (Split Phase)
- **Source:** PDF p.23 [printed 39–40]
- **Type:** Low-frequency (transformer-based) pure sine wave inverter / charger for split-phase loads, with UPS switching, grid charging and optional MPPT (60–240 A).
- **Modules:** `SPI-2KW`, `SPI-3KW`, `SPI-5KW`, `SPI-6KW`, `SPI-8KW`, `SPI-10KW`, `SPI-12KW`

| Specification | SPI-2KW | SPI-3KW | SPI-5KW | SPI-6KW | SPI-8KW | SPI-10KW | SPI-12KW |
|---|---|---|---|---|---|---|---|
| Rated power | 2000 W | 3000 W | 5000 W | 6000 W | 8000 W | 10000 W | 12000 W |
| Surge rating (20 ms) | 6000 W | 9000 W | 15000 W | 18000 W | 24000 W | 30000 W | 36000 W |
| Net weight (solar CHG) | 16 kg | 18 kg | 27 kg | 30 kg | 32 kg | 45 kg | 50 kg |
| Shipping weight (solar CHG) | 18 kg | 20 kg | 30 kg | 33 kg | 35 kg | 50 kg | 55 kg |

| Other specs (all models) | Value |
|---|---|
| Waveform / output frequency | Pure sine wave / 50 or 60 Hz (±0.3 Hz) |
| Output voltage | HOT1+N: 110/120 VAC ±10%; HOT1+HOT2: 220/240 VAC ±10% |
| Inverter efficiency (peak) / line-mode efficiency | >85% / >95% |
| Battery voltage | 24/48 VDC (2–6 kW) and 48/96 VDC (8–12 kW) ⚠️ (mapping inferred from layout) |
| Battery types | AGM, lead-acid, lithium, ternary |
| Min. start voltage | 9.5–12.5 V adjustable (×2 for 24 V, ×4 for 48 V, ×8 for 96 V) |
| Low battery cut-off | 9.5–12.5 V adjustable; default 10 V (12 V mode) |
| Low battery alarm / high battery alarm / high battery recover | 10.5 V default / 16 V / 15.5 V (12 V mode; scaled for 24/48/96 V) |
| AC input (nominal) | HOT1+N: 110/120 VAC ±20%; HOT1+N+HOT2: 220/240 VAC ±20% |
| AC input low/max voltage | 110/120 VAC: 70–90 VAC / 130–145 VAC; 220/240 VAC: 140–180 VAC / 260–290 VAC |
| Transfer time (AC → DC) | 8 ms (max) |
| Solar charge | Optional MPPT 60 A–240 A; max PV charge current 50 / 60 / 80 / 100 / 120 A (and 240 A) |
| Max PV array power | 24 V: 1440–2880 W (60–120 A); 48 V: 2880–11520 W (60–240 A); 96 V: 11520–23040 W |
| MPPT range / max PV open-circuit voltage | 30–120 VDC / 130 VDC (24 V); 60–150 VDC / 160 VDC (48 V); 120–170 (or 270) VDC / 280 VDC (96 V) ⚠️ |
| Max AC charge current | 24 V: 40–50 A; 48 V: 20–50 A; 96 V: 20–30 A (by model) |
| Min. charge current | 5 A (adjustable in 5 A steps) |
| Standby power | <2 W |
| Dimensions (W×H×D) | 460×370×190 mm; 530×375×210 mm; 660×445×260 mm ⚠️ (only three sizes printed for seven models; mapping to models not clear) |
| Mounting / warranty | Wall mount / 1 year |

**Features (as printed):** UPS auto-switching with grid-power charging; overload, high/low-voltage and short-circuit protection; DSP intelligent control; strong inverting capability with one-time soft start; triple output peak power; works with all inductive loads; smart LCD with working-mode, charge-current, charge-voltage and battery settings; priority modes (mains, battery, energy-saving, generator, unattended); supports solar, AC and generator inputs; Wi-Fi (optional).

---

## 15. Low Frequency Inverter — AN-SPI (US Standard)
- **Source:** PDF p.24 [printed 41–42]
- **Type:** Low-frequency pure sine wave inverter / charger for US standard loads (110/120 VAC and 220/230/240 VAC), with UPS switching, grid-power charging and optional MPPT (30–240 A).
- **Modules:** `SPI-500W`, `SPI-1KW`, `SPI-1.5KW`, `SPI-2KW`, `SPI-3KW`, `SPI-5KW`, `SPI-6KW`, `SPI-8KW`, `SPI-10KW`, `SPI-12KW`

| Specification | 500 W | 1 kW | 1.5 kW | 2 kW | 3 kW | 5 kW | 6 kW | 8 kW | 10 kW | 12 kW |
|---|---|---|---|---|---|---|---|---|---|---|
| Rated power | 500 W | 1 kW | 1.5 kW | 2 kW | 3 kW | 5 kW | 6 kW | 8 kW | 10 kW | 12 kW |
| Surge rating (20 ms) | 1500 W | 3 kW | 4.5 kW | 6 kW | 9 kW | 15 kW | 18 kW | 24 kW | 30 kW | 36 kW |
| Battery voltage supported | 12 / 24 V | 12 / 24 V | 12 / 24 V | 12 / 24 / 48 V | 24 / 48 V | 48 V | 48 V | 48 V | 48 V | 48 V |
| Net weight (solar CHG) | 6 kg | 8 kg | 11 kg | 16 kg | 18 kg | 27 kg | 30 kg | 32 kg | 45 kg | 50 kg |
| Shipping weight (solar CHG) | 7 kg | 9 kg | 12 kg | 18 kg | 20 kg | 30 kg | 33 kg | 35 kg | 50 kg | 55 kg |

⚠️ Battery-voltage support is read from the layout. Verify the 24 V and 48 V columns against the datasheet.

| Other specs (all models) | Value |
|---|---|
| Waveform / power factor | Pure sine wave / 1 |
| Output voltage | 110/120 VAC or 220/230/240 VAC |
| Output frequency | 50 or 60 Hz (±0.3 Hz) |
| Inverter efficiency (peak) / line-mode efficiency | >85% / >95% |
| AC input voltage | 110/120 VAC ±25%; 220/230/240 VAC ±25% |
| AC input low / max voltage | 110/120 VAC: 70–90 VAC / 130–145 VAC; 220/240 VAC: 140–180 VAC / 260–290 VAC |
| Transfer time (AC → DC) | 8 ms (max) |
| PWM charge current | 30 / 40 / 50 / 60 A |
| MPPT charge current | 30 / 40 / 50 / 60 / 80 / 100 / 120 / 240 A |
| Max PV array power (MPPT) | 12 V: 360–720 W; 24 V: 720–2880 W; 48 V: 2400–11520 W; 96 V: 9600–23040 W |
| MPPT range | 15–80 VDC (12 V); 30–80 VDC (24 V, 30–50 A) / 30–130 VDC (24 V, 60–240 A); 60–150 VDC (48 V) |
| PWM range | 15–22 VDC (12 V); 30–45 VDC (24 V); 60–80 VDC (48 V) |
| Max PV open-circuit voltage | MPPT: 90 VDC (12 V), 90 VDC (24 V, 30–50 A), 130 VDC (24 V, 50–240 A), 160 VDC (48 V); PWM: 25 VDC (12 V), 50 VDC (24 V), 100 VDC (48 V) |
| Max AC charge current | Up to 40–50 A depending on model and battery voltage |
| Min. charge current | 5 A (adjustable in 5 A steps) |
| Dimensions (W×H×D) | 370×315×146 mm; 460×370×190 mm; 530×375×210 mm; 660×445×260 mm ⚠️ (only four sizes printed for ten models; mapping to models not clear; larger models not listed) |
| Mounting / warranty | Wall mount / 1 year |

**Features (as printed):** UPS auto-switching with grid-power charging; protections for overload, high/low voltage and short circuit; DSP intelligent control; one-time soft start; triple output peak power; works with inductive loads; smart LCD with working modes and charge settings; mains, battery, energy-saving and generator priority modes, plus unattended modes; optional MPPT 60–240 A; solar and AC inputs; Wi-Fi (optional); lithium, lead-acid, AGM and ternary battery support.
