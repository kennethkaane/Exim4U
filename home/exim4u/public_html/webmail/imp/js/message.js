function arrowHandler(A){if(A.altKey||A.shiftKey||A.ctrlKey){return}switch(A.keyCode||A.charCode){case Event.KEY_LEFT:if($("prev")){document.location.href=$("prev").href}break;case Event.KEY_RIGHT:if($("next")){document.location.href=$("next").href}break}}function message_submit(A){if(A=="spam_report"){if(!window.confirm(IMP.text.spam_report)){return}}else{if(A=="notspam_report"){if(!window.confirm(IMP.text.notspam_report)){return}}}$("actionID").setValue(A);$("messages").submit()}function flagMessage(B){var A=$("flag1"),C=$("flag2");if((B==1&&$F(A))||(B==2&&$F(C))){$("flag").setValue((B==1)?$F(A):$F(C));message_submit("flag_message")}}function transfer(D,B){var A=$("targetMbox");A.setValue((B==1)?$F("target1"):$F("target2"));if($F(A)=="*new*"){var C=window.prompt(IMP.text.newfolder,"");if(C!=null&&C!=""){$("newMbox").setValue(1);A.setValue(C);message_submit(D)}}else{if(!$F(A)){window.alert(IMP.text.target_mbox)}else{message_submit(D)}}}function updateFolders(A){var B=(A==1)?2:1;$("target"+B).selectedIndex=$("target"+A).selectedIndex}function messageActionsHover(){var A=new Element("IFRAME",{scrolling:"no",frameborder:0}).hide();A.setStyle({position:"absolute"});A.setAttribute("src","javascript:false;");$$("UL.msgactions LI").each(function(B){var C,E=B.down("UL"),D;if(!E){return}C=A.cloneNode(false);B.insert(C);C.clonePosition(E);D=B.getStyle("zIndex");if(D==""){B.setStyle({zIndex:2});C.setStyle({zIndex:1})}else{C.setStyle({zIndex:parseInt(D)-1})}B.observe("mouseout",function(){this.removeClassName("hover");B.down("iframe").hide()});B.observe("mouseover",function(){this.addClassName("hover");B.down("iframe").show()})})}document.observe("dom:loaded",function(){document.observe("keydown",arrowHandler);if(Prototype.Browser.IE){messageActionsHover()}});