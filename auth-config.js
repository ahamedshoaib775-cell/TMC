// ===== SUPABASE CONFIGURATION =====
const SUPABASE_URL = 'https://zptvwegpiackjssnellc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwdHZ3ZWdwaWFja2pzc25lbGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyMjEzMDYsImV4cCI6MjA4Mzc5NzMwNn0.V8F2lmDKljgx-EkII2hmiUDg9kuyEgB3-L6lPJatTp0';

let supabase = null;

// Initialize Supabase client
function initializeSupabase() {
    if (typeof window.supabase !== 'undefined') {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        console.log('Supabase initialized');
        return supabase;
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSupabase);
} else {
    setTimeout(initializeSupabase, 100);
}

// Check auth
async function checkAuth() {
    if (!supabase) return null;
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) console.error('Auth error:', error);
    return user || null;
}

// Get current user
async function getCurrentUser() {
    const user = await checkAuth();
    if (!user) return null;
    
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
    
    return { ...user, ...profile };
}

// Logout
async function logout() {
    if (supabase) {
        await supabase.auth.signOut();
        localStorage.clear();
        window.location.href = 'index.html';
    }
}
