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
  '[ui-view]'
]

scanDOM();
window.addEventListener('load', scanDOM, false);

function scanDOM() {
  var page = document.body.innerHTML;
  if (angular()) {
    chrome.runtime.sendMessage({ found: 'angular' });
  } else if (!!document.querySelector('[data-reactid]')) {
    chrome.runtime.sendMessage({ found: 'react' });
  } else if (!!document.querySelector('script[type$=handlebars-template')) {
    chrome.runtime.sendMessage({ found: 'handlebars' });
  }
}

function angular() {
  return angularAttrs.reduce(function(bool, attr) {
    return bool || !!document.querySelector(attr);
  }, false);
}
