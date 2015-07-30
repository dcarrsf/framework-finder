chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.pageAction.show(tabs[0].id);
    chrome.pageAction.setIcon({
      tabId: tabs[0].id,
      path: 'imgs/'+message.found+'.png'
    }, function() { console.log('detecting ' + message.found) });
  });
});