function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {
   const slides = document.querySelectorAll(slide),
      slider = document.querySelector(container),
      prev = document.querySelector(prevArrow),
      next = document.querySelector(nextArrow),
      total = document.querySelector(totalCounter),
      current = document.querySelector(currentCounter),
      sliderWrapper = document.querySelector(wrapper),
      slidesField = document.querySelector(field),
      width = window.getComputedStyle(sliderWrapper).width;

   slider.style.position = 'relative';
   const dots = document.createElement('ol'),
      dotsArr = [];
   dots.classList.add('carousel-indicators');
   slider.append(dots);

   for (let i = 1; i <= slides.length; ++i) {
      const dot = document.createElement('li');
      dot.classList.add('dot');
      dot.setAttribute('data-count', i);
      if (i == 1) {
         dot.style.opacity = 1;
      }
      dots.append(dot);
      dotsArr.push(dot);
   }

   let curSlide = 1;
   let offset = 0;

   total.textContent = slides.length < 10 ? `0${slides.length}` : slides.length;
   current.textContent = curSlide < 10 ? `0${curSlide}` : curSlide

   slidesField.style.width = 100 * slides.length + '%';
   slidesField.style.display = 'flex';
   slidesField.style.transition = '0.5s all'

   sliderWrapper.style.overflow = 'hidden';

   slides.forEach(item => item.style.width = width)

   next.addEventListener('click', () => {
      if (offset == +width.slice(0, width.length - 2) * (slides.length - 1))
         offset = 0;
      else
         offset += +width.slice(0, width.length - 2);

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (curSlide == slides.length)
         curSlide = 1;
      else
         ++curSlide;
      current.textContent = curSlide < 10 ? `0${curSlide}` : curSlide;

      dotsArr.forEach(item => item.style.opacity = '.5');
      dotsArr[curSlide - 1].style.opacity = 1;
   });

   prev.addEventListener('click', () => {
      if (offset == 0)
         offset = +width.slice(0, width.length - 2) * (slides.length - 1);
      else
         offset -= +width.slice(0, width.length - 2);

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (curSlide == 1)
         curSlide = slides.length;
      else
         --curSlide;
      current.textContent = curSlide < 10 ? `0${curSlide}` : curSlide;

      dotsArr.forEach(item => item.style.opacity = '.5');
      dotsArr[curSlide - 1].style.opacity = 1;
   });

   dots.addEventListener('click', (e) => {
      if (e.target && e.target.classList.contains('dot')) {
         dotsArr.forEach(item => item.style.opacity = .5);
         e.target.style.opacity = 1;

         const i = +e.target.getAttribute('data-count');

         curSlide = i;
         offset = (i - 1) * width.slice(0, width.length - 2);

         slidesField.style.transform = `translateX(-${offset}px)`;

         current.textContent = curSlide < 10 ? `0${curSlide}` : curSlide
      }
   });
}

export default slider;