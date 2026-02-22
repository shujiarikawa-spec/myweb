// Lucide icons
if (window.lucide) {
  lucide.createIcons();
}

const state = {
  isScrolled: false,
  activeTab: 0,
};

const nav = document.getElementById("nav");
const heroBg = document.getElementById("heroBg");

const seasonImg = document.getElementById("seasonImg");
const seasonText = document.getElementById("seasonText");

const seasonImages = [
  "images/second.jpg",
  "images/third.jpg",
  "images/forth.JPG",
  "images/fifth.jpg",
];

const seasonTexts = [
  "冬の島にんじん。火を入れると驚くほど甘くなります。ポタージュにして少し豆乳を加えるのもおすすめ。にんじん嫌いが食べられた、という声が届く季節です。",
  "春の芽吹き。一番やわらかい葉野菜たちが並びます。アクが少なく、香りが鮮烈なこの時期の野菜は、ぜひ生のサラダで体感してください。",
  "太陽の生命力。ゴーヤーや空芯菜など、沖縄の猛烈な日差しをエネルギーに変える野菜たち。水分を自ら蓄えた濃厚な味を楽しめます。",
  "秋の安らぎ。さつまいもなど、ほくほくとした甘みが増してくる季節。赤土が持つミネラルをじっくりと蓄えた根菜たちが主役です。",
];

// ===== Scroll state =====
function applyScrollState() {
  const scrolled = window.scrollY > 50;
  state.isScrolled = scrolled;

  if (nav) nav.classList.toggle("nav--scrolled", scrolled);

  // hero parallax-ish translate
  if (heroBg) {
    heroBg.style.transform = `scale(1.10) translateY(${scrolled ? "10%" : "0%"})`;
  }
}

// ===== Tabs (data-tab="0" 形式に対応) =====
function setTab(idx) {
  state.activeTab = idx;

  // active class
  document.querySelectorAll(".tab[data-tab]").forEach((btn) => {
    btn.classList.toggle("is-active", Number(btn.dataset.tab) === idx);
  });

  // media
  if (seasonImg) seasonImg.src = seasonImages[idx] || seasonImages[0];
  if (seasonText) seasonText.textContent = seasonTexts[idx] || "";
}

function setupTabs() {
  const tabs = document.querySelectorAll(".tab[data-tab]");
  if (!tabs.length) return;

  // init
  setTab(0);

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      setTab(Number(btn.dataset.tab));
    });
  });
}

// ===== Reveal animation =====
function setupRevealObserver() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    },
    { threshold: 0.1 }
  );

  els.forEach((el) => observer.observe(el));
}

// ===== Hero scroll hint =====
function setupHeroScrollHint() {
  const scrollHint = document.querySelector(".hero__scroll");
  if (!scrollHint) return;

  scrollHint.addEventListener("click", () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  });
}

// Events
window.addEventListener("scroll", applyScrollState);
window.addEventListener("resize", applyScrollState);

// Init
applyScrollState();
setupTabs();
setupRevealObserver();
setupHeroScrollHint();
