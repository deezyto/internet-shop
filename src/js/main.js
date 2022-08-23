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
        button.classList.add('active');
      } else {
        button.classList.add('hide');
      }
     
      if (button.nextSibling) {
        if (button.nextSibling.className === 'category-link') {
          button.nextSibling.classList.add('hide');
        }
      }
    });
  }

  function showMenuLink(index, e) {
    try {
      menuButton[index + 1].classList.toggle('hide');
    } catch {}

    /* if (e.nextSibling) {
      if (e.nextSibling.className === 'category-link') {
        e.nextSibling.classList.remove('hide');
      }
    } */
    console.log(menuButton[index].parentNode.parentNode.children)
    if (menuButton[index].nextSibling) {
      if (menuButton[index].nextSibling.classList.contains('category-link')) {
        menuButton[index].nextSibling.classList.toggle('hide');
      }
    }
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