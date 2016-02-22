
(function () {
  'use strict';

  var querySelector = document.querySelector.bind(document);

  $('#fullpage').fullpage({
    controlArrows: true,
    verticalCentered: true,
    resize : false,
    responsiveWidth: 900,
    responsiveHeight: 700,
    css3: true,
    scrollingSpeed: 600,
    easing: 'easeInOutCubic',
    scrollBar : true
  });

  setTimeout(function() {
    $('.fullpage-container').css( { 'opacity':'1' } );
  }, 500);

})();
