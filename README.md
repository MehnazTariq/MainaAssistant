# 🤖 Maina Assistant

An AI-powered animated virtual assistant for Google Chat, Jira and n8n.

Maina presents Jira tickets with synchronized voice, animated avatar, facial expressions and dynamic ticket information.

---

## Features

- 🎙️ Voice playback
- 👄 Lip-sync animation
- 😊 Multiple facial expressions
- 👀 Idle animation
- 👋 Wave animation
- 👍 Thumbs-up animation
- 📋 Dynamic Jira ticket presentation
- 🔊 Audio synchronized with avatar
- 💬 Designed for Google Chat cards
- 🔄 Easily integrated with n8n workflows

---

## Repository Structure

```
MainaAssistant/
│
├── avatar/
│   ├── animations/
│   │     maina_idle.webm
│   │     maina_talking.webm
│   │     maina_listening.webm
│   │     maina_smile.webm
│   │     maina_wave.webm
│   │     maina_alert.webm
│   │     maina_happy.webm
│   │     maina_serious.webm
│   │     maina_loading.webm
│   │     maina_thinkning.webm
│   │     maina_thumbsup.webm
│   │
│   ├── css/
│   │     avatar.css
│   │
│   ├── js/
│   │     avatarPlayer.js
│   │
│   └── player.html
│
├── audio/
│
├── video/
│     maina.wav
│
├── scripts/
│
└── README.md
```

---

# Live Demo

```
https://mehnaztariq.github.io/MainaAssistant/avatar/player.html
```

---

# URL Parameters

The player accepts parameters from the URL.

Example

```
player.html?
name=Nicola%20G&
mode=talking&
audio=https://mehnaztariq.github.io/MainaAssistant/video/maina.wav
```

Supported parameters

| Parameter | Description |
|------------|-------------|
| name | Person's name |
| mode | Avatar animation |
| audio | WAV audio URL |
| tickets | Encoded Jira ticket JSON |

Example

```
mode=idle
mode=talking
mode=smile
mode=wave
mode=thinking
mode=happy
mode=alert
mode=loading
mode=listening
mode=thumbsup
mode=serious
```

---

# Integration

Maina can be embedded into:

- Google Chat
- n8n
- Jira
- Atlassian Rovo
- Microsoft Teams
- Slack
- Internal dashboards

---

# Technologies

- HTML5
- CSS3
- JavaScript
- WebM Animation
- WAV Audio
- GitHub Pages
- n8n
- Jira Cloud
- Google Chat

---

# Future Roadmap

- AI-generated voice
- Live lip sync
- GPT integration
- Streaming audio
- Multiple avatars
- Theme switching
- Jira live updates
- Emotion engine

---

# Author

**Mehnaz Tariq**

AI Automation Engineer

---

# License

MIT License
