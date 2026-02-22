// Initial lucide replacement
if (window.lucide) {
  lucide.createIcons();
}

const state = {
  isScrolled: false,
  isMenuOpen: false,
  activeTab: 0,
};

const nav = document.getElementById("nav");
const brandText = document.getElementById("brandText");
const navLinks = document.getElementById("navLinks");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const heroBg = document.getElementById("heroBg");

const seasonImg = document.getElementById("seasonImg");
const seasonText = document.getElementById("seasonText");

const seasonImages = [
  "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1550506389-e9977585fdd2?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80",
];

const seasonTexts = [
  "冬の島にんじん。火を入れると驚くほど甘くなります。ポタージュにして少し豆乳を加えるのもおすすめ。にんじん嫌いが食べられた、という声が届く季節です。",
  "春の芽吹き。一番やわらかい葉野菜たちが並びます。アクが少なく、香りが鮮烈なこの時期の野菜は、ぜひ生のサラダで体感してください。",
  "太陽の生命力。ゴーヤーや空芯菜など、沖縄の猛烈な日差しをエネルギーに変える野菜たち。水分を自ら蓄えた濃厚な味を楽しめます。",
  "秋の安らぎ。さつまいもなど、ほくほくとした甘みが増してくる季節。赤土が持つミネラルをじっくりと蓄えた根菜たちが主役です。",
];

function applyScrollState() {
  const scrolled = window.scrollY > 50;
  state.isScrolled = scrolled;

  nav.classList.toggle("nav--scrolled", scrolled);

  // brand color
  brandText.classList.toggle("brand--dark", scrolled);
  brandText.classList.toggle("brand--light", !scrolled);

  // nav links color
  navLinks.classList.toggle("nav__links--dark", scrolled);
  navLinks.classList.toggle("nav__links--light", !scrolled);

  // contact button style swap
  const contactBtn = document.getElementById("contactBtn");
  if (contactBtn) {
    if (scrolled) {
      contactBtn.classList.remove("btn--outline-light");
      contactBtn.style.borderColor = "#064e3b";
      contactBtn.style.color = "#064e3b";
      contactBtn.onmouseenter = () => {
        contactBtn.style.background = "#064e3b";
        contactBtn.style.color = "#ffffff";
      };
      contactBtn.onmouseleave = () => {
        contactBtn.style.background = "transparent";
        contactBtn.style.color = "#064e3b";
      };
    } else {
      contactBtn.classList.add("btn--outline-light");
      contactBtn.style.borderColor = "";
      contactBtn.style.color = "";
      contactBtn.style.background = "";
      contactBtn.onmouseenter = null;
      contactBtn.onmouseleave = null;
    }
  }

  // hero parallax-ish translate
  if (heroBg) {
    heroBg.style.transform = `scale(1.10) translateY(${scrolled ? "10%" : "0%"})`;
  }

  // menu button icon color
  if (menuBtn) {
    menuBtn.style.color = scrolled ? "#022c22" : "#ffffff";
  }
}

function setMenu(open) {
  state.isMenuOpen = open;
  mobileMenu.classList.toggle("is-open", open);
  mobileMenu.setAttribute("aria-hidden", open ? "false" : "true");

  // swap icon
  const iconHolder = menuBtn.querySelector("i[data-lucide]");
  if (iconHolder) {
    iconHolder.setAttribute("data-lucide", open ? "x" : "menu");
    lucide.createIcons();
  }

  // prevent body scroll when open
  document.body.style.overflow = open ? "hidden" : "";
}

function setTab(idx) {
  state.activeTab = idx;

  // update active class
  document.querySelectorAll(".tab").forEach((btn) => {
    btn.classList.toggle("is-active", Number(btn.dataset.tab) === idx);
  });

  // update media
  seasonImg.src = seasonImages[idx];
  seasonText.textContent = seasonTexts[idx];
}

function setupTabs() {
  // init
  setTab(0);

  document.querySelectorAll(".tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      setTab(Number(btn.dataset.tab));
    });
  });
}

function setupRevealObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

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

menuBtn.addEventListener("click", () => setMenu(!state.isMenuOpen));
mobileMenu.addEventListener("click", (e) => {
  // overlayクリックで閉じる（リンククリックは除外）
  if (e.target === mobileMenu) setMenu(false);
});

// ESCで閉じる
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && state.isMenuOpen) setMenu(false);
});

// Init
applyScrollState();
setupTabs();
setupRevealObserver();
setupHeroScrollHint();
