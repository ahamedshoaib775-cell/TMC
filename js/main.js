document.addEventListener("DOMContentLoaded", () => {

  // Mobile Nav
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  if (navToggle) {
    navToggle.onclick = () => navMenu.classList.toggle("open");
  }

  // Search modal
  const searchBtn = document.getElementById("searchBtn");
  const searchModal = document.getElementById("searchModal");
  const closeSearch = document.getElementById("closeSearch");

  if (searchBtn) searchBtn.onclick = () => searchModal.classList.add("open");
  if (closeSearch) closeSearch.onclick = () => searchModal.classList.remove("open");

  // Testimonial slider
  let index = 0;
  const track = document.querySelector(".testimonial-track");
  const cards = document.querySelectorAll(".testimonial-card");
  const dotsBox = document.getElementById("testimonialDots");

  if (track && cards.length) {
    cards.forEach((_,i)=>{
      dotsBox.innerHTML += `<span class="dot ${i===0?'active':''}"></span>`;
    });

    function move(dir){
      index = (index + dir + cards.length) % cards.length;
      track.style.transform = `translateX(-${index*100}%)`;
      document.querySelectorAll(".dot").forEach((d,i)=>{
        d.classList.toggle("active", i===index);
      });
    }

    document.querySelectorAll(".testimonial-btn").forEach(b=>{
      b.onclick = ()=> move(b.dataset.dir==="next"?1:-1);
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });
  }
});

document.getElementById("waBtn").addEventListener("click", () => {
  const phone = "916369601308";
  const message = "Hi, I'm interested in your product";
  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
});



function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("show");
}
document.getElementById("waBtn").addEventListener("click", () => {
  const phone = "91639601308";
  const message = "Hi, I want to book a session";
  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
});




