// ===== CONFIGURE THESE TWO VALUES =====
const SUPABASE_URL = 'https://zptvwegpiackjssnellc.supabase.co;  // Replace with your Supabase URL
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwdHZ3ZWdwaWFja2pzc25lbGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyMjEzMDYsImV4cCI6MjA4Mzc5NzMwNn0.V8F2lmDKljgx-EkII2hmiUDg9kuyEgB3-L6lPJatTp0';      // Replace with your anon key
// =====================================

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

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
