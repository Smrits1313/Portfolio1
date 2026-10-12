const shortFilms = [
  ["ko59q3AE4aQ", "Bhairav's Challenge"],
  ["IB6h5seE-bE", "The Divine Descends"],
  ["HVuszJmISOU", "Narad's Guidance"],
  ["GIzfA8REzk4", "Daughter of Saint Ratnakar"],
  ["_MnSVtMT0VM", "Vaishnavi's New Family"],
  ["u4z14MIWihg", "The Wonder of Mata Samridhi"],
  ["cZxNxO1UpXU", "Vaishnavi, Remover of Sorrow"],
  ["eyA0IKWdl9o", "Narad's Warning to Bhairav"],
  ["v0FxLwPBCF8", "Hail Bajrang Bali"],
  ["DqSnr4cF7Hs", "The Origin of Baan Ganga"],
  ["U6jWcsluMpM", "Bhairav's Fire of Wrath"],
  ["YPIRmZggOTY", "Vaishnavi's Curiosity"],
  ["hQvRFYSDFXY", "Vaishnavi's Protector"],
  ["GiyRMYQzKTY", "Shri Vishnu's Blessings"],
  ["Txj-MZEsPCI", "Bhairav vs Bajrang Bali"],
  ["s5dsXuvT2FM", "The First Darshan"],
];

const shortsGrid = document.querySelector("#shorts-grid");
const dialog = document.querySelector("#video-dialog");
const dialogFrame = document.querySelector("#dialog-frame");
const dialogTitle = document.querySelector("#dialog-title");
const closeDialogButton = document.querySelector("#close-dialog");
const menuButton = document.querySelector(".menu-button");
const siteNav = document.querySelector(".site-nav");
const siteHeader = document.querySelector(".site-header");

shortFilms.forEach(([id, title], index) => {
  const card = document.createElement("button");
  card.className = "short-card reveal js-play";
  card.type = "button";
  card.dataset.videoId = id;
  card.dataset.title = `Episode ${index + 1}: ${title}`;
  card.dataset.orientation = "portrait";
  card.setAttribute("aria-label", `Play episode ${index + 1}: ${title}`);
  card.innerHTML = `
    <span class="short-visual">
      <img src="https://i.ytimg.com/vi/${id}/hq2.jpg" alt="" loading="lazy">
      <span class="short-index">EP ${String(index + 1).padStart(2, "0")}</span>
      <span class="short-play" aria-hidden="true">&#9654;</span>
    </span>
    <span class="short-copy">
      <p>Maa Vaishno Devi</p>
      <strong>${title}</strong>
    </span>
  `;
  shortsGrid.appendChild(card);
});

function openVideo(trigger) {
  const { videoId, title, orientation, start } = trigger.dataset;
  const startParameter = start ? `&start=${start}` : "";
  const source = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1${startParameter}`;

  dialogTitle.textContent = title;
  dialogFrame.classList.toggle("is-portrait", orientation === "portrait");
  dialogFrame.innerHTML = `
    <iframe
      src="${source}"
      title="${title}"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
  `;
  dialog.showModal();
  document.body.classList.add("dialog-open");
}

function closeVideo() {
  dialog.close();
  dialogFrame.innerHTML = "";
  document.body.classList.remove("dialog-open");
}

document.addEventListener("click", (event) => {
  const trigger = event.target.closest(".js-play");
  if (trigger) openVideo(trigger);
});

closeDialogButton.addEventListener("click", closeVideo);

dialog.addEventListener("click", (event) => {
  const bounds = dialog.getBoundingClientRect();
  const isOutside =
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom;
  if (isOutside) closeVideo();
});

dialog.addEventListener("close", () => {
  dialogFrame.innerHTML = "";
  document.body.classList.remove("dialog-open");
});

menuButton.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

siteNav.addEventListener("click", (event) => {
  if (!event.target.matches("a")) return;
  siteNav.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
});

window.addEventListener(
  "scroll",
  () => siteHeader.classList.toggle("scrolled", window.scrollY > 24),
  { passive: true },
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.08 },
);

document.querySelectorAll(".card-visual img").forEach((image) => {
  image.addEventListener(
    "error",
    () => {
      if (image.src.includes("maxresdefault")) {
        image.src = image.src.replace("maxresdefault", "hqdefault");
      }
    },
    { once: true },
  );
});

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
document.querySelector("#year").textContent = new Date().getFullYear();
