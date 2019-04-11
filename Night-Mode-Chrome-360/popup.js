var range = document.body.querySelector('#range');

range.addEventListener('input', (e)=>{
    range.style.backgroundSize = range.value + '% 100%';

    chrome.storage.sync.set({degree:range.value/100}, (item)=>{
    var code = 'var el = document.querySelector("#night-css");'+
      'if(el){'+
        'el.innerText = "body:after{opacity:$val}";'+
      '}else{'+
        'var style = document.createElement("style");'+

        'style.type = "text/css";'+
        'style.id = "night-css";'+
        'style.innerText = "body:after{opacity: $val;}";'+
        'document.head.appendChild(style);'+
      '}';

      code = code.replace('$val',range.value/100);

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
          tabs[0].id,
          {code: code});
      });
    })
});

chrome.storage.sync.get('degree', function(item) {
  var degree = 0.3;

  if(item.degree != undefined){
    degree = item.degree;
  }
  degree = degree*100;
  range.value = degree;
  range.style.backgroundSize = degree + '% 100%';
})
var urlEle = document.body.querySelector("#url");
urlEle.addEventListener('click', function(){
    chrome.tabs.create({url: 'https://github.com/weijhfly'});
});

document.querySelector(".title").innerText = chrome.i18n.getMessage('title');
document.getElementById('js-time').innerText = new Date().getFullYear();