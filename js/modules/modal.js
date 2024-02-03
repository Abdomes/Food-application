export function openModal(modalSelector, modalTimerId) {
   const modal = document.querySelector(modalSelector);
   modal.classList.add('active');
   modal.classList.remove('none');
   document.body.style.overflow = 'hidden';
   if (modalTimerId)
      clearInterval(modalTimerId);
}

export function closeModal(modalSelector) {
   const modal = document.querySelector(modalSelector);
   modal.classList.remove('active');
   modal.classList.add('none');
   document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
   const btns = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector);

   btns.forEach(item => {
      item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
   });

   modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') == "") {
         closeModal(modalSelector);
      }
   });

   document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.classList.contains('active')) {
         closeModal(modalSelector);
      }
   });

   function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >=
         document.documentElement.scrollHeight - 1) {
         openModal(modalSelector, modalTimerId);
         window.removeEventListener('scroll', showModalByScroll);
      }
   }

   window.addEventListener('scroll', showModalByScroll);
}

export default modal;
