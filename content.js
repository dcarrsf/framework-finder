var angular = /ng-app|ng-controller|ng-click|ng-scope|ng-if|ng-show|ng-hide|ng-submit|ng-model|ng-repeat|ng-class|ng-bind|ng-href|ui-view/;
var react = /data-reactid/;

window.addEventListener('load', function() {

  if (document.body.innerHTML.match(angular)) {
    chrome.runtime.sendMessage({ found: 'angular' });
  } else if (document.body.innerHTML.match(react)) {
    chrome.runtime.sendMessage({ found: 'react' });
  }

}, false);