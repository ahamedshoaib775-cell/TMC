// ===== CONFIGURE THESE TWO VALUES =====
const SUPABASE_URL = 'YOUR_PROJECT_URL_HERE';  // Replace with your Supabase URL
const SUPABASE_KEY = 'YOUR_ANON_KEY_HERE';      // Replace with your anon key
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
