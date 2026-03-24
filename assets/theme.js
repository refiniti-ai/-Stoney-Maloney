// Legacy hooks + layout vars (motion lives in motion.js)
document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.header--stoney');
  if (header) {
    document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
  }
  window.addEventListener(
    'resize',
    function () {
      var h = document.querySelector('.header--stoney');
      if (h) document.documentElement.style.setProperty('--header-h', h.offsetHeight + 'px');
    },
    { passive: true }
  );

  document.querySelectorAll('.product-page__qty-input').forEach(function (input) {
    input.addEventListener('change', function () {
      var val = parseInt(this.value, 10);
      if (isNaN(val) || val < 1) this.value = 1;
      if (val > 999) this.value = 999;
    });
  });
});
