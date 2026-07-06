const BASE_URL = ""https://mehnaztariq.github.io/MainaAssistant/avatar/animations/";

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

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function setAnimation(type) {
  const src = animations[type] || animations.idle;
  if (video.src !== src) {
    video.src = src;
    video.load();
    video.play();
  }
}

function renderTickets(tickets) {
  ticketList.innerHTML = "";

  if (!tickets || tickets.length === 0) {
    ticketList.innerHTML = "<p>No Jira tickets found.</p>";
    return;
  }

  tickets.forEach(ticket => {
    const div = document.createElement("div");
    div.className = "ticket-card";

    div.innerHTML = `
      <div class="ticket-key">${ticket.key}</div>
      <div class="ticket-priority">${ticket.priority || "No Priority"}</div>
      <div class="ticket-summary">${ticket.summary || ""}</div>
    `;

    ticketList.appendChild(div);
  });
}

function loadData() {
  const name = getQueryParam("name") || "Team Member";
  const audioUrl = getQueryParam("audio");
  const mode = getQueryParam("mode") || "talking";

  let tickets = [];

  try {
    const ticketJson = getQueryParam("tickets");
    if (ticketJson) {
      tickets = JSON.parse(decodeURIComponent(ticketJson));
    }
  } catch (e) {
    console.error("Invalid ticket JSON", e);
  }

  recipientName.textContent = `Jira Ticket Update for ${name}`;
  summaryText.textContent = `Maina has prepared a ticket update for ${name}.`;

  renderTickets(tickets);

  if (audioUrl) {
    audio.src = audioUrl;
  }

  setAnimation("idle");

window.onload = async () => {

    if(audioUrl){

        setAnimation(mode);

        audio.currentTime=0;

        try{
            await audio.play();
        }
        catch(e){
            console.log(e);
        }

    }

};

  audio.onended = () => {
    setAnimation("idle");
  };
}

loadData();
