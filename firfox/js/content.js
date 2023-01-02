var args = ARGS,
    temp;

chrome.storage.local.get(args, function(item) {
  temp = item;
  var mask = document.createElement("div");

  mask.id = "night-mask",
  document.documentElement.appendChild(mask);
  setStyle(item);
})

chrome.storage.onChanged.addListener(function(obj){
  var key = Object.keys(obj)[0],
      val = obj[key].newValue;

  temp[key] = val;
  setStyle(temp);
})

function setStyle(obj){
  var mask = document.querySelector("#night-mask"),
      css = 'position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 2147483647;pointer-events: none;'+
      'mix-blend-mode: multiply;transition: opacity 0.1s ease 0s;opacity:$opa;display:$dis;background: $bac;';

  css = css.replace('$opa',obj.range/100).replace('$dis',obj.on? 'block':'none').replace('$bac',obj.color);
  mask.setAttribute("style", css);
}
