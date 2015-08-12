/*!
 *
 *
 */
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
    scrollBar: false,
    easing: 'easeInOutCubic',
    scrollBar : true,
    recordHistory: true
    // ,navigation: true
  });

})();
