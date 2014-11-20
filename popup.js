var enabled;
var bg = chrome.extension.getBackgroundPage();

window.addEventListener('load', function() {
   console.log("popup loaded");
   enabled = bg.checkEnabled();
   if(!enabled) {
      console.log("First call");
      document.getElementById("content").innerHTML = "Hidden mode started. URLs will be recorded from timestamp: " + bg.startTime;
   }
   document.getElementById("Ok").addEventListener('click', function() {
      console.log("Ok clicked");
      if(enabled) {
         console.log("Was enabled");
         bg.deleteHistory();
         bg.setDisabled();
      } else {
         console.log("Was disabled");
         bg.setEnabled();
      }
      window.close();
   }, false);
}, false);

chrome.runtime.onMessage.addListener(function(message, sender, responseCallback) {
   console.log("Message empfangen");
   if(message.messageType == "visits") {
      var items = message.items;
      var count = items.length;
      console.log(count + " items have been found.");
      var tableContent = "<tbody>\n";
      
      var theTable = document.getElementById("visits");
      var theHeader = document.getElementById("header");
      
      if(count != 0) {
         theHeader.innerHTML = "The following visits will be deleted. (URLs with only recorded visits will be wiped from history, but only the recorded visits for URLs with more than one visit will be deleted.)";
      }
      
      theHeader.style.display = "";
      for(i=0; i<count; i++) {
         tableContent += "<tr>";
         tableContent += "<td>" + items[i].url + "</td>";
         tableContent += "<td>" + items[i].visits + "</td>";
         tableContent += "</tr>\n";
      }
      tableContent += "</tbody>\n";
      theTable.innerHTML = tableContent;
      theTable.style.display = "";
   }
});