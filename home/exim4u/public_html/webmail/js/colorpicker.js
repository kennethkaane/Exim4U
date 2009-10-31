var ColorPicker=Class.create();ColorPicker.prototype={initialize:function(A){this.options=Object.extend({color:"ffffff",update:[],draggable:false,resizable:false,offsetParent:null,offset:10},A||{});this.stop=1;this.zIndex=1000;this.hsv=Color.hex2hsv(this.options.color);var D=$("color-picker");if(!D){D=document.createElement("DIV");D.id="color-picker";D.style.display="none";D.innerHTML='<div class="north"><span id="color-picker-hex"></span><div id="color-picker-close">X</div></div><div class="south" id="color-picker-sphere" style="height:128px; width:128px;"><div id="color-picker-cursor"></div><img id="color-picker-palette" src="" onmousedown="return false;" ondrag="return false;" onselectstart="return false;" /><img id="color-picker-resize" src="" ondrag="return false;" onselectstart="return false;" /></div>';document.body.appendChild(D)}D.style.position="absolute";var C;if(this.options.offsetParent){C=Position.cumulativeOffset(this.options.offsetParent)}else{C=[0,0]}D.style.left=C[0]+this.options.offset+"px";D.style.top=C[1]+this.options.offset+"px";D.style.display="";if(!this.iefix&&Prototype.Browser.IE){new Insertion.After("color-picker",'<iframe id="color-picker-iefix" style="display:none;position:absolute;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);" src="javascript:false;" frameborder="0" scrolling="no"></iframe>');this.iefix=$("color-picker-iefix")}if(this.iefix){setTimeout(this.fixIEOverlapping.bind(this),50)}if(this.options.draggable){$("color-picker").style.cursor="move"}$("color-picker-hex").innerHTML=this.options.color;$("color-picker-cursor").style.visibility="hidden";var B=$("color-picker-cursor").getStyle("backgroundImage").replace(/url\("?(.*?)"?\)/,"$1").replace("color-picker-cursor.gif","");$("color-picker-palette").src=B.replace($("color-picker-palette").src,"")+"color-picker-palette.png";if(this.options.resizable){$("color-picker-resize").src=B.replace($("color-picker-palette").src,"")+"color-picker-resize.gif"}else{$("color-picker-resize").hide()}this.addEvents();$("color-picker").show()},fixIEOverlapping:function(){Position.clone("color-picker",this.iefix,{setTop:(!$("color-picker").style.height)});this.iefix.style.zIndex=$("color-picker").getStyle("zIndex")-1;this.iefix.show()},hide:function(){this.removeEvents();$("color-picker").hide();if(this.iefix){this.iefix.hide()}},addEvents:function(){if(this.listeners){return}this.listeners=[["color-picker-close","click",this.hide.bindAsEventListener(this)],["color-picker-sphere","mousedown",this.coreXY.bindAsEventListener(this,"color-picker-cursor")]];if(this.options.draggable){this.listeners.push(["color-picker","mousedown",this.coreXY.bindAsEventListener(this,"color-picker")])}if(this.options.resizable){this.listeners.push(["color-picker-resize","mousedown",this.coreXY.bindAsEventListener(this,"color-picker-resize")])}for(var C=0,B=this.listeners.length;C<B;++C){var A=this.listeners[C];Event.observe(A[0],A[1],A[2])}},removeEvents:function(){if(this.listeners){for(var C=0,B=this.listeners.length;C<B;++C){var A=this.listeners[C];Event.stopObserving(A[0],A[1],A[2])}}this.listeners=null},coords:function(B){var C=B/2,A=(this.hsv[0]/360)*(Math.PI*2),D=(this.hsv[1]+(100-this.hsv[2]))/100*(C/2);$("color-picker-cursor").setStyle({left:Math.round(Math.abs(Math.round(Math.sin(A)*D)+C+3))+"px",top:Math.round(Math.abs(Math.round(Math.cos(A)*D)-C-21))+"px"})},point:function(E,B,A,D,C){this.commit(E,[Event.pointerX(D)+B,Event.pointerY(D)+A],C)},commit:function(A,O,C){if(A=="color-picker-cursor"){var B=parseInt($("color-picker-sphere").getStyle("width")),H=B/2,G=H/2,M=O[0]-H-3,L=B-O[1]-H+21,D=Math.sqrt(Math.pow(M,2)+Math.pow(L,2)),F=Math.atan2(M,L)/(Math.PI*2);this.hsv=[F>0?(F*360):((F*360)+360),D<G?(D/G)*100:100,D>=G?Math.max(0,1-((D-G)/(H-G)))*100:100];var I=Color.hsv2hex(this.hsv);var K=Color.brightness(Color.hsv2rgb(this.hsv));$("color-picker-hex").innerHTML=I;for(var E=0,N=this.options.update.length;E<N;++E){var P=this.options.update[E];switch(P[1]){case"background":$(P[0]).setStyle({backgroundColor:"#"+I},true);$(P[0]).setStyle({color:K<125?"#fff":"#000"},true);break;case"value":$(P[0]).value="#"+I;break}}this.coords(B)}else{if(A=="color-picker-resize"){var J=Math.max(Math.max(O[0],O[1])+C,75);this.coords(J);$("color-picker").setStyle({height:(J+28)+"px",width:(J+20)+"px"});$("color-picker-sphere").setStyle({height:J+"px",width:J+"px"})}else{$(A).setStyle({left:O[0]+"px",top:O[1]+"px"})}}},coreXY:function(E,F){if(!this.stop){return}$("color-picker-cursor").style.visibility="visible";this.stop="";$(F).setStyle({zIndex:this.zIndex++},true);if(F=="color-picker-cursor"){var D=Position.cumulativeOffset($(F).parentNode);this.point(F,-(D[0]-5),-(D[1]-28),E)}var B,A,C;if(F=="color-picker-resize"){B=-(Event.pointerX(E)),A=-(Event.pointerY(E)),C=parseInt($("color-picker-sphere").getStyle("height"))}else{B=parseInt($(F).getStyle("left"))-Event.pointerX(E),A=parseInt($(F).getStyle("top"))-Event.pointerY(E),C=null}document.onmousemove=function(J,K,H,G,I){if(!this.stop){this.point(K,H,G,J,I)}}.bindAsEventListener(this,F,B,A,C);document.onmouseup=function(){this.stop=1;document.onmousemove="";document.onmouseup=""}.bind(this)}};var Color={hsv2hex:function(A){return Color.rgb2hex(Color.hsv2rgb(A))},hex2hsv:function(A){return Color.rgb2hsv(Color.hex2rgb(A))},hex2rgb:function(A){if(A.substring(0,1)=="#"){A=A.substring(1)}return[parseInt(A.substring(0,2),16),parseInt(A.substring(2,4),16),parseInt(A.substring(4,6),16)]},rgb2hex:function(B){var D=B[0].toString(16),C=B[1].toString(16),A=B[2].toString(16);return(D.length==2?D:"0"+D)+(C.length==2?C:"0"+C)+(A.length==2?A:"0"+A)},hsv2rgb:function(D){var P,J,E,M,I,O,L=D[1]/100,K=D[2]/100,N=D[0]/360;if(L>0){if(N>=1){N=0}N=6*N;P=N-Math.floor(N);J=Math.round(255*K*(1-L));I=Math.round(255*K*(1-(L*P)));E=Math.round(255*K*(1-(L*(1-P))));K=Math.round(255*K);switch(Math.floor(N)){case 0:M=K;O=E;I=J;break;case 1:M=I;O=K;I=J;break;case 2:M=J;O=K;I=E;break;case 3:M=J;O=I;I=K;break;case 4:M=E;O=J;I=K;break;case 5:M=K;O=J;I=I;break}return[M?M:0,O?O:0,I?I:0]}else{return[(K=Math.round(K*255)),K,K]}},rgb2hsv:function(A){var I=A[0]/255;var O=A[1]/255;var C=A[2]/255;var K=Math.min(I,O,C);var P=Math.max(I,O,C);var L=P-K;var D=P;var N,F;if(L==0){N=0;F=0}else{F=L/P;var M=(((P-I)/6)+(L/2))/L;var E=(((P-O)/6)+(L/2))/L;var J=(((P-C)/6)+(L/2))/L;if(I==P){N=J-E}else{if(O==P){N=(1/3)+M-J}else{if(C==P){N=(2/3)+E-M}}}if(N<0){N+=1}else{if(N>1){N-=1}}}return[N*100,F*100,D*100]},brightness:function(A){return Math.round((A[0]*299+A[1]*587+A[2]*114)/1000)}};