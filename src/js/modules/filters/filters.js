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

  tapFilter() {
    document.querySelector('.sort-items').addEventListener('click', (e) => {
      if (e.target.getAttribute('data-type') === 'filter') {
        e.target.parentNode.classList.toggle('active');
      }
      if (e.target.getAttribute('data-type-filter-option')) {
        const filterOption = e.target.getAttribute('data-type-filter-option');
        const currentFilter = e.target.textContent;
        const sortTab = document.querySelectorAll('.sort-items .sort .current-sort');

        switch (filterOption) {
          case 'high':
            this.getItems(this.createItem, 'high', sortTab[1].getAttribute('data-type-current-filter'));
            break;
          case 'low':
            this.getItems(this.createItem, 'low', sortTab[1].getAttribute('data-type-current-filter'));
            break;
          case 'feature':
            this.getItems(this.createItem, 'feature', sortTab[1].getAttribute('data-type-current-filter'));
            break;
          case 'delivery-free':
            this.getItems(this.createItem, 'delivery-free', sortTab[0].getAttribute('data-type-current-filter'));
            break;
          case 'delivery-fast':
            this.getItems(this.createItem, 'delivery-fast', sortTab[0].getAttribute('data-type-current-filter'));
            break;
          case 'delivery-econom':
            this.getItems(this.createItem, 'delivery-econom', sortTab[0].getAttribute('data-type-current-filter'));
            break;
        }
        e.target.parentNode.parentNode.parentNode.querySelector('.current-sort').setAttribute('data-type-current-filter', filterOption);
        e.target.parentNode.parentNode.parentNode.querySelector('.current-sort').textContent = currentFilter;
        e.target.parentNode.parentNode.parentNode.classList.toggle('active');
      }

    });
  }
  
  render() {
    this.checkBoxFilter();
    this.tapFilter();
    console.log(document.querySelectorAll('.item'))
  }
}