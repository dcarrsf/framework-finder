// var angular = /ng-app|ng-controller|ng-click|ng-scope|ng-if|ng-show|ng-hide|ng-submit|ng-model|ng-repeat|ng-class|ng-bind|ng-href|ui-view/;
// var react = /data-reactid/;

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
  if (hasAngular()) {
    chrome.runtime.sendMessage({ found: 'angular' });
  } else if (hasReact()) {
    chrome.runtime.sendMessage({ found: 'react' });
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
