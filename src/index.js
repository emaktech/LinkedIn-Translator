const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>LinkedIn Translator</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Google Sans', Roboto, Arial, sans-serif;
      background: #f8f9fa;
      min-height: 100vh;
      color: #202124;
    }

    /* ── Header ── */
    header {
      background: #fff;
      border-bottom: 1px solid #dadce0;
      padding: 0 24px;
      height: 64px;
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .header-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
    }
    .logo-icon {
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, #0077b5 0%, #00a0dc 100%);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: 700;
      font-size: 16px;
      letter-spacing: -0.5px;
    }
    .header-title {
      font-size: 22px;
      font-weight: 400;
      color: #202124;
    }
    .header-title span {
      color: #0077b5;
      font-weight: 600;
    }

    /* ── Language bar ── */
    .lang-bar {
      background: #fff;
      border-bottom: 1px solid #dadce0;
      display: flex;
      align-items: center;
      padding: 0 24px;
      height: 56px;
    }
    .lang-btn {
      padding: 0 20px;
      height: 48px;
      border: none;
      background: none;
      font-size: 14px;
      font-family: inherit;
      color: #444746;
      cursor: pointer;
      border-bottom: 3px solid transparent;
      transition: color 0.15s;
      white-space: nowrap;
    }
    .lang-btn.active {
      color: #0077b5;
      border-bottom-color: #0077b5;
      font-weight: 500;
    }
    .lang-btn:hover:not(.active) { background: #f1f3f4; border-radius: 4px 4px 0 0; }

    .lang-divider { width: 1px; height: 28px; background: #dadce0; margin: 0 4px; }

    .swap-btn {
      width: 40px; height: 40px;
      border: 1px solid #dadce0;
      border-radius: 50%;
      background: #fff;
      cursor: default;
      display: flex; align-items: center; justify-content: center;
      margin: 0 12px;
      color: #0077b5;
      font-size: 18px;
    }

    /* ── Main translator panel ── */
    .translator {
      max-width: 1280px;
      margin: 24px auto;
      padding: 0 24px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .panel {
      background: #fff;
      border: 1px solid #dadce0;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      min-height: 320px;
    }

    /* Panel header row */
    .panel-header {
      display: flex;
      align-items: center;
      padding: 8px 12px 0;
      gap: 4px;
    }
    .panel-lang-pill {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 6px 10px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 500;
      color: #1a73e8;
      background: none;
      border: none;
      cursor: default;
    }
    .panel-lang-pill svg { opacity: 0.7; }

    .panel-header-spacer { flex: 1; }

    .icon-btn {
      width: 36px; height: 36px;
      border: none; background: none;
      border-radius: 50%;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      color: #5f6368;
      transition: background 0.15s;
    }
    .icon-btn:hover { background: #f1f3f4; }
    .icon-btn svg { width: 20px; height: 20px; }

    .clear-btn { color: #5f6368; }

    /* Textarea */
    textarea {
      flex: 1;
      border: none;
      outline: none;
      resize: none;
      font-size: 24px;
      font-family: inherit;
      font-weight: 400;
      color: #202124;
      padding: 16px 16px 8px;
      line-height: 1.4;
      background: transparent;
      min-height: 180px;
    }
    textarea::placeholder { color: #bdc1c6; }

    /* Output text */
    .output-text {
      flex: 1;
      padding: 16px 16px 8px;
      font-size: 24px;
      color: #202124;
      line-height: 1.4;
      min-height: 180px;
      word-break: break-word;
    }
    .output-text.placeholder { color: #bdc1c6; font-size: 24px; }
    .output-text.loading {
      color: #5f6368;
      font-size: 16px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    /* Panel footer */
    .panel-footer {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      border-top: 1px solid #f1f3f4;
      gap: 4px;
      min-height: 52px;
    }

    .char-count { font-size: 12px; color: #bdc1c6; padding-left: 4px; }

    .translate-btn {
      margin-left: auto;
      padding: 10px 24px;
      background: #0077b5;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      font-family: inherit;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.15s, box-shadow 0.15s;
    }
    .translate-btn:hover { background: #005582; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
    .translate-btn:disabled { background: #dadce0; color: #fff; cursor: not-allowed; }

    .copy-btn {
      padding: 8px 20px;
      border: 1px solid #dadce0;
      border-radius: 20px;
      background: #fff;
      font-size: 13px;
      font-family: inherit;
      color: #0077b5;
      cursor: pointer;
      transition: background 0.15s;
      display: flex; align-items: center; gap: 6px;
    }
    .copy-btn:hover { background: #e8f0fe; }
    .copy-btn.copied { color: #137333; border-color: #137333; }

    .play-btn {
      padding: 8px 16px;
      border: 1px solid #dadce0;
      border-radius: 20px;
      background: #fff;
      font-size: 13px;
      font-family: inherit;
      color: #0077b5;
      cursor: pointer;
      transition: background 0.15s;
      display: flex; align-items: center; gap: 6px;
    }
    .play-btn:hover:not(:disabled) { background: #e8f0fe; }
    .play-btn.playing { color: #c5221f; border-color: #c5221f; }
    .play-btn:disabled { color: #bdc1c6; border-color: #dadce0; cursor: not-allowed; }

    .best-badge {
      display: flex; align-items: center; gap: 4px;
      padding: 8px 16px;
      border: 1px solid #dadce0;
      border-radius: 20px;
      background: #fff;
      font-size: 13px;
      color: #5f6368;
      margin-right: 4px;
    }
    .best-badge svg { color: #8430ce; }

    /* Spinner */
    .spinner {
      width: 20px; height: 20px;
      border: 2px solid #dadce0;
      border-top-color: #0077b5;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Error banner */
    .error-banner {
      background: #fce8e6;
      color: #c5221f;
      padding: 12px 16px;
      border-radius: 4px;
      margin: 0 16px 8px;
      font-size: 13px;
      display: none;
    }
    .error-banner.visible { display: block; }

    /* Tone selector */
    .tone-selector {
      display: flex;
      gap: 8px;
      padding: 8px 24px;
      max-width: 1280px;
      margin: 0 auto;
    }
    .tone-chip {
      padding: 6px 14px;
      border: 1px solid #dadce0;
      border-radius: 16px;
      font-size: 13px;
      font-family: inherit;
      background: #fff;
      color: #444746;
      cursor: pointer;
      transition: all 0.15s;
    }
    .tone-chip.active {
      background: #e8f0fe;
      border-color: #0077b5;
      color: #0077b5;
      font-weight: 500;
    }
    .tone-chip:hover:not(.active) { background: #f1f3f4; }

    .section-label {
      font-size: 12px;
      color: #5f6368;
      padding: 4px 24px 0;
      max-width: 1280px;
      margin: 0 auto;
      font-weight: 500;
      letter-spacing: 0.3px;
      text-transform: uppercase;
    }

    /* Examples */
    .examples {
      max-width: 1280px;
      margin: 8px auto 0;
      padding: 0 24px 24px;
    }
    .examples-title {
      font-size: 13px;
      color: #5f6368;
      margin-bottom: 10px;
      font-weight: 500;
    }
    .example-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .example-chip {
      padding: 8px 16px;
      border: 1px solid #dadce0;
      border-radius: 20px;
      font-size: 13px;
      background: #fff;
      color: #202124;
      cursor: pointer;
      transition: all 0.15s;
    }
    .example-chip:hover { background: #f1f3f4; border-color: #aaa; }

    /* Responsive */
    @media (max-width: 768px) {
      .translator { grid-template-columns: 1fr; }
      textarea { font-size: 18px; }
      .output-text { font-size: 18px; }
      .header-title { font-size: 18px; }
    }
  </style>
</head>
<body>

<!-- Header -->
<header>
  <a class="header-logo" href="#">
    <div class="logo-icon">in</div>
    <span class="header-title">LinkedIn <span>Translator</span></span>
  </a>
</header>

<!-- Language bar -->
<div class="lang-bar">
  <button class="lang-btn active">English</button>
  <div class="lang-divider"></div>
  <div class="swap-btn">
    <!-- swap arrows icon -->
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="17 1 21 5 17 9"></polyline>
      <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
      <polyline points="7 23 3 19 7 15"></polyline>
      <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
    </svg>
  </div>
  <button class="lang-btn active" style="color:#0077b5; border-bottom-color:#0077b5; font-weight:500;">LinkedIn Speak</button>
</div>

<!-- Tone chips -->
<div class="section-label" style="margin-top:16px;">Translation tone</div>
<div class="tone-selector">
  <button class="tone-chip active" data-tone="motivational">&#127775; Motivational</button>
  <button class="tone-chip" data-tone="humble-brag">&#128080; Humble Brag</button>
  <button class="tone-chip" data-tone="thought-leader">&#129504; Thought Leader</button>
  <button class="tone-chip" data-tone="inspirational">&#128161; Inspirational Story</button>
  <button class="tone-chip" data-tone="corporate">&#128188; Corporate Jargon</button>
</div>

<!-- Main panels -->
<div class="translator">

  <!-- Input panel -->
  <div class="panel">
    <div class="panel-header">
      <div class="panel-lang-pill">
        English
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="panel-header-spacer"></div>
      <button class="icon-btn clear-btn" id="clearBtn" title="Clear input">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>

    <textarea
      id="inputText"
      placeholder="Enter text to translate..."
      maxlength="5000"
      spellcheck="false"
      autofocus
    ></textarea>

    <div class="error-banner" id="errorBanner"></div>

    <div class="panel-footer">
      <span class="char-count" id="charCount">0 / 5000</span>
      <button class="play-btn" id="inputPlayBtn" title="Listen" disabled>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
        Listen
      </button>
      <button class="translate-btn" id="translateBtn" disabled>Translate</button>
    </div>
  </div>

  <!-- Output panel -->
  <div class="panel">
    <div class="panel-header">
      <div class="panel-lang-pill" style="color:#0077b5;">
        LinkedIn Speak
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
    </div>

    <div class="output-text placeholder" id="outputText">Translation</div>

    <div class="panel-footer">
      <div class="best-badge">
        Best
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#8430ce" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </div>
      <button class="play-btn" id="outputPlayBtn" style="display:none;" title="Listen">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
        Listen
      </button>
      <button class="copy-btn" id="copyBtn" style="display:none;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        Copy
      </button>
    </div>
  </div>

</div>

<!-- Example phrases -->
<div class="examples">
  <div class="examples-title">Try these examples:</div>
  <div class="example-chips">
    <button class="example-chip" data-text="I took a massive dump just now">I took a massive dump just now</button>
    <button class="example-chip" data-text="I got fired today">I got fired today</button>
    <button class="example-chip" data-text="I did nothing productive all day">I did nothing productive all day</button>
    <button class="example-chip" data-text="I finally woke up before noon">I finally woke up before noon</button>
    <button class="example-chip" data-text="I ate lunch at my desk alone">I ate lunch at my desk alone</button>
    <button class="example-chip" data-text="I spent 3 hours on Twitter">I spent 3 hours on Twitter</button>
    <button class="example-chip" data-text="I had a terrible meeting">I had a terrible meeting</button>
  </div>
</div>

<script>
  const inputEl = document.getElementById('inputText');
  const outputEl = document.getElementById('outputText');
  const translateBtn = document.getElementById('translateBtn');
  const clearBtn = document.getElementById('clearBtn');
  const copyBtn = document.getElementById('copyBtn');
  const charCount = document.getElementById('charCount');
  const errorBanner = document.getElementById('errorBanner');
  const toneChips = document.querySelectorAll('.tone-chip');
  const inputPlayBtn = document.getElementById('inputPlayBtn');
  const outputPlayBtn = document.getElementById('outputPlayBtn');

  let activeTone = 'motivational';
  let translating = false;
  let currentAudio = null;
  let currentPlayBtn = null;

  const SPEAKER_SVG = \`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>\`;
  const STOP_SVG = \`<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>\`;

  function resetPlayBtn(btn) {
    if (!btn) return;
    btn.innerHTML = SPEAKER_SVG + ' Listen';
    btn.classList.remove('playing');
    btn.disabled = false;
  }

  async function playTTS(text, btn) {
    // Toggle off if already playing this button
    if (currentAudio && currentPlayBtn === btn) {
      currentAudio.pause();
      currentAudio = null;
      resetPlayBtn(btn);
      currentPlayBtn = null;
      return;
    }
    // Stop any other playing audio
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
      resetPlayBtn(currentPlayBtn);
      currentPlayBtn = null;
    }
    btn.innerHTML = \`<div class="spinner" style="width:14px;height:14px;border-width:2px;flex-shrink:0"></div> Loading...\`;
    btn.disabled = true;
    try {
      const res = await fetch('/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok || !data.audioContent) throw new Error(data.error || 'TTS unavailable');
      const audio = new Audio(\`data:\${data.mimeType || 'audio/wav'};base64,\${data.audioContent}\`);
      currentAudio = audio;
      currentPlayBtn = btn;
      btn.innerHTML = STOP_SVG + ' Stop';
      btn.classList.add('playing');
      btn.disabled = false;
      audio.addEventListener('ended', () => {
        resetPlayBtn(btn);
        currentAudio = null;
        currentPlayBtn = null;
      });
      audio.play();
    } catch (err) {
      resetPlayBtn(btn);
      console.error('TTS error:', err.message);
    }
  }

  inputPlayBtn.addEventListener('click', () => {
    const text = inputEl.value.trim();
    if (text) playTTS(text, inputPlayBtn);
  });

  outputPlayBtn.addEventListener('click', () => {
    const text = outputEl.textContent;
    if (text && !outputEl.classList.contains('placeholder')) playTTS(text, outputPlayBtn);
  });

  // Tone selection
  toneChips.forEach(chip => {
    chip.addEventListener('click', () => {
      toneChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeTone = chip.dataset.tone;
    });
  });

  // Input handling
  inputEl.addEventListener('input', () => {
    const len = inputEl.value.length;
    charCount.textContent = len + ' / 5000';
    translateBtn.disabled = len === 0 || translating;
    inputPlayBtn.disabled = len === 0;
  });

  // Translate on Ctrl/Cmd+Enter
  inputEl.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (!translateBtn.disabled) doTranslate();
    }
  });

  // Clear
  clearBtn.addEventListener('click', () => {
    inputEl.value = '';
    charCount.textContent = '0 / 5000';
    translateBtn.disabled = true;
    inputPlayBtn.disabled = true;
    if (currentAudio) { currentAudio.pause(); currentAudio = null; }
    resetPlayBtn(currentPlayBtn); currentPlayBtn = null;
    setOutput('placeholder', 'Translation');
    copyBtn.style.display = 'none';
    outputPlayBtn.style.display = 'none';
    hideError();
  });

  // Copy
  copyBtn.addEventListener('click', () => {
    const text = outputEl.textContent;
    navigator.clipboard.writeText(text).then(() => {
      copyBtn.classList.add('copied');
      copyBtn.innerHTML = \`
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        Copied!\`;
      setTimeout(() => {
        copyBtn.classList.remove('copied');
        copyBtn.innerHTML = \`
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          Copy\`;
      }, 2000);
    });
  });

  // Example chips
  document.querySelectorAll('.example-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      inputEl.value = chip.dataset.text;
      charCount.textContent = inputEl.value.length + ' / 5000';
      translateBtn.disabled = false;
      doTranslate();
    });
  });

  // Translate button
  translateBtn.addEventListener('click', doTranslate);

  function setOutput(type, text) {
    outputEl.className = 'output-text ' + (type === 'placeholder' ? 'placeholder' : type === 'loading' ? 'loading' : '');
    if (type === 'loading') {
      outputEl.innerHTML = \`<div class="spinner"></div> Translating to LinkedIn speak...\`;
      outputPlayBtn.style.display = 'none';
      if (currentAudio && currentPlayBtn === outputPlayBtn) {
        currentAudio.pause(); currentAudio = null;
        resetPlayBtn(outputPlayBtn); currentPlayBtn = null;
      }
    } else {
      outputEl.textContent = text;
    }
  }

  function showError(msg) {
    errorBanner.textContent = msg;
    errorBanner.classList.add('visible');
  }
  function hideError() {
    errorBanner.classList.remove('visible');
  }

  async function doTranslate() {
    const text = inputEl.value.trim();
    if (!text || translating) return;

    translating = true;
    translateBtn.disabled = true;
    copyBtn.style.display = 'none';
    hideError();
    setOutput('loading', '');

    try {
      const res = await fetch('/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, tone: activeTone }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Translation failed');
      }

      setOutput('result', data.result);
      copyBtn.style.display = 'flex';
      outputPlayBtn.style.display = 'flex';
    } catch (err) {
      setOutput('placeholder', 'Translation');
      showError(err.message || 'Something went wrong. Please try again.');
    } finally {
      translating = false;
      translateBtn.disabled = inputEl.value.length === 0;
    }
  }
</script>
</body>
</html>`;

// WAV header utilities for Gemini TTS raw PCM output
function parseTtsMimeType(mimeType) {
  const [fileType, ...params] = mimeType.split(';').map(s => s.trim());
  const format = fileType.split('/')[1] || '';
  const opts = { numChannels: 1, sampleRate: 24000, bitsPerSample: 16 };
  if (format.startsWith('L')) {
    const bits = parseInt(format.slice(1), 10);
    if (!isNaN(bits)) opts.bitsPerSample = bits;
  }
  for (const param of params) {
    const [key, value] = param.split('=');
    if (key?.trim() === 'rate') opts.sampleRate = parseInt(value?.trim(), 10);
  }
  return opts;
}

function createWavHeader(dataLength, { sampleRate, numChannels, bitsPerSample }) {
  const buf = new ArrayBuffer(44);
  const v = new DataView(buf);
  const s = (off, str) => [...str].forEach((c, i) => v.setUint8(off + i, c.charCodeAt(0)));
  const byteRate = sampleRate * numChannels * bitsPerSample / 8;
  s(0, 'RIFF'); v.setUint32(4, 36 + dataLength, true);
  s(8, 'WAVE'); s(12, 'fmt ');
  v.setUint32(16, 16, true); v.setUint16(20, 1, true);
  v.setUint16(22, numChannels, true); v.setUint32(24, sampleRate, true);
  v.setUint32(28, byteRate, true); v.setUint16(32, numChannels * bitsPerSample / 8, true);
  v.setUint16(34, bitsPerSample, true);
  s(36, 'data'); v.setUint32(40, dataLength, true);
  return new Uint8Array(buf);
}

function wrapInWav(base64Data, mimeType) {
  const opts = parseTtsMimeType(mimeType);
  const raw = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
  const header = createWavHeader(raw.length, opts);
  const out = new Uint8Array(header.length + raw.length);
  out.set(header); out.set(raw, header.length);
  let binary = '';
  out.forEach(b => binary += String.fromCharCode(b));
  return btoa(binary);
}

// Gemini API call
async function callGemini(apiKey, text, tone) {
  const tonePrompts = {
    'motivational': `Transform the following text into an over-the-top motivational LinkedIn post. Use corporate buzzwords, talk about personal growth, hustle, grinding, and lessons learned. End with 3-5 relevant hashtags. Be dramatic and inspirational. Make it sound like every mundane action is a profound life lesson.`,
    'humble-brag': `Transform the following text into a LinkedIn humble-brag post. Act like you're being modest but clearly show off. Reference your accomplishments, your network, or how busy and important you are. End with 3-5 hashtags. Be subtly self-congratulatory.`,
    'thought-leader': `Transform the following text into a LinkedIn thought leadership post. Make it sound like deep wisdom about business, life, or the future of work. Use phrases like "unpopular opinion:", "here's what most people don't understand:", or "after X years in the industry". End with 3-5 hashtags.`,
    'inspirational': `Transform the following text into a long-form LinkedIn inspirational story. Add emotional beats, a backstory about struggle, and a triumphant conclusion with a lesson. Make it sound like a TED talk. End with 3-5 hashtags and a call to action asking people to share or comment.`,
    'corporate': `Transform the following text into dense corporate jargon LinkedIn speak. Use as many business buzzwords as possible: synergize, leverage, pivot, disruption, scalable, ROI, bandwidth, circle back, move the needle, low-hanging fruit, etc. End with 3-5 hashtags.`,
  };

  const systemPrompt = tonePrompts[tone] || tonePrompts['motivational'];

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${systemPrompt}\n\nOriginal text: "${text}"\n\nLinkedIn post:`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 1.2,
          maxOutputTokens: 512,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
        ],
      }),
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Gemini API error: ${response.status}`);
  }

  const json = await response.json();
  const result = json?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!result) throw new Error('No response from Gemini');
  return result.trim();
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Serve translate API
    if (url.pathname === '/translate' && request.method === 'POST') {
      try {
        const apiKey = env.GEMINI_API_KEY;
        if (!apiKey) {
          return Response.json(
            { error: 'GEMINI_API_KEY secret is not configured. Run: wrangler secret put GEMINI_API_KEY' },
            { status: 500 }
          );
        }

        const body = await request.json();
        const text = (body.text || '').trim().slice(0, 5000);
        const tone = body.tone || 'motivational';

        if (!text) {
          return Response.json({ error: 'No text provided' }, { status: 400 });
        }

        const result = await callGemini(apiKey, text, tone);
        return Response.json({ result });
      } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
      }
    }

    // Serve TTS API (Gemini 2.5 Pro TTS, Leda voice)
    if (url.pathname === '/tts' && request.method === 'POST') {
      try {
        const apiKey = env.GEMINI_API_KEY;
        if (!apiKey) {
          return Response.json({ error: 'GEMINI_API_KEY secret is not configured.' }, { status: 500 });
        }
        const body = await request.json();
        const text = (body.text || '').trim().slice(0, 3000);
        if (!text) return Response.json({ error: 'No text provided' }, { status: 400 });

        const ttsRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro-preview-tts:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ role: 'user', parts: [{ text: `Read aloud in a warm and friendly tone: ${text}` }] }],
              generationConfig: {
                temperature: 1,
                responseModalities: ['audio'],
                speechConfig: {
                  voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Leda' } },
                },
              },
            }),
          }
        );
        if (!ttsRes.ok) {
          const err = await ttsRes.json().catch(() => ({}));
          throw new Error(err?.error?.message || `Gemini TTS error: ${ttsRes.status}`);
        }
        const json = await ttsRes.json();
        const part = json?.candidates?.[0]?.content?.parts?.[0]?.inlineData;
        if (!part) throw new Error('No audio in Gemini TTS response');

        const mimeType = part.mimeType || '';
        // Gemini returns raw PCM (audio/L16) — wrap in WAV header for browser playback
        const isRawPcm = !mimeType.includes('wav') && !mimeType.includes('mp3') && !mimeType.includes('ogg');
        const audioContent = isRawPcm ? wrapInWav(part.data, mimeType) : part.data;
        const audioMime = mimeType.includes('mp3') ? 'audio/mp3' : 'audio/wav';

        return Response.json({ audioContent, mimeType: audioMime });
      } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
      }
    }

    // Serve HTML for all other GET requests
    return new Response(HTML, {
      headers: { 'Content-Type': 'text/html;charset=UTF-8' },
    });
  },
};
