// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(href.startsWith('#')){
      const el = document.querySelector(href);
      if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth',block:'start'}); }
    }
  })
});

// Gallery Modal
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
let currentIndex = 0;

galleryItems.forEach((item, idx)=>{
  item.addEventListener('click', e=>{
    e.preventDefault();
    currentIndex = idx;
    openModal(item.dataset.image);
  });
});

function openModal(src){
  modalImage.src = src;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(){
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function nextImage(){
  currentIndex = (currentIndex + 1) % galleryItems.length;
  openModal(galleryItems[currentIndex].dataset.image);
}

function prevImage(){
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  openModal(galleryItems[currentIndex].dataset.image);
}

// Close modal on background click
modal.addEventListener('click', e=>{
  if(e.target === modal) closeModal();
});

// Keyboard navigation
document.addEventListener('keydown', e=>{
  if(!modal.classList.contains('active')) return;
  if(e.key === 'ArrowRight') nextImage();
  if(e.key === 'ArrowLeft') prevImage();
  if(e.key === 'Escape') closeModal();
});

// Booking form -> open WhatsApp with prefilled message
const form = document.getElementById('booking');
if(form){
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name')||'';
    const phone = data.get('phone')||'';
    const pet = data.get('pet')||'';
    const when = data.get('when')||'';
    const notes = data.get('notes')||'';
    const msg = `Запис на грумінг%0AІм'я: ${encodeURIComponent(name)}%0AТелефон: ${encodeURIComponent(phone)}%0AПитомeць: ${encodeURIComponent(pet)}%0AДата/час: ${encodeURIComponent(when)}%0AКоментар: ${encodeURIComponent(notes)}`;
    const wa = `https://wa.me/380994342098?text=${encodeURIComponent(`Запис на грумінг\nІм'я: ${name}\nТелефон: ${phone}\nПитомeць: ${pet}\nДата/час: ${when}\nКоментар: ${notes}`)}`;
    window.open(wa, '_blank');
  });
}

// Small accessibility: focus outlines on keyboard nav
document.body.addEventListener('keydown', e=>{
  if(e.key==='Tab') document.documentElement.classList.add('show-focus');
});
