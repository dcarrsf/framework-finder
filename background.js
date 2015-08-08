chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

    chrome.pageAction.show(sender.tab.id);
    chrome.pageAction.setIcon({
      tabId: sender.tab.id,
      path: 'imgs/'+message.found+'.png'
    }, function() { console.log('detecting ' + message.found) });

});

chrome.pageAction.onClicked.addListener(function(tab){

});