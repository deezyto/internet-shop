import Items from '../content/items';
export default class Filters extends Items {
  constructor() {
    super();
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

  removeActiveClass() {
    document.querySelector('body').addEventListener('click', (e) => {
      if (e.target.getAttribute('data-type') !== 'filter') {
        const filters = document.querySelectorAll('.sort');
        filters.forEach(item => {
          item.classList.remove('active');
        })
      }
    });
  }

  tapFilter() {
    const sortItems = document.querySelector('.sort-items');
    sortItems.addEventListener('click', (e) => {
      if (e.target.getAttribute('data-type') === 'filter') {
        e.target.parentNode.classList.toggle('active');
      }

      const startFilters = () => {
        const currentFilters = [];
        document.querySelectorAll('.sort-items [data-type-current-filter]').forEach(item => {
          currentFilters.push(item.getAttribute('data-type-current-filter'));
        });
        this.getItems(this.createItem, currentFilters);
      }

      if (e.target.getAttribute('data-type-filter-tab-option')) {
        const filterOption = e.target.getAttribute('data-type-filter-tab-option');
        e.target.parentNode.setAttribute('data-type-current-filter', filterOption);
        startFilters();
      } else if (e.target.getAttribute('data-type-filter-option')) {
        const filterOption = e.target.getAttribute('data-type-filter-option');
        const currentFilter = e.target.textContent;
        e.target.parentNode.parentNode.parentNode.querySelector('.current-sort').setAttribute('data-type-current-filter', filterOption);
        e.target.parentNode.parentNode.parentNode.querySelector('.current-sort').textContent = currentFilter;
        startFilters();
        e.target.parentNode.parentNode.parentNode.classList.toggle('active');
      }

    });
    this.removeActiveClass();
  }
  
  render() {
    this.checkBoxFilter();
    this.tapFilter();
    console.log(document.querySelectorAll('.item'))
  }
}