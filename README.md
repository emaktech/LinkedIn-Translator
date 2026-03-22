# LinkedIn Translator

Transform any plain English text into hilarious LinkedIn corporate speak, powered by Google Gemini AI. A pixel-faithful clone of the Google Translate UI.

![LinkedIn Translator screenshot](https://i.imgur.com/placeholder.png)

## Features

- **5 translation tones**: Motivational, Humble Brag, Thought Leader, Inspirational Story, Corporate Jargon
- **Google Translate-style UI** with language bar, swap button, character count, copy button
- **Example phrases** to get you started (including the classic)
- **Keyboard shortcut**: `Ctrl+Enter` / `Cmd+Enter` to translate
- Powered by **Gemini 2.0 Flash** for fast, creative results
- Deployed on **Cloudflare Workers** — globally distributed, zero cold starts

## Setup & Deployment

### 1. Install dependencies

```bash
npm install
```

### 2. Add your Gemini API key as a Cloudflare secret

```bash
npx wrangler secret put GEMINI_API_KEY
```

Get a free API key at [Google AI Studio](https://aistudio.google.com/app/apikey).

### 3. Run locally

```bash
npm run dev
```

For local dev with the secret, create a `.dev.vars` file (git-ignored):

```
GEMINI_API_KEY=your_api_key_here
```

### 4. Deploy to Cloudflare Workers

```bash
npm run deploy
```

## Example

**Input:** "I took a massive dump just now"

**LinkedIn Speak (Motivational):**
> I just successfully completed a high-volume output optimization session. It's all about streamlining processes and making room for the next big challenge. #Efficiency #GrowthMindset #ProductivityHacks
