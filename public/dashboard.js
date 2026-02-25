// Yusuf Pro Hub - Digital Services Logic

const services = [
    { id: 1, name: "تصميم مواقع", description: "تصميم واجهات عصرية ومتجاوبة مع جميع الأجهزة.", price: 10 },
    { id: 2, name: "برمجة أتمتة", description: "أتمتة المهام المتكررة وتوفير الوقت والجهد.", price: 15 },
    { id: 3, name: "تحسين SEO", description: "تصدر نتائج البحث وزيادة زوار موقعك.", price: 5 },
    { id: 4, name: "إدارة محتوى", description: "إدارة احترافية لحسابات التواصل والمواقع.", price: 8 },
    { id: 5, name: "خدمات استضافة", description: "استضافة سريعة وآمنة لمشروعك الرقمي.", price: 12 }
];

// دالة لعرض الخدمات في صفحة الخدمات
function renderServices() {
    const servicesList = document.getElementById('services-list');
    if (!servicesList) return;

    servicesList.innerHTML = services.map(service => `
        <div class="service-card">
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <span class="price">${service.price}$</span>
            <button class="btn btn-subscribe" onclick="subscribe(${service.id})">اشترك الآن</button>
        </div>
    `).join('');
}

// دالة الاشتراك
function subscribe(serviceId) {
    const service = services.find(s => s.id === serviceId);
    if (!service) return;

    let subscriptions = JSON.parse(localStorage.getItem('yusuf_subscriptions')) || [];
    
    // التحقق إذا كان مشتركاً بالفعل
    if (subscriptions.find(s => s.id === serviceId)) {
        alert(`أنت مشترك بالفعل في خدمة: ${service.name}`);
        return;
    }

    subscriptions.push({
        ...service,
        date: new Date().toLocaleDateString('ar-EG')
    });

    localStorage.setItem('yusuf_subscriptions', JSON.stringify(subscriptions));
    alert(`تم الاشتراك بنجاح في خدمة: ${service.name}\nيمكنك رؤية اشتراكاتك في لوحة التحكم.`);
}

// دالة عرض الاشتراكات في لوحة التحكم
function renderSubscriptions() {
    const subContainer = document.getElementById('my-subscriptions');
    if (!subContainer) return;

    const subscriptions = JSON.parse(localStorage.getItem('yusuf_subscriptions')) || [];

    if (subscriptions.length === 0) {
        subContainer.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <p>لا يوجد لديك اشتراكات حالياً.</p>
                <br>
                <a href="services/services.html" class="btn btn-primary">تصفح الخدمات للاشتراك</a>
            </div>
        `;
        return;
    }

    subContainer.innerHTML = subscriptions.map(sub => `
        <div class="service-card">
            <h3>${sub.name}</h3>
            <p>تاريخ الاشتراك: ${sub.date}</p>
            <span class="price">${sub.price}$</span>
            <button class="btn btn-outline" style="color: #dc3545; border-color: #dc3545;" onclick="unsubscribe(${sub.id})">إلغاء الاشتراك</button>
        </div>
    `).join('');
}

// دالة إلغاء الاشتراك
function unsubscribe(serviceId) {
    if (!confirm('هل أنت متأكد من إلغاء الاشتراك؟')) return;

    let subscriptions = JSON.parse(localStorage.getItem('yusuf_subscriptions')) || [];
    subscriptions = subscriptions.filter(s => s.id !== serviceId);
    localStorage.setItem('yusuf_subscriptions', JSON.stringify(subscriptions));
    
    renderSubscriptions();
}

// تشغيل الدوال عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    renderServices();
    renderSubscriptions();
});
