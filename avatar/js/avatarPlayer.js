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
  thumbsup: BASE_URL + "maina_thumbsup.webm"
};

const video = document.getElementById("mainaVideo");
const audio = document.getElementById("mainaAudio");
const playBtn = document.getElementById("playBtn");
const recipientName = document.getElementById("recipientName");
const summaryText = document.getElementById("summaryText");
const ticketList = document.getElementById("ticketList");

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function setAnimation(mode) {
  const src = animations[mode] || animations.idle;

  if (video.src !== src) {
    video.src = src;
    video.load();
  }

  video.muted = true;
  video.loop = true;
  video.play().catch(() => {});
}

function renderTickets(tickets) {
  ticketList.innerHTML = "";

  if (!tickets || tickets.length === 0) {
    ticketList.innerHTML = "<p>No Jira tickets found.</p>";
    return;
  }

  tickets.forEach(ticket => {
    const card = document.createElement("div");
    card.className = "ticket-card";

    card.innerHTML = `
      <div class="ticket-key">${ticket.key}</div>
      <div class="ticket-priority">${ticket.priority || "No Priority"}</div>
      <div class="ticket-summary">${ticket.summary || ""}</div>
    `;

    ticketList.appendChild(card);
  });
}

function loadMaina() {
  const name = getParam("name") || "Team Member";
  const mode = getParam("mode") || "talking";
  const audioUrl = getParam("audio");

  recipientName.textContent = `Jira Ticket Update for ${name}`;
  summaryText.textContent = `Maina has prepared a ticket update for ${name}.`;

  let tickets = [];
  try {
    const ticketsParam = getParam("tickets");
    if (ticketsParam) {
      tickets = JSON.parse(decodeURIComponent(ticketsParam));
    }
  } catch (e) {
    console.log("Invalid tickets JSON", e);
  }

  renderTickets(tickets);

  setAnimation("idle");

  if (audioUrl) {
    audio.src = audioUrl;
    audio.load();
  }

  playBtn.onclick = async () => {
    if (!audioUrl) {
      alert("No audio URL found.");
      return;
    }

    setAnimation(mode);

    audio.currentTime = 0;

    try {
      await audio.play();
    } catch (e) {
      alert("Audio blocked by browser. Click Play again.");
    }
  };

  audio.onended = () => {
    setAnimation("idle");
  };
}

document.addEventListener("DOMContentLoaded", loadMaina);
