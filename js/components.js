function renderProductCard(p) {
  return `
  <div class="product-card">
    <img src="${p.image}" alt="${p.name}">
    <h4>${p.name}</h4>
    <p>₹${p.price}</p>
    <div class="product-actions">
      <button onclick="addToCart(${p.id})">Add to Cart</button>
      <button onclick="toggleWishlist(${p.id})">♡</button>
    </div>
  </div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const newTrack = document.getElementById("newArrivalsTrack");
  const bestGrid = document.getElementById("bestSellersGrid");

  if (newTrack) {
    PRODUCTS.filter(p => p.new).forEach(p => {
      newTrack.innerHTML += renderProductCard(p);
    });
  }

  if (bestGrid) {
    PRODUCTS.filter(p => p.best).forEach(p => {
      bestGrid.innerHTML += renderProductCard(p);
    });
  }
});
