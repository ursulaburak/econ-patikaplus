document.addEventListener('DOMContentLoaded', function() {
  // Tüm filtre butonlarını seç
  const filterButtons = document.querySelectorAll('.filter-buttons .btn-items');
  
  // Tüm menü öğelerini seç
  const menuItems = document.querySelectorAll('.menu-items');
  
  // Her buton için click event listener ekle
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Tıklanan butonun data-filter özelliğini al
      const filterValue = this.getAttribute('data-filter');
      
      // Tüm menü öğelerini döngüye al
      menuItems.forEach(item => {
        // Eğer "All" seçildiyse veya öğe tıklanan kategoriye aitse göster
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.style.display = 'flex'; // veya 'block' CSS yapınıza göre
        } else {
          // Diğer durumlarda gizle
          item.style.display = 'none';
        }
      });
      
      // Aktif buton stilini güncelle (opsiyonel)
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Sayfa yüklendiğinde "All" butonunu aktif yap
  document.querySelector('[data-filter="all"]').click();
});