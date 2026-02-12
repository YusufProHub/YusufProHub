// auth.js

// تسجيل مستخدم جديد
function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;

    if (!email || !password) { alert('يرجى إدخال البريد وكلمة المرور'); return; }

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            db.collection('users').doc(user.uid).set({
                email: email,
                phone: phone,
                points: 20,           // نقاط ترحيبية
                usedServices: [],
                referralCode: user.uid,
                referredBy: null
            });
            alert('تم التسجيل بنجاح!');
            window.location.href = 'dashboard.html';
        })
        .catch((error) => { alert(error.message); });
}

// تسجيل دخول مستخدم
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            window.location.href = 'dashboard.html';
        })
        .catch((error) => { alert(error.message); });
}

// تسجيل خروج
function logout() {
    auth.signOut().then(() => {
        window.location.href = 'index.html';
    });
}

// التحقق من تسجيل الدخول تلقائياً
auth.onAuthStateChanged(user => {
    if (user && window.location.pathname.includes('index.html')) {
        window.location.href = 'dashboard.html';
    }
});