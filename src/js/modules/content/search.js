
export default class Search {
  constructor() {
    this.form = document.querySelectorAll('form');
  }

  showInputReset() {
    ['input', 'click'].forEach(event => {
      this.form[0].addEventListener(event, (e) => {
        const reset = this.form[0].querySelector('input[type="reset"]');
        if (e.type === 'input') {
          reset.classList.add('active');
        } else if (e.type === 'click') {
          if (e.target === reset) {
            reset.classList.remove('active');
          }
        }
        if (e.target.value.length === 0) {
          reset.classList.remove('active');
        }
      });
    });
  }

  render() {
    this.showInputReset();
  }
  
}