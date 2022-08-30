
export default class Filters {
  constructor() {

  }

  checkBoxFilter() {
    document.querySelector('.sidebar').addEventListener('click', (e) => {
      const filter = e.target.parentNode.parentNode.querySelectorAll('[data-type="filter"]');
      if (e.target === filter[0]) {
        e.target.parentNode.parentNode.classList.add('active');
        e.target.parentNode.classList.add('hide');
        filter[1].parentNode.classList.add('active');
      } else if (e.target === filter[1]) {
        filter[0].parentNode.parentNode.classList.remove('active');
        filter[0].parentNode.classList.remove('hide');
        filter[1].parentNode.classList.remove('active');
      }
    });
  }

  tapFilter() {
    document.querySelector('.sort-items').addEventListener('click', (e) => {
      if (e.target.getAttribute('data-type') === 'filter') {
        e.target.parentNode.classList.toggle('active');
      }
      if (e.target.getAttribute('data-type') === 'filter-option') {
        const currentFilter = e.target.textContent;
        const prevFilter = e.target.parentNode.parentNode.parentNode.querySelector('.current-sort').textContent;
        e.target.textContent = prevFilter;
        e.target.parentNode.parentNode.parentNode.querySelector('.current-sort').textContent = currentFilter;
        e.target.parentNode.parentNode.parentNode.classList.toggle('active');
        console.log(e.target.textContent)
      }
      //sort
      
    });
  }
  
  render() {
    this.checkBoxFilter();
    this.tapFilter();
    console.log(document.querySelectorAll('.item'))
  }
}