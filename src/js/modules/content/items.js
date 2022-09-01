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
        const filter = obj.filter(elem => elem.item.priceType === type);
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
        sortDelivery('free');
        obj = sortDelivery('free');
      } else if (currentType === 'delivery-fast') {
        sortDelivery('fast');
        obj = sortDelivery('fast');
      } else if (currentType === 'delivery-econom') {
        sortDelivery('econom');
        obj = sortDelivery('econom');
      }
    }

    console.log(typeSort, 'type');
    removeItems();
    if (typeSort === 'low') {
      checkCurrentTypeSort(sortLow, currentType[1]);
    } else if (typeSort === 'high') {
      checkCurrentTypeSort(sortHigh, currentType[1]);
    } else if (typeSort === 'feature') {
      checkCurrentTypeSort(sortFeature, currentType[1]);
    } else if (typeSort === 'new') {
      checkCurrentTypeSort(sortNew, currentType[1]);
    } else if (typeSort === 'review') {
      checkCurrentTypeSort(sortReview, currentType[1]);
    } else if (typeSort === 'auction') {
      //checkCurrentTypeSort(sortNew);
      //checkCurrentTypeSort()
      checkCurrentTypeDelivery();
      checkCurrentTypeSort();
      sortTypeSale();
    } else if (typeSort === 'delivery-free') {
      checkCurrentTypeDelivery('free', currentType[0]);
    } else if (typeSort === 'delivery-fast') {
      checkCurrentTypeDelivery('fast', currentType[0]);
    } else if (typeSort === 'delivery-econom') {
      checkCurrentTypeDelivery('econom', currentType[0]);
    } else if (typeSort === 'delivery-all') {
      checkCurrentTypeDelivery('all', currentType[0]);
    }

    for (let i = 0; i < obj.length; i++) {
      const item = document.querySelector('.content .item');
      let cloneNode = item.cloneNode(true);
      const newPrice = cloneNode.querySelector('.current-price').textContent = `${obj[i].item.price.current}`
      cloneNode.setAttribute('data-item-id', obj[i].item.id);
      cloneNode.setAttribute('data-item-price', newPrice);
      cloneNode.setAttribute('data-item', obj[i].item.dateCreate);
      cloneNode.setAttribute('data-item-review', obj[i].item.rating);
      //json
      cloneNode.querySelector('.title').textContent = obj[i].item.title;
      cloneNode.querySelector('.desc').textContent = obj[i].item.big;
      cloneNode.querySelector('.current-price').textContent = obj[i].item.price.current;
      cloneNode.querySelector('img').setAttribute('src', obj[i].item.img);
      cloneNode.querySelector('.info .number').textContent = obj[i].item.rating;
      
      item.parentNode.append(cloneNode);
      if (i === 1) {
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