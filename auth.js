// 初始化 Supabase 客户端
const SUPABASE_URL = 'https://wcdwjygfboktwdjywgkx.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_Evi9vhKB8ZhVPkr70bwCyQ_yrzC9xzi';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

async function handleSignUp(email, password) {
    const { data, error } = await supabase.auth.signUp({ email: email, password: password });
    if (error) {
        alert('注册失败: ' + error.message);
    } else {
        alert('注册成功！请去 Supabase 后台手动确认账号');
    }
}

async function handleSignIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email: email, password: password });
    if (error) {
        alert('登录失败: ' + error.message);
    } else {
        alert('登录成功！');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('signup-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        handleSignUp(email, password);
    });

    document.getElementById('signin-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;
        handleSignIn(email, password);
    });
});
