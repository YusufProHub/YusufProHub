// قائمة الخدمات
let services = [
  { name: "تصميم مواقع", price: 50 },
  { name: "برمجة أتمتة", price: 100 },
  { name: "تحسين SEO", price: 30 }
];

// دالة لإظهار الخدمات في لوحة التحكم
function showServices() {
  const container = document.getElementById("services-container");
  if (!container) return; // التأكد من وجود الحاوية قبل العمل
  
  container.innerHTML = ""; // مسح المحتوى القديم
  services.forEach((service, index) => {
    const div = document.createElement("div");
    div.className = "service-card";
    div.innerHTML = `
      <h3>${service.name}</h3>
      <p>السعر: ${service.price} دولار</p>
      <button onclick="subscribe(${index})">اشترك</button>
    `;
    container.appendChild(div);
  });
}

// دالة الاشتراك
function subscribe(serviceIndex) {
  let service = services[serviceIndex];
  alert(`تم الاشتراك في خدمة ${service.name} مقابل ${service.price} دولار`);
  // لاحقاً يمكن ربطها بقاعدة بيانات Firebase لتخزين الاشتراكات
}

window.onload = showServices;
