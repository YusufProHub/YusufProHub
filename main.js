// main.js

let currentUser;
auth.onAuthStateChanged(user => {
    if (user) {
        currentUser = user;
        loadUserData();
    } else {
        if (!window.location.pathname.includes('index.html')) {
            window.location.href = 'index.html';
        }
    }
});

function loadUserData() {
    db.collection('users').doc(currentUser.uid).get()
    .then(doc => {
        if (doc.exists) {
            const data = doc.data();
            document.getElementById('userName').innerText = data.email;
            document.getElementById('userPoints').innerText = data.points;
            document.getElementById('refLink').innerText = window.location.origin + '/index.html?ref=' + data.referralCode;
        }
    });
}

// إضافة نقاط عند الإحالة
function addReferralPoints(referredUserId, referrerId) {
    // زيادة نقاط الصديق الذي أحال
    db.collection('users').doc(referrerId).update({
        points: firebase.firestore.FieldValue.increment(10)
    });
    // إضافة نقاط ترحيبية للصديق الجديد
    db.collection('users').doc(referredUserId).update({
        points: firebase.firestore.FieldValue.increment(5),
        referredBy: referrerId
    });
}

// إضافة نقاط يدويًا من الأدمن
function addWalletPoints() {
    const username = document.getElementById('addUser').value;
    const points = parseInt(document.getElementById('addPoints').value);
    db.collection('users').where('email', '==', username).get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {
            db.collection('users').doc(doc.id).update({
                points: firebase.firestore.FieldValue.increment(points)
            });
        });
    });
}