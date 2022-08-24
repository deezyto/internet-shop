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
  const categoryLink = document.querySelector('.category-link');

  
  function hideMenuLink() {
    menuButton.forEach((button, index) => {
      if (index === 0) {
        //button.classList.add('active');
      } else {
        button.classList.add('hide');
      }
     
      if (button.nextSibling) {
        if (button.nextSibling.className === 'category-link') {
          //button.nextSibling.classList.add('hide');
        }
      }
    });
  }

  function showMenuLink(index, e) {
    //якщо клікнули має добавитись клас активності (і видались клас hide) єлементу на який клікнули
    //і на його наступний єлемент
    //якщо в його наступного єлемента є клас category-link то і йому добавити
    try {
      if (!menuButton[index].classList.contains('hide')) {
        menuButton[index + 1].classList.add('active')
        console.log(menuButton[index].children, 'menu');
      } else {
        menuButton[index].classList.remove('atctive')
        menuButton[index].classList.remove('hide')
      }
    } catch {}

    /* if (e.nextSibling) {
      if (e.nextSibling.className === 'category-link') {
        e.nextSibling.classList.remove('hide');
      }
    } */
    console.log(menuButton[index].parentNode.querySelectorAll('ul'))
    const parent = menuButton[index].nextSibling.querySelectorAll('li');
    console.log(parent, 'next')
    const parentFilter = Array.from(parent).filter(node => {
      //console.log(node)
      return node.getAttribute('data-category') === menuButton[index].getAttribute('data-category');
    });

    console.log(parentFilter)
    parentFilter.forEach(li => {
      li.querySelector('.category-parent').classList.remove('hide');

      if (li.querySelector('.category-link').getAttribute('data-category') === menuButton[index].getAttribute('data-category')) {
        li.querySelector('.category-link').classList.remove('hide');
      }
      
      //if (li.nextSibling.className === 'category-link')
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

  hideMenuLink();
  triggersMenu();
  
});