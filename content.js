var angularAttrs = [
  '[ng-app]',
  '[ng-controller]',
  '[ng-click]',
  '[ng-scope]',
  '[ng-if]',
  '[ng-show]',
  '[ng-hide]',
  '[ng-submit]',
  '[ng-model]',
  '[ng-repeat]',
  '[ng-class]',
  '[ng-bind]',
  '[ng-href]',
  '[ng-view]',
  '[ui-view]',
  '[ui-sref]'
]

var found = [];

//call function and add event listener in case DOM isn't loaded yet
scanDOM();
window.addEventListener('load', scanDOM, false);

function scanDOM() {
  hasAngular() && found.push('angular');
  hasReact() && found.push('react');
  hasRails() && found.push('rails');
  hasDjango() && found.push('django');
  hasHandlebars() && found.push('handlebars');
  pageAction(0);
}

//cycle through icons if multiple were foujnd
function pageAction(i) {
  if (!found.length) return;
  chrome.runtime.sendMessage({ found: found[i] });
  if (++i >= found.length) i = 0;
  setTimeout(pageAction, 2000, i);
}

function hasReact() {
  var unfilteredReactComponents = document.querySelectorAll('[data-reactid]');
  var filteredReactComponents = [];
  for (var i = 0; i < unfilteredReactComponents.length; i++) {

    // remove chrome extensions that cause edge cases
    if (unfilteredReactComponents[i].parentNode.id !== 'treev-ext-react-app') {
      filteredReactComponents.push(unfilteredReactComponents[i]);
    }
  }
  return !!filteredReactComponents.length;
}

function hasAngular() {
  return angularAttrs.reduce(function(bool, attr) {
    return bool || !!document.querySelector(attr);
  }, false);
}

function hasRails() {
  return !!document.querySelector('meta[name=csrf-token]') &&
         !!document.querySelector('meta[name=csrf-param]');
  // var styles = document.getElementsByTagName('link');
  // for (var i = 0; i < styles.length; i++) {
  //   var href = styles[i].getAttribute('href');
  //   if (href.match(/assets\/application-[\da-z]{30,}\.css/i)) return true;
  // }

  // var scripts = document.getElementsByTagName('script');
  // for (var i = 0; i < scripts.length; i++) {
  //   var src = scripts[i].getAttribute('src');
  //   if (src.match(/assets\/application-[\da-z]{30,}\.js/)) return true;
  // }
}

function hasDjango() {
  return !!document.querySelector('[name=csrfmiddlewaretoken]')
}

function hasHandlebars() {
  return !!document.querySelector('script[type$=handlebars-template');
}