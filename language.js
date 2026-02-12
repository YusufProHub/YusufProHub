// language.js

let currentLang = 'ar';

function setLanguage(lang) {
    currentLang = lang;
    if (lang === 'ar') {
        document.documentElement.lang = 'ar';
        document.getElementById('siteTitle').innerText = 'Yusuf Pro Hub';
        document.getElementById('loginTitle').innerText = 'تسجيل / دخول';
        document.getElementById('email').placeholder = 'البريد الإلكتروني';
        document.getElementById('phone').placeholder = 'رقم الهاتف';
        document.getElementById('password').placeholder = 'كلمة المرور';
    } else {
        document.documentElement.lang = 'en';
        document.getElementById('siteTitle').innerText = 'Yusuf Pro Hub';
        document.getElementById('loginTitle').innerText = 'Login / Register';
        document.getElementById('email').placeholder = 'Email';
        document.getElementById('phone').placeholder = 'Phone';
        document.getElementById('password').placeholder = 'Password';
    }
}