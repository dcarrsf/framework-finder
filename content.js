var angular = /ng-app|ng-controller|ng-click|ng-scope|ng-if|ng-show|ng-hide|ng-submit|ng-model|ng-repeat|ng-class|ng-bind|ng-href|ui-view/;
var react = /data-reactid/;

scanDOM();
window.addEventListener('load', scanDOM, false);

function scanDOM() {
  var page = document.body.innerHTML;
  if (page.match(angular)) {
    chrome.runtime.sendMessage({ found: 'angular' });
  } else if (page.match(react)) {
    chrome.runtime.sendMessage({ found: 'react' });
  }
}