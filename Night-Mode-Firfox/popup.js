
var range = document.body.querySelector('#range'),
    str = "#range::-moz-range-track{background:linear-gradient(to right, #1ab1e2 0%, #1ab1e2 $val%,#eee $val%, #eee); }";

range.addEventListener('input', (e)=>{
    var el = document.querySelector('#degree-css');

    el.innerText = str.replace(/\$val/g,range.value);

    browser.storage.local.set({degree:range.value/100})
    .then(function(){
      //console.log('ok')
    });
    
    var code = 'if(document.getElementById("night-css")){'+
        'document.getElementById("night-css").innerText = "body:after{opacity:$val}";'+
      '}else{'+
        'var style = document.createElement("style");'+

        'style.type = "text/css";'+
        'style.id = "night-css";'+
        'style.innerText = "body:after{opacity: $val;}";'+
        'document.head.appendChild(style);'+
      '}';

      code = code.replace('$val',range.value/100+' !important');

      browser.tabs.query({active: true, currentWindow: true}, function(tabs) {

        browser.tabs.executeScript(tabs[0].id, {code: code});
      });
});

browser.storage.local.get("degree")
  .then(function(item){
  var degree = 0.3;

  if(item.degree != undefined){
    degree = item.degree;
  }
  degree = degree*100;
  range.value = degree;
  var style = document.createElement("style");

  style.type = "text/css";
  style.id = "degree-css";
  style.innerText = str.replace(/\$val/g,degree);
  document.head.appendChild(style);
})

var urlEle = document.body.querySelector("#url");
urlEle.addEventListener('click', function(){
    browser.tabs.create({url: 'https://github.com/weijhfly'});
});

document.querySelector(".title").innerText = browser.i18n.getMessage('title');

document.getElementById('js-time').innerText = new Date().getFullYear();