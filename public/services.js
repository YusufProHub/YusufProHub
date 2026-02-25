// services.js

const services = [
    { name: 'تصميم CV', points: 4 },
    { name: 'ترجمة صفحة', points: 1 },
    { name: 'أبحاث جامعية', points: 10 },
    { name: 'تصميم شعار', points: 15 },
    { name: 'تصميم بوست', points: 3 },
    { name: 'كتابة محتوى موقع', points: 8 },
    { name: 'تصميم PowerPoint', points: 5 },
    { name: 'تحرير فيديو قصير', points: 12 },
    { name: 'تلخيص كتب PDF', points: 7 },
    { name: 'CV فيديو', points: 8 },
    { name: 'استشارة مهنية', points: 15 },
    { name: 'تصميم UI/UX', points: 12 }
];

function displayServices() {
    const servicesList = document.getElementById('servicesList');
    servicesList.innerHTML = '';
    db.collection('users').doc(currentUser.uid).get().then(doc => {
        const used = doc.data().usedServices || [];
        services.forEach(s => {
            const box = document.createElement('div');
            box.className = 'service-box';
            let usedText = used.includes(s.name) ? '(تم الاستخدام)' : '';
            box.innerHTML = `<h3>${s.name} ${usedText}</h3>
                             <p>نقاط: ${s.points}</p>
                             <button onclick="useService('${s.name}', ${s.points})">استخدام</button>`;
            servicesList.appendChild(box);
        });
    });
}

function useService(serviceName, cost) {
    db.collection('users').doc(currentUser.uid).get().then(doc => {
        const data = doc.data();
        if ((data.usedServices || []).includes(serviceName)) {
            alert('لقد استخدمت هذه الخدمة من قبل.');
            return;
        }
        if (data.points < cost) {
            alert('رصيدك غير كافٍ لاستخدام هذه الخدمة.');
            return;
        }
        db.collection('users').doc(currentUser.uid).update({
            points: firebase.firestore.FieldValue.increment(-cost),
            usedServices: firebase.firestore.FieldValue.arrayUnion(serviceName)
        }).then(() => {
            alert('تم استخدام الخدمة بنجاح!');
            displayServices();
            loadUserData();
        });
    });
}

// تحميل الخدمات عند فتح الصفحة
if (window.location.pathname.includes('dashboard.html')) {
    displayServices();
}