
export default class Filters {
  constructor() {

  }

  triggersFilter(selector) {
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
  
  render() {
    //triggersMenu();
    //hideMenuLink('.sidebar-filter-options', false);
    //triggersFilter('.sidebar-filter');
    //triggersFilter('.sidebar-filter-options');
  }
}