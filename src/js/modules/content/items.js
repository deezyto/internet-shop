import Resources from "../../services/services";
import Cart from '../cart/cart';
export default class Items {
  constructor() {
    this.obj = {};
  }

  postObj(item) {
    this.obj = item;
  }

  getItems(callback, typeSort = 'low', currentType = '') {
    new Resources('http://localhost:3020/items').getResource()
    .then(res => {
      this.obj = res;
      this.postObj(res);
      callback(res, typeSort, currentType);
    });
  }

  createItem(obj, typeSort = 'low', currentType = '') {

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

    const checkCurrentTypeDelivery = (typeSort, currentType) => {
      sortDelivery(typeSort);
      if (currentType === 'high') {
        sortHigh();
      } else if (currentType === 'low') {
        sortLow();
      } else if (currentType === 'feature') {
        sortFeature();
      } else if (currentType === 'new') {
        sortNew();
      } else if (currentType === 'review') {
        sortReview();
      }
      obj = sortDelivery(typeSort);
    }

    const checkCurrentTypeSort = (callback, currentType) => {
      callback();
      if (currentType === 'delivery-free') {
        //sortDelivery('free');
        obj = sortDelivery('free');
      } else if (currentType === 'delivery-fast') {
        //sortDelivery('fast');
        obj = sortDelivery('fast');
      } else if (currentType === 'delivery-econom') {
        //sortDelivery('econom');
        obj = sortDelivery('econom');
      }
    }

    const checkCurrentTypeSortAndDelivery = () => {
      if (currentType[1] === 'delivery-free') {
        obj = sortDelivery('free');
      } else if (currentType[1] === 'delivery-fast') {
        obj = sortDelivery('fast');
      } else if (currentType[1] === 'delivery-econom') {
        obj = sortDelivery('econom');
      } else if (currentType[1] === 'delivery-all') {
        obj = obj;
      }

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
      }

      return obj;
      
    }

    console.log(typeSort, 'type');
    removeItems();
    if (typeSort === 'low') {
      console.log('low')
      checkCurrentTypeSort(sortLow, currentType[1]);
    } else if (typeSort === 'high') {
      console.log('high')
      checkCurrentTypeSort(sortHigh, currentType[1]);
    } else if (typeSort === 'feature') {
      console.log('feature')
      checkCurrentTypeSort(sortFeature, currentType[1]);
    } else if (typeSort === 'new') {
      console.log('new')
      checkCurrentTypeSort(sortNew, currentType[1]);
    } else if (typeSort === 'review') {
      console.log('review')
      checkCurrentTypeSort(sortReview, currentType[1]);
    } else if (typeSort === 'auction') {
      console.log('auction')
      obj = sortTypeSale('auction');
      obj = checkCurrentTypeSortAndDelivery();
    } else if (typeSort === 'show-all') {
      console.log('all')
      obj = sortTypeSale('all');
      obj = checkCurrentTypeSortAndDelivery();
    } else if (typeSort === 'buy-now') {
      console.log('buy-now')
      obj = sortTypeSale('buyNow');
      obj = checkCurrentTypeSortAndDelivery();
    } else if (typeSort === 'delivery-free') {
      console.log('delivery-free')
      checkCurrentTypeDelivery('free', currentType[0]);
    } else if (typeSort === 'delivery-fast') {
      console.log('delivery-fast')
      checkCurrentTypeDelivery('fast', currentType[0]);
    } else if (typeSort === 'delivery-econom') {
      console.log('delivery-econom')
      checkCurrentTypeDelivery('econom', currentType[0]);
    } else if (typeSort === 'delivery-all') {
      console.log('delivery-all')
      checkCurrentTypeDelivery('all', currentType[0]);
    }

    

    console.log(obj, 'items')
    const item = document.querySelector('.content .item');
    const result = document.querySelector('.content .search-result');
    if (obj.length < 1) {
      //const result = document.querySelector('.content .search-result');
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