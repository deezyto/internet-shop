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
  for (let i = 1; i < 20; i++) {
    let cloneNode = item.cloneNode(true);
    const price = cloneNode.querySelector('.current-price').textContent.replace(/[^0-9]/g, '');
    cloneNode.querySelector('.current-price').textContent = `$${+price + (i + 50)}`
    cloneNode.setAttribute('data-item-id', i);
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

  const cartButton = document.querySelector('.user-open-cart');
  const cartModal = document.querySelector('.cart .overlay');
  const items = document.querySelectorAll('.content .item');

  cartButton.addEventListener('click', () => {
    cartModal.classList.add('active');
  });
  cartModal.querySelector('.close').addEventListener('click', () => {
    cartModal.classList.remove('active');
  });

  function checkCartItem(elem) {
    let done = 0;
    cartModal.querySelectorAll('.item').forEach(item => {
      if (elem.getAttribute('data-item-id') === item.getAttribute('data-item-id')) {
        const count = +item.querySelector('input').value;
        item.querySelector('input').value = `${count + 1}`;
        done++;
        return false;
      }
    });
    if (!done) {
      return true;
    }

  }
  
  items.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      let cloneItem = item.cloneNode(true);
      const div = document.createElement('div');
      const input = document.createElement('input');
      const buttonRemove = document.createElement('button');
      buttonRemove.classList.add('button-remove');
      buttonRemove.textContent = 'delete';
      input.setAttribute('type', 'number');
      input.setAttribute('name', 'points');
      input.setAttribute('step', '1');
      input.value = 1;
      div.classList.add('count');
      div.appendChild(input);
      div.appendChild(buttonRemove);
      cloneItem.appendChild(div);
      cartModal.querySelector('.space-cart').style.display = 'none';
      if (checkCartItem(cloneItem) || cartModal.querySelectorAll('.item').length === 0) {
        cartModal.querySelector('.items').appendChild(cloneItem);
        removeItemCart();
      }
      const countCart = cartModal.querySelectorAll('.item');
      cartButton.previousElementSibling.textContent = `${countCart.length}`;
      const itemPrice = item.querySelector('.current-price').textContent.replace(/[^0-9]/g, '');
      const check = document.querySelector('.check');
      const checkMoney = check.querySelector('.money').textContent.replace(/[^0-9]/g, '');
      
      check.querySelector('.money').textContent = `$${+itemPrice + +checkMoney}`;
    });
    
  });


  function removeItemCart() {
    cartModal.querySelectorAll('.button-remove').forEach(button => {
      button.addEventListener('click', (e) => {
          e.target.parentNode.parentNode.remove();
          const length = cartModal.querySelectorAll('.item').length;
          const itemPrice = cartModal.querySelectorAll('.current-price');
          let countPrice = 0;
          itemPrice.forEach(price => {
            countPrice += +price.textContent.replace(/[^0-9]/g, '');
          });
          cartModal.querySelector('.money').textContent = `$${countPrice}`;
          cartButton.previousElementSibling.textContent = `${length}`;
          if (length === 0) {
            cartModal.querySelector('.space-cart').style.display = '';
          }
      });
    })
  }
});