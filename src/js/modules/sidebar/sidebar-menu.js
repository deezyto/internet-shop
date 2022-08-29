
export default class SidebarMenu {
  constructor ({selector}) {
    this.selector = selector;
    this.parentCategory = document.querySelectorAll(selector);
    //const showMore = document.querySelectorAll('.show-more');
    //const categoryLink = document.querySelector('.category-link');
    //const filter = document.querySelectorAll('.sidebar-filter');
  }

  hideMenuLink(selector, first = true) {
    document.querySelectorAll(selector).forEach((button, index) => {
      if (index !== 0 && first) {
        button.classList.add('hide');
      } 
      if (!first) {
        button.classList.add('hide');
      }
    });
  }
  showMenuLink(index, e) {

    const parent = this.parentCategory[index].nextElementSibling.querySelectorAll('li');
    const parentFilter = Array.from(parent).filter(node => {
      return node.getAttribute('data-category') === this.parentCategory[index].getAttribute('data-category');
    });

    parentFilter.forEach((li, item) => {
      if (!li.querySelector('.category-parent').classList.contains('hide')) {
        li.querySelectorAll('.category-parent').forEach(node => {
          node.classList.remove('active');
          node.classList.add('hide');
        })
        
        this.parentCategory[index].classList.remove('active');
        this.hideMenuLink('.category-link', false);
      } else {
        if (item < 5) {
          try {
            if (this.parentCategory[index].nextElementSibling.classList.contains('category-link')) {
              console.log(this.parentCategory[index].nextElementSibling.classList.remove('hide'))
            }
          } catch {

          }
          
          li.querySelector('.category-parent').classList.remove('hide');
          this.parentCategory[index].classList.add('active');
        }
      }
      
    });
    
  }

  triggersMenu() {
    this.parentCategory.forEach((button, index) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        console.log(e.target)
        this.showMenuLink(index, e.target);
      })
    });
  }

  render() {
    this.hideMenuLink(this.selector);
    this.hideMenuLink('.category-link', false);
    this.triggersMenu();
  }
}