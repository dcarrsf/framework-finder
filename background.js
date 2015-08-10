chrome.runtime.onMessage.addListener(function(req, sender, res) {

  chrome.pageAction.show(sender.tab.id);
  chrome.pageAction.setIcon({
    tabId: sender.tab.id,
    path: 'imgs/' + req.found + '.png'
  });

});
