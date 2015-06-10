/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
!function(){"use strict";function e(){r.classList.remove("open"),i.classList.remove("open"),t.classList.remove("open")}function n(){r.classList.toggle("open"),i.classList.toggle("open"),t.classList.toggle("open"),t.classList.add("opened")}var o=document.querySelector.bind(document),t=o(".navdrawer-container"),r=document.body,i=o(".app-bar"),a=o(".menu"),c=o("main");c.addEventListener("click",e),a.addEventListener("click",n),t.addEventListener("click",function(n){("A"===n.target.nodeName||"LI"===n.target.nodeName)&&e()}),"serviceWorker"in navigator&&("https:"===window.location.protocol||"localhost"===window.location.hostname||0===window.location.hostname.indexOf("127."))&&navigator.serviceWorker.register("/service-worker.js",{scope:"./"}).then(function(e){"function"==typeof e.update&&e.update(),e.onupdatefound=function(){if(navigator.serviceWorker.controller){var n=e.installing;n.onstatechange=function(){switch(n.state){case"installed":break;case"redundant":throw new Error("The installing service worker became redundant.")}}}}})["catch"](function(e){console.error("Error during service worker registration:",e)})}();