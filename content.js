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

scanDOM();
window.addEventListener('load', scanDOM, false);

function scanDOM() {
  var page = document.body.innerHTML;
  if (hasAngular()) {
    chrome.runtime.sendMessage({ found: 'angular' });
  } else if (hasReact()) {
    chrome.runtime.sendMessage({ found: 'react' });
  } else if (hasRails()) {
    chrome.runtime.sendMessage({ found: 'rails' });
  } else if (hasDjango()) {
    chrome.runtime.sendMessage({ found: 'django' });
  } else if (hasHandlebars()) {
    chrome.runtime.sendMessage({ found: 'handlebars' });
  }

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
  return Boolean(filteredReactComponents.length);
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