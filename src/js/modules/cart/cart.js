
export default class Cart {
	constructor ({selectorModal, selectorCartShow}) {
		this.button = document.querySelector(selectorModal);
  	this.modal = document.querySelector(selectorCartShow);
		this.items = document.querySelectorAll('.content .item');
	}

	openCart() {
		this.button.addEventListener('click', () => {
			this.modal.classList.add('active');
		});
		this.modal.querySelector('.close').addEventListener('click', () => {
			this.modal.classList.remove('active');
		});
	}

	render() {
		this.openCart();
	}
}