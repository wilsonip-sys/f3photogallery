// 相片清單：來自 photo/ 資料夾（filelist.txt）
const photos = [
  { src: "photo/韓進謙.jpg", title: "韓進謙" },
  { src: "photo/馮緯鐮.png", title: "馮緯鐮" },
  { src: "photo/高藝馨.jpg", title: "高藝馨" },
  { src: "photo/梁凱程.jpg", title: "梁凱程" },
  { src: "photo/蕭汶心.png", title: "蕭汶心" },
  { src: "photo/陳宇軒.png", title: "陳宇軒" },
  { src: "photo/黃逸鋒.png", title: "黃逸鋒" },
  { src: "photo/鄭婷婷.jpg", title: "鄭婷婷" },
  { src: "photo/葉海晴.png", title: "葉海晴" },
  { src: "photo/李婉豪.png", title: "李婉豪" },
  { src: "photo/江可晴.jpeg", title: "江可晴" },
  { src: "photo/江彥瑜.jpg", title: "江彥瑜" },
  { src: "photo/曾渝芸.png", title: "曾渝芸" }
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

