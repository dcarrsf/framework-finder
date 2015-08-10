chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function(tabs) {

  var tab = tabs[0];
  chrome.tabs.sendMessage(tab.id, { query: "finds" }, function(res) {
    res.finds.forEach(function(name) {
      var li = document.createElement('li');
      var img = document.createElement('img');
      img.src = 'imgs/' + name + '.png';
      var p = document.createElement('p');
      p.innerText = name;
      li.appendChild(img);
      li.appendChild(p);
      document.body.appendChild(li);
    });
  });

});