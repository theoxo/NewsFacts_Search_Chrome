document.addEventListener('DOMContentLoaded', function() {
  var goButton = document.getElementById('go');
  
  goButton.addEventListener('click', function() {

    var searchStrings = document.getElementById('input').value.split(/([_\W])/);

    // all wrapped in query as it's asynchronous and was acting up :(
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){

      // load current url
      var currentUrl = tabs[0].url;
      
      // if the url is https, remove "https://"; else remove "http://"
      if (currentUrl.indexOf("https") > -1) {
        currentUrl = currentUrl.substring(8);
      }
      
      else {
        currentUrl = currentUrl.substring(7);
      }

  

      if (currentUrl.indexOf('/') > -1){
        currentUrl = currentUrl.substr(0, currentUrl.indexOf('/'));
      }

      var badChars="!.,;: ";

      var newUrl = "https://www.google.com/#q=";

      var searchLength = searchStrings.length;
  
      for (var i = 0; i < searchLength; i++){
        if(badChars.indexOf(searchStrings[i]) == -1){
          newUrl = newUrl + searchStrings[i] + "+";
        }
      }

      newUrl = newUrl + "-site:" + currentUrl;
    
      openNewTab(newUrl);
    });


  }, false);

  

}, false);

function openNewTab(url) {
  var w = window.open(url, '_blank');
  w.focus();
}

function storeUrl(url) {
  currentUrl = url;
}

