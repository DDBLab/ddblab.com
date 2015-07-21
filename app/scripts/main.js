/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 */
(function () {
  'use strict';

  var querySelector = document.querySelector.bind(document);
  function hello() {
    console.log('hello world');
  }

  hello();

  $('#fullpage').fullpage({
    // anchors: ['firstPage', 'secondPage', '3rdPage'],
    // sectionsColor: ['#C63D0F', '#1BBC9B', '#7E8F7C'],
    // navigation: true,
    // navigationPosition: 'right',
    // navigationTooltips: ['First page', 'Second page', 'Third and last page'],
    responsiveWidth: 900,
    responsiveHeight: 700
  });

})();
