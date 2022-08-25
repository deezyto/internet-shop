window.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelectorAll('form');
  ['input', 'click'].forEach(event => {
    form[0].addEventListener(event, (e) => {
      const reset = form[0].querySelector('input[type="reset"]');
      if (e.type === 'input') {
        reset.classList.add('active');
      } else if (e.type === 'click') {
        if (e.target === reset) {
          reset.classList.remove('active');
        }
      }
      if (e.target.value.length === 0) {
        reset.classList.remove('active');
      }
    });
  });

  const item = document.querySelector('.content .item');
  console.log(item.parentNode)
  for (let i = 0; i < 20; i++) {
    const cloneNode = item.cloneNode(true);
    item.parentNode.append(cloneNode);
  }

  const menuButton = document.querySelectorAll('.category-parent');
  const showMore = document.querySelectorAll('.show-more');
  const categoryLink = document.querySelector('.category-link');
  const filter = document.querySelectorAll('.sidebar-filter');

  
  function hideMenuLink(selector, first = true) {
    document.querySelectorAll(selector).forEach((button, index) => {
      if (index !== 0 && first) {
        button.classList.add('hide');
      } 
      if (!first) {
        button.classList.add('hide');
      }
    });
  }

  function showMenuLink(index, e) {

    const parent = menuButton[index].nextSibling.querySelectorAll('li');

    const parentFilter = Array.from(parent).filter(node => {
      return node.getAttribute('data-category') === menuButton[index].getAttribute('data-category');
    });

    console.log(parentFilter)
    parentFilter.forEach((li, item) => {
      if (!li.querySelector('.category-parent').classList.contains('hide')) {
        li.querySelectorAll('.category-parent').forEach(node => {
          node.classList.remove('active');
          node.classList.add('hide');
        })
        
        menuButton[index].classList.remove('active');
        hideMenuLink('.category-link', false);
      } else {
        if (item < 5) {
          try {
            if (menuButton[index].nextSibling.classList.contains('category-link')) {
              console.log(menuButton[index].nextSibling.classList.remove('hide'))
            }
          } catch {

          }
          
          li.querySelector('.category-parent').classList.remove('hide');
          menuButton[index].classList.add('active');
        }
      }
      
    });
    
  }

  function triggersMenu() {
    menuButton.forEach((button, index) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(e.target)
        showMenuLink(index, e.target);
      })
    });
  }

  function triggersFilter(selector) {
    document.querySelectorAll(selector).forEach((item, index) => {
      console.log(item, 'i')
      item.addEventListener('click', (e) => {
        if (e.target === item.querySelector('span')) {
          try {
            item.classList.toggle('hide');
            item.nextSibling.classList.toggle('hide');
            item.nextSibling.classList.toggle('active');
            
          } catch {
            item.previousElementSibling.classList.toggle('hide');
            item.classList.toggle('active');
          }
          item.parentNode.classList.toggle('active');
        } else {

          if (e.target.classList.contains('sidebar-filter-option')) {
            e.target.querySelector('input').click();
          }
        }
      })
    });
  }

  function removeActive(selector) {
    document.querySelectorAll(selector).forEach(item => {
      item.classList.remove('active');
    })
  }

  function setActive(selector, index, classActive) {
    document.querySelectorAll(selector)[index].classList.add(classActive);
  }

  function checkLocalStorage(param) {
    if (localStorage.getItem(param) !== null) {
      return true;
    } else {
      return false;
    }
  }

  function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
    return localStorage.getItem(key);
  }

  function triggerStyleView(selector, property) {
    const button = document.querySelectorAll(selector);
    document.querySelectorAll(selector).forEach((item, index) => {
      item.addEventListener('click', (e) => {
        removeActive(selector);
        //item.classList.add('active');
        
        if (!index) {
          if (selector === '.style-view button') {
            document.querySelector('.content .items').classList.add('width-column');
            setLocalStorage('item-width', 'width-column');
          }
          item.parentNode.classList.add('current-button');
        } else {
          if (selector === '.style-view button') {
            document.querySelector('.content .items').classList.remove('width-column');
            localStorage.removeItem('item-width');
          }
          item.parentNode.classList.remove('current-button');
        }
        let elem = 0;
        for (let i = 0; i < index; i++) {
          const style = Math.floor(window.getComputedStyle(button[i]).width.replace(/[^0-9.]/g, ''));
          console.log(style)
          elem += style;
        }
        const currentButton = window.getComputedStyle(button[index]).width;
        if (index) {
          document.documentElement.style.setProperty(property.replace(/width/, 'transform'), `${elem}px`);
          document.documentElement.style.setProperty(property, currentButton);
        } else {
          document.documentElement.style.setProperty(property, currentButton);
        }
        
      });
    });
  }


  hideMenuLink('.category-parent')
  hideMenuLink('.category-link', false);
  triggersMenu();
  hideMenuLink('.sidebar-filter-options', false);
  triggersFilter('.sidebar-filter');
  triggersFilter('.sidebar-filter-options');
  setActive('.style-view button', 1, 'current-button');
  triggerStyleView('.style-view button', '--button-style-width');

  setActive('.show button', 1, 'current-button');
  triggerStyleView('.show button', '--button-show-style-width');

  if (checkLocalStorage('item-width')) {
    document.querySelectorAll('.style-view button')[0].click();
  }
  
});