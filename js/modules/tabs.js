function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
   const tabs = document.querySelectorAll(tabsSelector),
      tabsContent = document.querySelectorAll(tabsContentSelector),
      tabsParent = document.querySelector(tabsParentSelector);

   function hideTabContent() {
      tabsContent.forEach(item => {
         item.classList.add('none');
         item.classList.remove('active');
      });
      tabs.forEach(item => {
         item.classList.remove(activeClass)
      })
   }

   function showTabContent(index) {
      tabsContent[index].classList.remove('none');
      tabsContent[index].classList.add('active');
      tabs[index].classList.add(activeClass)
   }

   tabsParent.addEventListener('click', (e) => {
      if (e.target && e.target.classList.contains(tabsSelector.slice(1))) {
         tabs.forEach((item, i) => {
            if (e.target == item) {
               hideTabContent();
               showTabContent(i);
            }
         });
      }
   })
}

export default tabs;