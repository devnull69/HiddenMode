var enabled = false;
var startTime = 0;

chrome.browserAction.onClicked.addListener(function(tab) {
   if(enabled) {
      var endTime = (new Date()).getTime();
      
      chrome.history.search({
         text : "",
         startTime : startTime,
         endTime : endTime,
         maxResults : 100
      }, function(items) {
         console.log(items[0].url);
      });
      
      // delete recent history
      chrome.history.deleteRange({
         startTime : startTime,
         endTime : endTime
      }, function() {
         console.log("Recent history deleted successfully");
      });
      
		chrome.browserAction.setIcon({path: "icon19disabled.png"});
      enabled = false;
      startTime = 0;
	} else  {
      startTime = (new Date()).getTime();
		chrome.browserAction.setIcon({path: "icon19enabled.png"});
      enabled = true;
	}
});
