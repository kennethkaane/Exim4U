(function(){var E=window.DoResizeFixes=function(){var F=window.document.body;for(var G=0;G<F.childNodes.length;G++){var H=F.childNodes[G];switch(H.className){case"contents":H.style.width=Math.max(0,F.offsetWidth-16-16);H.style.height=Math.max(0,F.clientHeight-20-2);break;case"blocker":case"cover":H.style.width=Math.max(0,F.offsetWidth-16-16+4);H.style.height=Math.max(0,F.clientHeight-20-2+4);break;case"tr":H.style.left=Math.max(0,F.clientWidth-16);break;case"tc":H.style.width=Math.max(0,F.clientWidth-16-16);break;case"ml":H.style.height=Math.max(0,F.clientHeight-16-51);break;case"mr":H.style.left=Math.max(0,F.clientWidth-16);H.style.height=Math.max(0,F.clientHeight-16-51);break;case"bl":H.style.top=Math.max(0,F.clientHeight-51);break;case"br":H.style.left=Math.max(0,F.clientWidth-30);H.style.top=Math.max(0,F.clientHeight-51);break;case"bc":H.style.width=Math.max(0,F.clientWidth-30-30);H.style.top=Math.max(0,F.clientHeight-51);break}}};var D=function(){this.style.backgroundPosition="-16px -687px"};var C=function(){this.style.backgroundPosition="-16px -651px"};var A=function(){var F=document.getElementById("closeButton");F.onmouseover=D;F.onmouseout=C};var B=function(){E();A();window.attachEvent("onresize",E);window.detachEvent("onload",B)};window.attachEvent("onload",B)})();