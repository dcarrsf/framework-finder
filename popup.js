chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
    var h3 = document.createElement('h3');
    h3.innerHTML = request.found;
    document.body.appendChild(h3);
  }
);

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
    console.log(response);
  });
});