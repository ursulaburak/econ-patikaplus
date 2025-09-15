// Tarih ve saat bilgisini güncelleyen fonksiyon
function updateDateTime() {
    const now = new Date();
    
    
    // Saat formatlama seçenekleri
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // 24 saat formatı için
    };
    
    // Elementleri seçme
    const dateElement = document.getElementById('currentDate');
    const timeElement = document.getElementById('currentTime');
    const dayElement = document.getElementById('currentDay');
    
    // Elementler varsa güncelleme yap
    if (dateElement) {
        dateElement.textContent = now.toLocaleDateString('tr-TR', dateOptions);
    }
    
    if (timeElement) {
        timeElement.textContent = now.toLocaleTimeString('tr-TR', timeOptions);
    }
    
    if (dayElement) {
        dayElement.textContent = now.toLocaleDateString('tr-TR', { weekday: 'long' });
    }
}

// Sayfa yüklendiğinde ve her saniyede bir güncelle
document.addEventListener('DOMContentLoaded', function() {
    updateDateTime(); // Hemen çalıştır
    setInterval(updateDateTime, 1000); // Her saniye güncelle
});