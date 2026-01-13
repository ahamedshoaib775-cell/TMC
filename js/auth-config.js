// Supabase Configuration & Auth Manager
const SUPABASE_URL = 'https://zptvwegpiackjssnellc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwdHZ3ZWdwaWFja2pzc25lbGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2NzIzODcsImV4cCI6MjA1MjI0ODM4N30.hfJvFSfOVvU6R4M-aeLz5WVmHd2h9PzY1tDBEF1xc10';

let supabase = null;

if (typeof window !== 'undefined' && window.supabase) {
  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

const AuthManager = {
  async getCurrentUser() {
    if (!supabase) return null;
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  async loginUser(email, password) {
    if (!supabase) throw new Error('Supabase not initialized');
    return await supabase.auth.signInWithPassword({ email, password });
  },

  async registerUser(email, password) {
    if (!supabase) throw new Error('Supabase not initialized');
    return await supabase.auth.signUp({ email, password });
  },

  async logoutUser() {
    if (!supabase) throw new Error('Supabase not initialized');
    localStorage.removeItem('authToken');
    return await supabase.auth.signOut();
  },

  async getUserProfile() {
    const user = await this.getCurrentUser();
    if (!user) return null;
    return {
      id: user.id,
      email: user.email,
      createdAt: user.created_at,
      lastSignIn: user.last_sign_in_at
    };
  },

  onAuthStateChange(callback) {
    if (!supabase) return;
    return supabase.auth.onAuthStateChange((event, session) => {
      callback({ event, user: session?.user || null });
    });
  }
};
