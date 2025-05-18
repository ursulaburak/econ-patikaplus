
// Ses nesnelerini oluştur
const sounds = {
    65: new Audio('./sounds/i.wav'),
    83: new Audio('./sounds/ii.wav'),
    68: new Audio('./sounds/iii.wav'),
    70: new Audio('./sounds/iv.wav'),
    71: new Audio('./sounds/v.wav'),
    72: new Audio('./sounds/vi.wav'),
    74: new Audio('./sounds/vii.wav'),
    75: new Audio('./sounds/viii.wav'),
    76: new Audio('./sounds/ix.wav')
};

// Tüm davul butonlarını seç
const drumButtons = document.querySelectorAll('.drum-btn');

// Her butona tıklama eventi ekle
drumButtons.forEach(button => {
    button.addEventListener('click', function() {
        const keyCode = this.getAttribute('data-key');
        playSound(keyCode);
    });
});

// Klavye event listener
document.addEventListener('keydown', function(e) {
    if (sounds[e.keyCode]) {
        playSound(e.keyCode);
        // Buton animasyonu için (isteğe bağlı)
        const button = document.querySelector(`[data-key="${e.keyCode}"]`);
        button.classList.add('active');
        setTimeout(() => button.classList.remove('active'), 100);
    }
});

// Ses çalma fonksiyonu
function playSound(keyCode) {
    // Eğer ses dosyası yoksa hata ver
    if (!sounds[keyCode]) {
        console.error('Ses dosyası bulunamadı:', keyCode);
        return;
    }
    
    // Ses dosyasını başa sar ve çal
    sounds[keyCode].currentTime = 0;
    sounds[keyCode].play()
        .catch(error => console.error('Ses çalınamadı:', error));
}
        