const BASE_URL = "https://mehnaztariq.github.io/MainaAssistant/avatar/animations/";

const animations = {
  idle: BASE_URL + "maina_idle.webm",
  talking: BASE_URL + "maina_talking.webm",
  alert: BASE_URL + "maina_alert.webm",
  wave: BASE_URL + "maina_wave.webm",
  listening: BASE_URL + "maina_listening.webm",
  loading: BASE_URL + "maina_loading.webm",
  thinking: BASE_URL + "maina_thinking.webm",
  smile: BASE_URL + "maina_smile.webm",
  serious: BASE_URL + "maina_serious.webm",
  thumbsup: BASE_URL + "maina_thumbsup.webm",
  happy: BASE_URL + "maina_happy.webm"
};

const video = document.getElementById("mainaVideo");
const audio = document.getElementById("mainaAudio");
const playBtn = document.getElementById("playBtn");
const blinkLayer = document.getElementById("blinkLayer");

const recipientName = document.getElementById("recipientName");
const summaryText = document.getElementById("summaryText");
const ticketList = document.getElementById("ticketList");

let currentMode = "idle";
let requestedMode = "talking";
let blinkTimer = null;
let expressionTimer = null;

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function setAnimation(mode) {
  const src = animations[mode] || animations.idle;

  if (currentMode === mode && video.src === src) return;

  currentMode = mode;
  video.src = src;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.load();

  video.play().catch(() => {});
}

function blink() {
  blinkLayer.classList.add("blink");
  setTimeout(() => blinkLayer.classList.remove("blink"), 220);
}

function startBlinking() {
  stopBlinking();

  function scheduleBlink() {
    const delay = 2500 + Math.random() * 3500;
    blinkTimer = setTimeout(() => {
      blink();
      scheduleBlink();
    }, delay);
  }

  scheduleBlink();
}

function stopBlinking() {
  if (blinkTimer) clearTimeout(blinkTimer);
}

function renderTickets(tickets) {
  ticketList.innerHTML = "";

  if (!tickets || tickets.length === 0) {
    ticketList.innerHTML = "<p>No Jira tickets found.</p>";
    return;
  }

  tickets.forEach(ticket => {
    const priority = ticket.priority || "No Priority";
    const summary = ticket.summary || "";

    const card = document.createElement("div");
    card.className = "ticket-card";

    card.innerHTML = `
      <div class="ticket-key">${ticket.key}</div>
      <div class="ticket-priority">${priority}</div>
      <div class="ticket-summary">${summary}</div>
    `;

    ticketList.appendChild(card);
  });
}

function detectModeFromTickets(tickets, defaultMode) {
  const priorities = tickets.map(t => String(t.priority || "").toLowerCase());

  if (priorities.some(p => p.includes("highest") || p.includes("critical") || p.includes("blocker") || p.includes("p1"))) {
    return "alert";
  }

  if (priorities.some(p => p.includes("high") || p.includes("p2"))) {
    return "serious";
  }

  if (!tickets || tickets.length === 0) {
    return "wave";
  }

  return defaultMode || "talking";
}

function startExpressionCycle() {
  stopExpressionCycle();

  expressionTimer = setInterval(() => {
    if (audio.paused || audio.ended) return;

    const r = Math.random();

    if (requestedMode === "alert" || requestedMode === "serious") {
      setAnimation(requestedMode);
      return;
    }

    if (r < 0.70) {
      setAnimation("talking");
    } else if (r < 0.84) {
      setAnimation("smile");
    } else if (r < 0.94) {
      setAnimation("thinking");
    } else {
      setAnimation("listening");
    }

    setTimeout(() => {
      if (!audio.paused && !audio.ended) {
        setAnimation("talking");
      }
    }, 1400);

  }, 3500);
}

function stopExpressionCycle() {
  if (expressionTimer) clearInterval(expressionTimer);
}

function loadMaina() {
  const name = getParam("name") || "Team Member";
  const audioUrl = getParam("audio");
  const modeFromUrl = getParam("mode") || "talking";

  let tickets = [];

  try {
    const ticketsParam = getParam("tickets");
    if (ticketsParam) {
      tickets = JSON.parse(decodeURIComponent(ticketsParam));
    }
  } catch (e) {
    console.log("Invalid tickets JSON", e);
  }

  requestedMode = detectModeFromTickets(tickets, modeFromUrl);

  recipientName.textContent = `Jira Ticket Update for ${name}`;

  if (tickets.length > 0) {
    summaryText.textContent = `Maina found ${tickets.length} Jira ticket(s) for ${name}.`;
  } else {
    summaryText.textContent = `Maina found no Jira tickets for ${name}.`;
  }

  renderTickets(tickets);

  setAnimation("idle");
  startBlinking();

  if (audioUrl) {
    audio.src = audioUrl;
    audio.load();
  }

  playBtn.onclick = async () => {
    if (!audioUrl) {
      alert("No audio URL found.");
      return;
    }

    setAnimation(requestedMode);

    audio.currentTime = 0;

    try {
      await audio.play();
      startExpressionCycle();
    } catch (e) {
      alert("Audio blocked by browser. Click Play again.");
    }
  };

  audio.onended = () => {
    stopExpressionCycle();

    if (requestedMode === "alert" || requestedMode === "serious") {
      setAnimation("thumbsup");
      setTimeout(() => setAnimation("idle"), 1800);
    } else {
      setAnimation("smile");
      setTimeout(() => setAnimation("idle"), 1800);
    }
  };
}

document.addEventListener("DOMContentLoaded", loadMaina);
