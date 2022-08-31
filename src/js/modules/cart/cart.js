
export default class Cart {
	constructor ({buttonOpenCart, selectorModal}) {
		this.button = document.querySelector(buttonOpenCart);
  	this.modal = document.querySelector(selectorModal);
		this.items = document.querySelectorAll('.content .item');
	}

  formatPrice(str) {
    return str.replace(/[^0-9.]/g, '');
  }

	openCart() {
		this.button.addEventListener('click', () => {
			this.modal.classList.add('active');
		});
		this.modal.querySelector('.close').addEventListener('click', () => {
			this.modal.classList.remove('active');
		});
	}

	checkCartItem(elem) {
    try {
      let done = 0;
      console.log(elem, 'elem')
      this.modal.querySelectorAll('.item').forEach(item => {
        if (elem.getAttribute('data-item-id') === item.getAttribute('data-item-id')) {
        const count = +item.querySelector('input').value;
        const itemPrice = +item.getAttribute('data-item-price').replace(/[^0-9.]/g, '');
        item.querySelector('input').value = `${count + 1}`;
        item.querySelector('.current-price').textContent = `$${itemPrice * +item.querySelector('input').value}`;
        done++;
        return false;
        }
      });
      if (!done) {
        return true;
      }
	  } catch {

    }
  }
		

  itemToCart() {
    this.items.forEach((item, index) => {
      item.addEventListener('click', (e) => {
        let cloneItem = item.cloneNode(true);
        const div = document.createElement('div');
        const input = document.createElement('input');
        const buttonRemove = document.createElement('button');
        buttonRemove.classList.add('button-remove');
        buttonRemove.textContent = 'delete';
        input.setAttribute('type', 'number');
        input.setAttribute('name', 'points');
        input.setAttribute('step', '1');
        input.value = 1;
        div.classList.add('count');
        div.appendChild(input);
        div.appendChild(buttonRemove);

        cloneItem.appendChild(div);
        this.modal.querySelector('.space-cart').style.display = 'none';
        if (this.checkCartItem(cloneItem) || this.modal.querySelectorAll('.item').length === 0) {
          this.modal.querySelector('.items').appendChild(cloneItem);
          this.removeItemCart();
        }
        const countCart = this.modal.querySelectorAll('.item');
        this.button.previousElementSibling.textContent = `${countCart.length}`;
        const itemPrice = item.querySelector('.current-price').textContent.replace(/[^0-9.]/g, '');
        const check = document.querySelector('.check');
        const checkMoney = check.querySelector('.money').textContent.replace(/[^0-9.]/g, '');
        
        check.querySelector('.money').textContent = `$${+itemPrice + +checkMoney}`;
        check.classList.add('active');
        this.changeCurrentItemInCart();
        this.changeNumberItem();
      });
    });
  }

  changeCountCart() {
    const itemPrice = this.modal.querySelectorAll('.current-price');
    let countPrice = 0;
    itemPrice.forEach(price => {
      countPrice += +price.textContent.replace(/[^0-9.]/g, '');
    });
    this.modal.querySelector('.money').textContent = `$${countPrice}`;
  }

  removeItemCart() {
    this.modal.querySelectorAll('.button-remove').forEach((item, index) => {
      item.addEventListener('click', (e) => {
        e.target.parentNode.parentNode.remove();
        console.log(e.target)
        const length = this.modal.querySelectorAll('.item').length;
        this.changeCountCart();
        this.button.previousElementSibling.textContent = `${length}`;
        if (length === 0) {
          this.modal.querySelector('.space-cart').style.display = '';
          this.modal.querySelector('.check').classList.remove('active');
        }
        this.changeNumberItem();
      });
    })
  }

  changeNumberItem() {
    const items = this.modal.querySelectorAll('.item');
    items.forEach((item, index) => {
      const itemNumber = document.createElement('span');
      itemNumber.classList.add('item-number');
      itemNumber.textContent = index + 1;
      if (item.querySelector('.item-number') === null) {
        item.prepend(itemNumber);
      } else {
        item.querySelector('.item-number').remove();
        item.prepend(itemNumber);
      }
      
    });
  }

  changeCurrentItemInCart() {
    const items = this.modal.querySelectorAll('.item');

    items.forEach(item => {
      item.querySelector('input').addEventListener('input', (e) => {
        const countItem = item.querySelector('input');
        const itemPrice = item.getAttribute('data-item-price').replace(/[^0-9.]/g, '');
        if (countItem.value > 0) {
          item.querySelector('.current-price').textContent = `$${itemPrice * countItem.value}`;
        } else {
          countItem.value = 1;
        }
        this.changeCountCart();
      })
    })
  }

	render() {
		this.openCart();
    this.checkCartItem();
    this.changeCurrentItemInCart();
    this.itemToCart();
	}
}