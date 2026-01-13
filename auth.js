// TMC Authentication Module - Perfect Working Code

const SUPABASE_URL = 'https://zptvwegpiackjssnellc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwdHZ3ZWdwaWFja2pzc25lbGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyMjEzMDYsImV4cCI6MjA4Mzc5NzMwNn0.V8F2lmDKljgx-EkII2hmiUDg9kuyEgB3-L6lPJatTp0';

let supabaseClient = null;
let currentUser = null;

// Initialize Supabase
async function initSupabase() {
  return new Promise((resolve) => {
    // Check if Supabase is available
    if (window.supabase) {
      supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
      checkAuthState();
      // Listen for auth changes
      supabaseClient.auth.onAuthStateChange((event, session) => {
        currentUser = session?.user || null;
        updateUIForAuthState();
      });
      resolve(true);
    } else {
      // Retry after delay
      setTimeout(() => initSupabase().then(resolve), 500);
    }
  });
}

// Check current auth state
async function checkAuthState() {
  if (supabaseClient) {
    const { data: { user } } = await supabaseClient.auth.getUser();
    currentUser = user;
    updateUIForAuthState();
  }
}

// Update UI based on auth state
function updateUIForAuthState() {
  const userBtn = document.getElementById('userBtn');
  const userDisplay = document.getElementById('userDisplay');
  const dropdownHeader = document.getElementById('dropdownHeader');
  const dropdownContent = document.getElementById('dropdownContent');

  if (currentUser) {
    // User is logged in
    if (userDisplay) {
      userDisplay.textContent = currentUser.email.charAt(0).toUpperCase();
    }
    if (dropdownHeader) {
      dropdownHeader.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 40px; height: 40px; background: #d4af37; color: #0a0a0a; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">
            ${currentUser.email.charAt(0).toUpperCase()}
          </div>
          <div>
            <p style="margin: 0; color: #d4af37; font-weight: 600; font-size: 14px;">${currentUser.email}</p>
            <p style="margin: 4px 0 0 0; color: #888; font-size: 12px;">Logged In</p>
          </div>
        </div>
      `;
    }
    if (dropdownContent) {
      dropdownContent.innerHTML = `
        <a href="account.html" style="display: block; padding: 12px 16px; color: #fff; text-decoration: none; font-size: 14px; border: none; background: none; cursor: pointer; transition: 0.3s; width: 100%;" onmouseover="this.style.background='#2a2a2a'; this.style.color='#d4af37';" onmouseout="this.style.background='none'; this.style.color='#fff';">My Account</a>
        <a href="wishlist.html" style="display: block; padding: 12px 16px; color: #fff; text-decoration: none; font-size: 14px; border: none; background: none; cursor: pointer; transition: 0.3s; width: 100%;" onmouseover="this.style.background='#2a2a2a'; this.style.color='#d4af37';" onmouseout="this.style.background='none'; this.style.color='#fff';">My Wishlist</a>
        <a href="orders.html" style="display: block; padding: 12px 16px; color: #fff; text-decoration: none; font-size: 14px; border: none; background: none; cursor: pointer; transition: 0.3s; width: 100%;" onmouseover="this.style.background='#2a2a2a'; this.style.color='#d4af37';" onmouseout="this.style.background='none'; this.style.color='#fff';">My Orders</a>
        <button onclick="handleLogout()" style="display: block; padding: 12px 16px; color: #ff6b6b; text-decoration: none; font-size: 14px; border: none; background: none; cursor: pointer; transition: 0.3s; width: 100%; text-align: left; border-top: 1px solid #333; margin-top: 8px;" onmouseover="this.style.background='#2a1a1a'; this.style.color='#ff8787';" onmouseout="this.style.background='none'; this.style.color='#ff6b6b';">Logout</button>
      `;
    }
  } else {
    // User is not logged in
    if (userDisplay) {
      userDisplay.textContent = '👤';
    }
    if (dropdownHeader) {
      dropdownHeader.innerHTML = '<p style="margin: 0; color: #d4af37; font-size: 14px; font-weight: 500;">Welcome to TMC</p>';
    }
    if (dropdownContent) {
      dropdownContent.innerHTML = `
        <a href="login.html" style="display: block; padding: 12px 16px; color: #fff; text-decoration: none; font-size: 14px; transition: 0.3s;" onmouseover="this.style.background='#2a2a2a'; this.style.color='#d4af37';" onmouseout="this.style.background='none'; this.style.color='#fff';">Login</a>
        <a href="register.html" style="display: block; padding: 12px 16px; color: #fff; text-decoration: none; font-size: 14px; transition: 0.3s;" onmouseover="this.style.background='#2a2a2a'; this.style.color='#d4af37';" onmouseout="this.style.background='none'; this.style.color='#fff';">Create Account</a>
      `;
    }
  }
}

// Toggle dropdown
function toggleUserDropdown(e) {
  e.preventDefault();
  e.stopPropagation();
  const dropdown = document.getElementById('userDropdown');
  if (dropdown) {
    dropdown.classList.toggle('active');
    // Close after 5 seconds if no interaction
    setTimeout(() => {
      dropdown.classList.remove('active');
    }, 5000);
  }
}

// Close dropdown
function closeUserDropdown() {
  const dropdown = document.getElementById('userDropdown');
  if (dropdown) {
    dropdown.classList.remove('active');
  }
}

// Logout handler
async function handleLogout() {
  if (supabaseClient) {
    await supabaseClient.auth.signOut();
    currentUser = null;
    updateUIForAuthState();
    window.location.href = 'index.html';
  }
}

// Register handler
async function handleRegister(email, password) {
  if (!supabaseClient) return { error: 'Auth not initialized' };
  
  const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: password,
  });
  
  if (error) {
    return { error: error.message };
  }
  
  return { data: data };
}

// Login handler
async function handleLogin(email, password) {
  if (!supabaseClient) return { error: 'Auth not initialized' };
  
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password,
  });
  
  if (error) {
    return { error: error.message };
  }
  
  currentUser = data.user;
  return { data: data };
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initSupabase();
    // Setup event listeners
    const userBtn = document.getElementById('userBtn');
    if (userBtn) {
      userBtn.addEventListener('click', toggleUserDropdown);
    }
    document.addEventListener('click', (e) => {
      const userProfile = document.getElementById('userProfile');
      if (userProfile && !userProfile.contains(e.target)) {
        closeUserDropdown();
      }
    });
  });
} else {
  initSupabase();
  const userBtn = document.getElementById('userBtn');
  if (userBtn) {
    userBtn.addEventListener('click', toggleUserDropdown);
  }
  document.addEventListener('click', (e) => {
    const userProfile = document.getElementById('userProfile');
    if (userProfile && !userProfile.contains(e.target)) {
      closeUserDropdown();
    }
  });
}
