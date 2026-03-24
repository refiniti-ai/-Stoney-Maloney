// Stoney Maloney theme JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Quantity input validation
  const qtyInputs = document.querySelectorAll('.product-page__qty-input');
  qtyInputs.forEach(function(input) {
    input.addEventListener('change', function() {
      let val = parseInt(this.value, 10);
      if (isNaN(val) || val < 1) this.value = 1;
      if (val > 999) this.value = 999;
    });
  });
});
