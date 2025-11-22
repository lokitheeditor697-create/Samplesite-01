// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector("nav ul");
menuToggle.addEventListener("click", () => navMenu.classList.toggle("show"));

// Smooth fade-in on scroll
const fadeSections = document.querySelectorAll(".fade-section");
const revealOnScroll = () => {
  const trigger = window.innerHeight * 0.85;
  fadeSections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < trigger) section.classList.add("visible");
  });
};
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);



document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".logo-track");

  // Duplicate for seamless loop
  track.innerHTML += track.innerHTML;

  let speed = .5;
  let pos = 0;

  function scroll() {
    pos -= speed;
    track.style.transform = `translateX(${pos}px)`;

    if (Math.abs(pos) > track.scrollWidth / 2) {
      pos = 0;
    }
    requestAnimationFrame(scroll);
  }

  scroll();

  // Pause on hover
  track.addEventListener("mouseenter", () => speed = 0);
  track.addEventListener("mouseleave", () => speed = 0.5);
});



// Highlight active nav link while scrolling
document.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");

  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});
/// ===== Scroll Spy Navigation =====
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav ul li a");

  function activateLink() {
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120; // adjust for header height
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href").includes(sectionId)) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", activateLink);
});


// FILTER ITEMS
const cards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    
    // highlight selected
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    let filter = btn.dataset.filter;

    cards.forEach(card => {
      if (filter === "all" || card.dataset.category === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});


// MODAL FULLSCREEN VIEW
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImage");
const closeBtn = document.querySelector(".close");

cards.forEach(card => {
  card.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = card.querySelector("img").src;
  });
});

closeBtn.onclick = () => {
  modal.style.display = "none";
};
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener("click", () => {
    const page = card.dataset.link;
    if (page) {
      window.location.href = page; // Redirect
    }
  });
});

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // Remove previous active
    filterButtons.forEach(b => b.classList.remove("active"));
    // Add new active
    btn.classList.add("active");
  });
});





const filterBtns = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('.p-item');

let visibleItems = [];  // store currently visible images for lightbox
let currentIndex = 0;

// ---------- FILTER LOGIC ----------
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {

    // change active button
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    visibleItems = []; // reset visible items

    items.forEach((item, index) => {
      if (filter === "all" || item.dataset.category === filter) {
        item.style.display = "block";
        visibleItems.push(item.querySelector("img"));  
      } else {
        item.style.display = "none";
      }
    });

    attachClickEvents();  // reattach click events after filtering
  });
});


// ---------- LIGHTBOX SETUP ----------
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = visibleItems[index].src;
  lightbox.style.display = "block";
}

function attachClickEvents() {
  visibleItems.forEach((img, index) => {
    img.onclick = () => openLightbox(index);
  });
}

// Initial load: show all images
visibleItems = Array.from(document.querySelectorAll(".p-item img"));
attachClickEvents();


// ---------- LIGHTBOX CLOSE ----------
document.querySelector(".close").onclick = () => {
  lightbox.style.display = "none";
};


// ---------- NEXT ----------
document.querySelector(".next").onclick = () => {
  currentIndex = (currentIndex + 1) % visibleItems.length;
  lightboxImg.src = visibleItems[currentIndex].src;
};

// ---------- PREVIOUS ----------
document.querySelector(".prev").onclick = () => {
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  lightboxImg.src = visibleItems[currentIndex].src;
};






// FADE IN PAGE
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

// FADE OUT WHEN CLICKING LINKS
document.querySelectorAll("a").forEach(link => {
    let url = link.getAttribute("href");

    // Ignore empty or anchor links
    if (!url || url.startsWith("#") || url.startsWith("javascript")) return;

    link.addEventListener("click", e => {
        e.preventDefault();   // Stop instant jump
        document.body.classList.remove("loaded");

        setTimeout(() => {
            window.location.href = url;
        }, 300); // Same as fade-out time
    });
});

