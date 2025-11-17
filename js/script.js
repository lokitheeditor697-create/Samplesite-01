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




document.querySelectorAll(".showcase-item img").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// Showcase Carousel Logic
const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-btn.left');
const nextBtn = document.querySelector('.carousel-btn.right');
const visibleCards = 3;

function moveCarousel(direction) {
  const totalCards = cards.length;
  const maxIndex = totalCards - visibleCards;

  currentIndex += direction;
  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex > maxIndex) currentIndex = maxIndex;

  const slideWidth = cards[0].offsetWidth + 25;
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

nextBtn.addEventListener('click', () => moveCarousel(1));
prevBtn.addEventListener('click', () => moveCarousel(-1));



cards.forEach(card => {
  card.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = card.querySelector("img").src;
  });
});

closeModal.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });




// clients.js
// Toggles logos between grayscale and color when clicked
document.addEventListener("DOMContentLoaded", () => {
  const logos = document.querySelectorAll("#clients img");

  logos.forEach((logo) => {
    const colorSrc = logo.getAttribute("data-color");
    const bwSrc = logo.getAttribute("src");

    logo.addEventListener("click", () => {
      const currentSrc = logo.getAttribute("src");
      if (currentSrc === bwSrc) {
        // Switch to color
        logo.setAttribute("src", colorSrc);
        logo.style.filter = "none";
        logo.style.opacity = "1";
        logo.style.transform = "scale(1.08)";
      } else {
        // Switch back to grayscale
        logo.setAttribute("src", bwSrc);
        logo.style.filter = "grayscale(100%) brightness(90%)";
        logo.style.opacity = "0.7";
        logo.style.transform = "scale(1)";
      }
    });

    // Reset transform on mouse leave
    logo.addEventListener("mouseleave", () => {
      logo.style.transform = "scale(1)";
    });
  });
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

