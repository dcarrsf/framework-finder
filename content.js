var angular = /ng-app|ng-controller|ng-click|ng-scope|ng-if|ng-show|ng-hide|ng-submit|ng-model|ng-repeat|ng-class|ng-bind|ng-href|ui-view/;
var react = /data-reactid/;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (document.body.innerHTML.match(angular)) {
      chrome.extension.sendMessage({ found: 'angular' });
    } else if (document.body.innerHTML.match(react)) {
      chrome.extension.sendMessage({ found: 'react' });
    }
  });