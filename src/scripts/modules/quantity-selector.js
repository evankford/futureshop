


// Quantity Selector Script
var quantitySelect = document.querySelectorAll('.quantity-select');


quantitySelect.forEach(element => {

  var quantityDown = element.querySelector('.adjust-minus');
  var quantityUp = element.querySelector('.adjust-plus');
  var quantity = element.querySelector('input.quantity');

  var quantityVal = parseInt(quantity.value);


  quantityDown.addEventListener('click', function (e) {

    quantityVal = parseInt(quantity.value);
    if (quantityVal > 1) {
      quantityVal--;
      quantity.value = quantityVal;
      if (document.body.classList.contains('template-cart')) {
        e.preventDefault();
        element.closest('form').submit();
      }
    }
    else {
      let removeItem = element.parentNode.querySelector('.remove-item');
      if (removeItem) {
        let remove = element.parentNode.querySelector('.remove-item').getAttribute('href');
        window.location.href = remove;
      }
    }

  })


  quantityUp.addEventListener('click', function (e) {
    quantityVal = quantity.value;
    quantityVal++;
    quantity.value = quantityVal;
    if (document.body.classList.contains('template-cart')) {
      e.preventDefault();
      element.closest('form').submit();
    }
  });
});

export default class TestModule {
  constructor(el) {
    this.el = el
  }
} 