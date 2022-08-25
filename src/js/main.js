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

  function setActive(selector, index) {
    document.querySelectorAll(selector)[index].classList.add('active');
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

  
  function triggerStyleView(selector) {
    document.querySelectorAll(selector).forEach((item, index) => {
      item.addEventListener('click', (e) => {
        removeActive(selector);
        //item.classList.add('active');
        
        if (!index) {
          document.querySelector('.content .items').classList.add('width-column');
          item.parentNode.classList.add('active');
          setLocalStorage('item-width', 'width-column');
        } else {
          document.querySelector('.content .items').classList.remove('width-column');
          item.parentNode.classList.remove('active');
          localStorage.removeItem('item-width');
        }
        //document.documentElement.style.setProperty('--item-width', 'var(--item-width-column)');
        

      });
    });
  }


  hideMenuLink('.category-parent')
  hideMenuLink('.category-link', false);
  triggersMenu();
  hideMenuLink('.sidebar-filter-options', false);
  triggersFilter('.sidebar-filter');
  triggersFilter('.sidebar-filter-options');
  setActive('.style-view button', 1);
  triggerStyleView('.style-view button');

  if (checkLocalStorage('item-width')) {
    document.querySelectorAll('.style-view button')[0].click();
  }
  
});