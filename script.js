/* ================= NAVBAR SCROLL EFFECT ================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});


/* ================= HAMBURGER MENU ================= */

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});


/* ================= SMOOTH SCROLL ================= */

document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function(e) {

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth"
      });

      navLinks.classList.remove("active");
    }
  });
});


/* ================= REVEAL ANIMATION ================= */

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {

  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });

}, { threshold: 0.2 });

reveals.forEach(el => revealObserver.observe(el));


/* ================= ACTIVE NAV LINK ================= */

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });

});


/* ================= GALERI CINEMATIC SLIDER ================= */

const galeriTrack = document.querySelector(".galeri-track");

if (galeriTrack) {

  let scrollAmount = 0;

  function autoScrollGaleri() {
    scrollAmount += 1;

    if (scrollAmount >= galeriTrack.scrollWidth / 2) {
      scrollAmount = 0;
    }

    galeriTrack.scrollTo({
      left: scrollAmount,
      behavior: "auto"
    });

    requestAnimationFrame(autoScrollGaleri);
  }

  autoScrollGaleri();
}

document.querySelectorAll(".galeri-track.static video").forEach(v => {
    v.muted = true;
    v.autoplay = true;
    v.loop = true;
    v.play();
});

/* ================= PRESTASI SLIDER ================= */

const prestasiTrack = document.querySelector(".prestasi-track");

if (prestasiTrack) {

  let prestasiScroll = 0;

  function autoScrollPrestasi() {

    prestasiScroll += 1;

    if (prestasiScroll >= prestasiTrack.scrollWidth / 2) {
      prestasiScroll = 0;
    }

    prestasiTrack.scrollTo({
      left: prestasiScroll,
      behavior: "auto"
    });

    requestAnimationFrame(autoScrollPrestasi);
  }

  autoScrollPrestasi();
}

/* ================= TEXT HERO REVEAL DELAY ================= */

window.addEventListener("load", () => {

  const heroText = document.querySelectorAll(".hero-content h1, .hero-content p, .hero-btn");

  heroText.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.3}s`;
  });

});

const dockItems = document.querySelectorAll(".dock-item");

dockItems.forEach((item, index) => {
  item.addEventListener("mouseenter", () => {

    dockItems.forEach(el => el.style.transform = "scale(1)");

    item.style.transform = "scale(1.4)";

    if(dockItems[index - 1])
      dockItems[index - 1].style.transform = "scale(1.2)";

    if(dockItems[index + 1])
      dockItems[index + 1].style.transform = "scale(1.2)";
  });

  item.addEventListener("mouseleave", () => {
    dockItems.forEach(el => el.style.transform = "scale(1)");
  });
});
