import Resources from "../../services/services";
import Cart from '../cart/cart';
export default class Items {
  constructor() {
    this.obj = {};
  }

  postObj(item) {
    this.obj = item;
  }

  getItems(callback) {
    new Resources('http://localhost:3020/items').getResource()
    .then(res => {
      this.obj = res;
      this.postObj(res);
      callback(res);
    });
  }

  createItem(obj) {

    for (let i = 0; i < obj.length; i++) {
      const item = document.querySelector('.content .item');
      let cloneNode = item.cloneNode(true);
      const newPrice = cloneNode.querySelector('.current-price').textContent = `${obj[i].item.price.current}`
      cloneNode.setAttribute('data-item-id', i);
      cloneNode.setAttribute('data-item-price', newPrice);
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