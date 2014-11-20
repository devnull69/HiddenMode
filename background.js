var enabled = false;
var startTime = 0;
var endTime = 0;

function checkEnabled() {
   console.log("checkEnabled");
   if(enabled) {
      console.log("true");
      endTime = (new Date()).getTime();
      
      chrome.history.search({
         text : "",
         startTime : startTime,
         endTime : endTime,
         maxResults : 100
      }, function(items) {
         var count = items.length;
         var results = [];
         var loops = 0;
         for(i=0; i<count; i++) {
            chrome.history.search({text : items[i].url}, (function(_currentIndex) {
               return function(foundVisits) {
                  loops++;
                  if(foundVisits.length > 1) {
                     console.log("URL " + items[_currentIndex].url + " has " + foundVisits.length + " visits. Will not be deleted from history.");
                  }
                  items[_currentIndex].visits = foundVisits.length;
                  if(loops == count)
                     chrome.runtime.sendMessage({messageType: "visits", items: items});
                     console.log("Message sent to popup");
               };
            })(i));
         }
      });
      
	} else  {
      console.log("false");
      startTime = (new Date()).getTime();
	}
   return enabled;
}

function setEnabled() {
   console.log("setEnabled");
   enabled = true;
   chrome.browserAction.setIcon({path: "icon19enabled.png"});
}

function setDisabled() {
   console.log("setDisabled");
   enabled = false;
   startTime = 0;
   endTime = 0;
	chrome.browserAction.setIcon({path: "icon19disabled.png"});
}

function deleteHistory() {
   console.log("deleteHistory");
   // delete recent history
   chrome.history.deleteRange({
      startTime : startTime,
      endTime : endTime
   }, function() {
      console.log("Recent history deleted successfully");
   });
}