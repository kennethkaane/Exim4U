window.Horde=window.Horde||{};Horde.dhtmlHistory={WAIT_TIME:200,currentWaitTime:0,initialize:function(){if(Prototype.Browser.Webkit){return false}Horde.historyStorage.init();if(Prototype.Browser.WebKit){this.createSafari()}this.currentLocation=this.getCurrentLocation();if(Prototype.Browser.IE){this.iframe=new Element("IFRAME",{name:"DhtmlHistoryFrame",id:"DhtmlHistoryFrame"}).hide();this.iframe.setAttribute("src","javascript:false;");$(document.body).insert(this.iframe);this.writeIframe(this.currentLocation);this.WAIT_TIME=400;this.ignoreLocationChange=true}Event.observe(window,"unload",function(){this.firstLoad=false}.bind(this));this.isFirstLoad();new PeriodicalExecuter(this.checkLocation.bind(this),0.3);return true},addListener:function(A){this.listener=A;if(this.fireOnNewListener){if(this.currentLocation){this.fireHistoryEvent(this.currentLocation)}this.fireOnNewListener=false}},add:function(B,C){if(Prototype.Browser.WebKit){return false;B=this.removeHash(B);Horde.historyStorage.put(B,C);var A=this.currentLocation;this.currentLocation=B;this.ignoreLocationChange=true;this.setLocation(B);this.putSafariState(B)}else{setTimeout(this.addImpl.bind(this,B,C),this.currentWaitTime)}this.currentWaitTime+=this.WAIT_TIME},setLocation:function(A){location.hash=A},getCurrentLocation:function(){if(Prototype.Browser.WebKit){return false;return this.getSafariState()}else{return this.removeHash(unescape(location.hash))}},addImpl:function(A,B){if(this.currentWaitTime){this.currentWaitTime-=this.WAIT_TIME}if($("newLoc")){return }A=this.removeHash(A);Horde.historyStorage.put(A,B);this.ignoreLocationChange=this.ieAtomicLocationChange=true;this.currentLocation=A;this.setLocation(escape(A));if(Prototype.Browser.IE){this.writeIframe(A)}this.ieAtomicLocationChange=false},isFirstLoad:function(){if(Horde.historyStorage.hasKey("DhtmlHistory_pageLoaded")==false){if(Prototype.Browser.IE){this.fireOnNewListener=false}else{this.ignoreLocationChange=true}this.firstLoad=true;Horde.historyStorage.put("DhtmlHistory_pageLoaded",true)}else{if(Prototype.Browser.IE){this.firstLoad=false}else{this.ignoreLocationChange=false}this.fireOnNewListener=true}},fireHistoryEvent:function(A){if(this.listener){this.listener.call(null,A,Horde.historyStorage.get(A))}},checkLocation:function(){if(!Prototype.Browser.IE){if(this.ignoreLocationChange){this.ignoreLocationChange=false;return }}else{if(this.ieAtomicLocationChange){return }}var A=this.getCurrentLocation();if(A==this.currentLocation||Object.isUndefined(A)){return }this.ieAtomicLocationChange=true;if(Prototype.Browser.IE){if(this.iframe.contentWindow.l==A){return }this.writeIframe(A)}this.currentLocation=A;this.ieAtomicLocationChange=false;this.fireHistoryEvent(A)},removeHash:function(A){if(A===null||Object.isUndefined(A)){return null}else{if(A.startsWith("#")){if(A.length==1){return""}else{return A.substring(1)}}}return A},iframeLoaded:function(A){if(this.ignoreLocationChange){this.ignoreLocationChange=false;return }this.setLocation(escape(A));this.fireHistoryEvent(A)},writeIframe:function(A){var B=this.iframe.contentWindow.document;B.open();B.write('<html><script type="text/javascript">var l="'+A+'";function pageLoaded(){window.parent.Horde.dhtmlHistory.iframeLoaded(l);}<\/script><body onload="pageLoaded()"></body></html>');B.close()},createSafari:function(){this.WAIT_TIME=400;this.safariHistoryStartPoint=history.length;this.safariStack=new Element("INPUT",{id:"DhtmlSafariHistory",type:"text",value:"[]"}).hide();$(document.body).insert(this.safariStack)},getSafariStack:function(){return $F(this.safariStack).evalJSON()},getSafariState:function(){var A=this.getSafariStack();return A[history.length-this.safariHistoryStartPoint-1]},putSafariState:function(B){var A=this.getSafariStack();A[history.length-this.safariHistoryStartPoint]=B;this.safariStack.setValue(A.toJSON())}};Horde.historyStorage={put:function(A,B){this.loadHashTable();this.storageHash.set(A,B);this.saveHashTable()},get:function(A){this.loadHashTable();var B=this.storageHash.get(A);return Object.isUndefined(B)?null:B},remove:function(A){this.loadHashTable();this.storageHash.unset(A);this.saveHashTable()},reset:function(){this.storageField.value="";this.storageHash=$H()},hasKey:function(A){this.loadHashTable();return !(typeof this.storageHash.get(A)==undefined)},init:function(){var A=new Element("FORM").hide();$(document.body).insert(A);this.storageField=new Element("TEXTAREA",{id:"historyStorageField"});A.insert(this.storageField)},loadHashTable:function(){if(!this.storageHash){this.storageHash=(this.storageField.value)?this.storageField.value.evalJSON():$H()}},saveHashTable:function(){this.loadHashTable();this.storageField.value=this.storageHash.toJSON()}};