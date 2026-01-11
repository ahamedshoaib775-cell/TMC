const cartKey = "tmcCart";
const wishlistKey = "tmcWishlist";

function getCart() {
  return JSON.parse(localStorage.getItem(cartKey)) || [];
}

function saveCart(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
  updateCounts();
}

function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const cart = getCart();
  cart.push(product);
  saveCart(cart);
  alert("Added to cart");
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  location.reload();
}

function getWishlist() {
  return JSON.parse(localStorage.getItem(wishlistKey)) || [];
}

function toggleWishlist(id) {
  let wishlist = getWishlist();
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const exists = wishlist.find(p => p.id === id);
  if (exists) {
    wishlist = wishlist.filter(p => p.id !== id);
  } else {
    wishlist.push(product);
  }
  localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
  updateCounts();
}

function updateCounts() {
  const cartCount = document.getElementById("cartCount");
  const wishCount = document.getElementById("wishlistCount");
  if (cartCount) cartCount.innerText = getCart().length;
  if (wishCount) wishCount.innerText = getWishlist().length;
}

document.addEventListener("DOMContentLoaded", updateCounts);
// Initial display
displayProducts(window.products);
function toggleWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (wishlist.includes(productId)) {
        wishlist = wishlist.filter(id => id !== productId);
    } else {
        wishlist.push(productId);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    displayProducts(window.products); // to refresh icons if needed
}

function isWishlisted(productId) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    return wishlist.includes(productId);
}
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = window.products.find(p => p.id === productId);
    if (!cart.some(p => p.id === productId)) {
        cart.push({ ...product, quantity: 1 });
    } else {
        cart = cart.map(p => p.id === productId ? { ...p, quantity: p.quantity + 1 } : p);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
}
const cart = JSON.parse(localStorage.getItem('cart')) || [];
cart.forEach(item => {
    // Render each cart item with name, price, quantity, remove button
});