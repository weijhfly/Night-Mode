//document.addEventListener("DOMContentLoaded", ()=>{
   chrome.storage.sync.get('degree', function(item) {
   	var degree = 0.3;

   	if(item.degree != undefined){
   		degree = item.degree;
   	}

    var style = document.createElement("style");

	style.type = 'text/css';
	style.id = 'night-css';
	style.innerText = 'body:after{opacity: '+ degree +';}';
	document.head.appendChild(style);
   })

//});
