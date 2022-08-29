
export default class Style {
  constructor() {
    
  }

  removeActive(selector) {
    document.querySelectorAll(selector).forEach(item => {
      item.classList.remove('active');
    })
  }

  setActive(selector, index, classActive) {
    document.querySelectorAll(selector)[index].classList.add(classActive);
  }

  checkLocalStorage(param) {
    if (localStorage.getItem(param) !== null) {
      return true;
    } else {
      return false;
    }
  }

  setLocalStorage(key, value) {
    localStorage.setItem(key, value);
    return localStorage.getItem(key);
  }

  triggerStyleView(selector, property) {
    const button = document.querySelectorAll(selector);
    document.querySelectorAll(selector).forEach((item, index) => {
      item.addEventListener('click', (e) => {
        this.removeActive(selector);
        //item.classList.add('active');
        
        if (!index) {
          if (selector === '.style-view button') {
            document.querySelector('.content .items').classList.add('width-column');
            this.setLocalStorage('item-width', 'width-column');
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
  
  render() {
    this.setActive('.style-view button', 1, 'current-button');
    this.triggerStyleView('.style-view button', '--button-style-width');

    this.setActive('.show button', 1, 'current-button');
    this.triggerStyleView('.show button', '--button-show-style-width');
    if (this.checkLocalStorage('item-width')) {
      document.querySelectorAll('.style-view button')[0].click();
    } else {
      document.querySelectorAll('.style-view button')[1].click();
    }
  }
}