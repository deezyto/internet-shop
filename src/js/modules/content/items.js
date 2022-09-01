import Resources from "../../services/services";
import Cart from '../cart/cart';
export default class Items {
  constructor() {
    this.obj = {};
  }

  postObj(item) {
    this.obj = item;
  }

  getItems(callback, currentType = '') {
    new Resources('http://localhost:3020/items').getResource()
    .then(res => {
      this.obj = res;
      this.postObj(res);
      callback(res, currentType);
    });
  }

  createItem(obj, currentType = '') {

    const removeItems = () => {
      const items = document.querySelectorAll('.content .item');
  
      items.forEach((item, index) => {
        if (index !== 0) {
          item.remove();
        }
      });
    }

    const sortHigh = () => {
      obj.sort((a, b) => +a.item.price.current.replace(/[^0-9.]/g, '') < +b.item.price.current.replace(/[^0-9.]/g, '') ? 1 : -1);
    }

    const sortLow = () => {
      obj.sort((a, b) => +a.item.price.current.replace(/[^0-9.]/g, '') > +b.item.price.current.replace(/[^0-9.]/g, '') ? 1 : -1);
    }

    const sortFeature = () => {
      const filter = obj.filter(elem => elem.item.recommendet === true);
      obj = filter;
    }

    const sortNew = () => {
      obj.sort((a, b) => +a.item.dateCreate.replace(/[^0-9.]/g, '') < +b.item.dateCreate.replace(/[^0-9.]/g, '') ? 1 : -1);
    }

    const sortReview = () => {
      obj.sort((a, b) => a.item.rating < b.item.rating ? 1 : -1);
    }

    const sortDelivery = (type = 'all') => {
      if (type === 'all') {
        return obj;
      } else {
        const filter = obj.filter(elem => elem.item.delivery[type] === true);
        return filter;
      } 
    }

    const sortTypeSale = (type = 'all') => {
      if (type === 'all') {
        return obj;
      } else {
        const filter = obj.filter(elem => elem.item.price.type === type);
        return filter;
      } 
    }

    const checkCurrentTypeSort = () => {
      const deliverySort = () => {
        if (currentType[1] === 'delivery-free') {
          obj = sortDelivery('free');
        } else if (currentType[1] === 'delivery-fast') {
          obj = sortDelivery('fast');
        } else if (currentType[1] === 'delivery-econom') {
          obj = sortDelivery('econom');
        } else if (currentType[1] === 'delivery-all') {
          obj = obj;
        }
      }
      
      const typeSort = () => {
        if (currentType[0] === 'high') {
          sortHigh();
        } else if (currentType[0] === 'low') {
          sortLow();
        } else if (currentType[0] === 'feature') {
          sortFeature();
        } else if (currentType[0] === 'new') {
          sortNew();
        } else if (currentType[0] === 'review') {
          sortReview();
        } else {
          sortFeature();
        }
      }

      const typeSaleSort = () => {
        if (currentType[2] === 'auction') {
          obj = sortTypeSale('auction');
        } else if (currentType[2] === 'buy-now') {
          obj = sortTypeSale('buyNow');
        } else if (currentType[2] === 'show-all') {
          obj = sortTypeSale('all');
        }
      }

      deliverySort();
      typeSort();
      typeSaleSort();

      return obj;
    }


    removeItems();
    checkCurrentTypeSort();

    const item = document.querySelector('.content .item');
    const result = document.querySelector('.content .search-result');
    if (obj.length < 1) {
      result.textContent = 'No items found for Your filters. Try again with another filters';
      result.classList.add('search-no-found');
      item.style.display = 'none';
    } else {
      result.classList.remove('search-no-found');
      let resultText;
      if (obj.length === 1) {
        resultText = ' result'
      } else {
        resultText = ' results'
      }
      result.textContent = obj.length + resultText;
      item.style.display = '';
    }

    for (let i = 0; i < obj.length; i++) {
      console.log('for')
      const item = document.querySelector('.content .item');
      let cloneNode = item.cloneNode(true);
      const newPrice = cloneNode.querySelector('.current-price').textContent = `${obj[i].item.price.current}`
      cloneNode.setAttribute('data-item-id', obj[i].item.id);
      cloneNode.setAttribute('data-item-price', newPrice);
      cloneNode.setAttribute('data-item', obj[i].item.dateCreate);
      cloneNode.setAttribute('data-item-review', obj[i].item.rating);
      cloneNode.setAttribute('data-item-type-sale', obj[i].item.price.type);
      //json
      cloneNode.querySelector('.title').textContent = obj[i].item.title;
      cloneNode.querySelector('.desc').textContent = obj[i].item.big;
      cloneNode.querySelector('.current-price').textContent = obj[i].item.price.current;
      cloneNode.querySelector('img').setAttribute('src', obj[i].item.img);
      cloneNode.querySelector('.info .number').textContent = obj[i].item.rating;
      
      item.parentNode.append(cloneNode);
      if (i === 1 || obj.length === 1) {
        document.querySelectorAll('.content .item')[0].remove();
      }
    }
    
    new Cart({buttonOpenCart: '.user-open-cart', selectorModal: '.cart .overlay'}).render();
  }

  render() {
    new Resources('http://localhost:3020/items').getResource()
    .then(res => {
      this.obj = res;
      this.postObj(res);
    });

    this.getItems(this.createItem);
    console.log(this.obj, 'obj')
    document.querySelectorAll('.content .item').forEach(item => {
      item.addEventListener('click', () => {
        console.log('click', item);
      });
    });
  }
}