// 相片清單：來自 photo/ 資料夾（filelist.txt）
const photos = [
  { src: "photo/葉海晴.png", title: "葉海晴" },
  { src: "photo/陳宇軒.png", title: "陳宇軒" },
  { src: "photo/蕭汶心.png", title: "蕭汶心" },
  { src: "photo/江彥瑜.jpg", title: "江彥瑜" },
  { src: "photo/鄭婷婷.jpg", title: "鄭婷婷" },
  { src: "photo/高藝馨.jpg", title: "高藝馨" },
  { src: "photo/黃逸鋒.png", title: "黃逸鋒" },
  { src: "photo/曾渝芸.png", title: "曾渝芸" },
  { src: "photo/韓進謙.jpg", title: "韓進謙" },
  { src: "photo/馮緯鐮.png", title: "馮緯鐮" },
  { src: "photo/梁凱程.jpg", title: "梁凱程" },
  { src: "photo/李婉豪.png", title: "李婉豪" },
  { src: "photo/江可晴.jpeg", title: "江可晴" },
  { src: "photo/姚子琪.png", title: "姚子琪" },
  { src: "photo/林凱森.jpeg", title: "林凱森" },
  { src: "photo/曾渝芸2.jpg", title: "曾渝芸" },
  { src: "photo/盧靖雅.png", title: "盧靖雅" },
  { src: "photo/鮑奕萌.jpeg", title: "鮑奕萌" },
  { src: "photo/何雅瞳.jpg", title: "何雅瞳" },
  { src: "photo/李雪峯.png", title: "李雪峯" },
  { src: "photo/葉愛臨.jpg", title: "葉愛臨" },
  { src: "photo/鄺思維.jpg", title: "鄺思維" },
  { src: "photo/何允浵.png", title: "何允浵" },
  { src: "photo/阮智樂.jpeg", title: "阮智樂" },
  { src: "photo/林子樂.png", title: "林子樂" },
  { src: "photo/胡子樂.png", title: "胡子樂" },
  { src: "photo/李卓霆.png", title: "李卓霆" },
  { src: "photo/林熙敏.jpeg", title: "林熙敏" },
  { src: "photo/閆權榮.jpg", title: "閆權榮" },
  { src: "photo/劉卓凝.jpg", title: "劉卓凝" },
  { src: "photo/黃逸鋒2.jpg", title: "黃逸鋒" },
  { src: "photo/陳啟榮.png", title: "陳啟榮" }
];

const galleryEl = document.getElementById("gallery");
const lightboxEl = document.getElementById("lightbox");
const lightboxImageEl = document.getElementById("lightbox-image");
const lightboxCaptionTextEl = document.getElementById("lightbox-caption-text");
const lightboxCounterEl = document.getElementById("lightbox-counter");

const btnPrev = lightboxEl.querySelector("[data-lightbox-prev]");
const btnNext = lightboxEl.querySelector("[data-lightbox-next]");
const closeTargets = lightboxEl.querySelectorAll("[data-lightbox-close]");

let currentIndex = 0;
let isOpen = false;

function renderGallery() {
  if (!galleryEl) return;
  galleryEl.innerHTML = "";

  photos.forEach((photo, index) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "gallery-item";
    item.setAttribute("aria-label", photo.title || `相片 ${index + 1}`);

    const img = document.createElement("img");
    img.className = "gallery-image";
    img.src = photo.src;
    img.alt = photo.title || "";

    const overlay = document.createElement("div");
    overlay.className = "gallery-item-overlay";

    const caption = document.createElement("div");
    caption.className = "gallery-item-caption";
    caption.textContent = photo.title || `相片 ${index + 1}`;

    const zoomChip = document.createElement("div");
    zoomChip.className = "gallery-item-zoomchip";
    zoomChip.textContent = "點擊放大";

    overlay.appendChild(caption);
    overlay.appendChild(zoomChip);

    item.appendChild(img);
    item.appendChild(overlay);

    item.addEventListener("click", () => {
      openLightbox(index);
    });

    galleryEl.appendChild(item);
  });
}

function updateLightboxContent() {
  if (!photos.length) return;

  const photo = photos[currentIndex];
  lightboxImageEl.src = photo.src;
  lightboxImageEl.alt = photo.title || "";
  lightboxCaptionTextEl.textContent = photo.title || "";
  lightboxCounterEl.textContent = `${currentIndex + 1} / ${photos.length}`;
}

function openLightbox(index) {
  if (!photos.length) return;
  currentIndex = index;
  isOpen = true;
  updateLightboxContent();
  lightboxEl.classList.add("is-open");
  lightboxEl.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  isOpen = false;
  lightboxEl.classList.remove("is-open");
  lightboxEl.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function showNext() {
  if (!photos.length) return;
  currentIndex = (currentIndex + 1) % photos.length;
  updateLightboxContent();
}

function showPrev() {
  if (!photos.length) return;
  currentIndex = (currentIndex - 1 + photos.length) % photos.length;
  updateLightboxContent();
}

function onKeyDown(event) {
  if (!isOpen) return;
  switch (event.key) {
    case "Escape":
      closeLightbox();
      break;
    case "ArrowRight":
      showNext();
      break;
    case "ArrowLeft":
      showPrev();
      break;
  }
}

function setupLightboxEvents() {
  btnPrev.addEventListener("click", showPrev);
  btnNext.addEventListener("click", showNext);

  closeTargets.forEach((el) => {
    el.addEventListener("click", () => {
      closeLightbox();
    });
  });

  document.addEventListener("keydown", onKeyDown);
}

document.addEventListener("DOMContentLoaded", () => {
  renderGallery();
  setupLightboxEvents();
});

