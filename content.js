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
];

var found = [];
function addUniq(arr, val) {
  if (arr.indexOf(val) === -1) arr.push(val);
}

//call function and add event listener to call function again in case DOM isn't loaded yet
scanDOM();
window.addEventListener('load', scanDOM, false);

function scanDOM() {
  hasAngular() && addUniq(found, 'angular');
  hasReact() && addUniq(found, 'react');
  hasRails() && addUniq(found, 'rails');
  hasDjango() && addUniq(found, 'django');
  hasHandlebars() && addUniq(found, 'handlebars');
  pageAction(0);
};

//cycle through icons if multiple were found
function pageAction(i) {
  if (!found.length) return;
  if (found.length === 1) return chrome.runtime.sendMessage({ found: found[0] });
  chrome.runtime.sendMessage({ found: found[i % found.length] });
  setTimeout(pageAction, 2000, ++i);
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
}

function hasDjango() {
  return !!document.querySelector('[name=csrfmiddlewaretoken]')
}

function hasHandlebars() {
  return !!document.querySelector('script[type$=handlebars-template');
}

chrome.runtime.onMessage.addListener(function(req, sender, res) {
  if (req.query === 'finds') res({ finds: found });
});