import Resources from "../../services/services";

export default class Items {
  constructor() {
    this.obj = {};
    console.log(new Resources('http://localhost:3020/items').getResource())
  }

  getItems(callback) {
    new Resources('http://localhost:3020/items').getResource()
    .then(res => {
      callback(res);
    });
  }

  createItem(obj) {
    const item = document.querySelector('.content .item');
    console.log(item.parentNode)
    for (let i = 1; i < obj.length; i++) {
      let cloneNode = item.cloneNode(true);
      const price = cloneNode.querySelector('.current-price').textContent.replace(/[^0-9]/g, '');
      const newPrice = cloneNode.querySelector('.current-price').textContent = `$${+price + (i + 50)}`
      cloneNode.setAttribute('data-item-id', i);
      cloneNode.setAttribute('data-item-price', newPrice);
      //json
      cloneNode.querySelector('.title').textContent = obj[i].item.title;
      cloneNode.querySelector('.desc').textContent = obj[i].item.big;
      cloneNode.querySelector('.current-price').textContent = obj[i].item.price.current;
      cloneNode.querySelector('img').setAttribute('src', obj[i].item.img);
      cloneNode.querySelector('.info .number').textContent = obj[i].item.rating;
      item.parentNode.append(cloneNode);
    }
  }

  render() {
    this.getItems(this.createItem);
  }
}