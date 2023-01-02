var rangeEl = document.body.querySelector('#range'),
  args = ARGS,
  liEls = document.querySelectorAll('li'),
  onBtnEl = document.querySelector('.switch-btn');

// 进度条
rangeEl.addEventListener('input', function () {
  setting('range', rangeEl.value);
});

// 读取缓存初始化
(() => {
  if (!chrome.storage) return;

  chrome.storage.local.get(args, function (item) {
    if (!item.on) {
      onBtnEl.className = 'switch-btn gray';
      onBtnEl.innerText = 'off';
    }

    rangeEl.value = item.range;

    if (item.isPicker) {
      initColorpicker(true, item.color, item.pickerColor);
    } else {
      liEls.forEach(function (li) {
        if (item.color == li.getAttribute('data-color')) {
          li.className = 'active';
          return false;
        }
      });

      initColorpicker(false, null, item.pickerColor);
    }
  });
})();

// 扩展开关
onBtnEl.addEventListener('click', function () {
  var that = this;

  if (that.className.indexOf('gray') == -1) {
    that.className = 'switch-btn gray';
    that.innerText = 'off';
    setting('on', false);
  } else {
    that.className = 'switch-btn';
    that.innerText = 'on';
    setting('on', true);
  }
});

// 快速选择
liEls.forEach(function (item) {
  item.addEventListener('click', function () {
    var that = this;

    if (!that.className) {
      const activeEl = document.querySelector('.container .active');
      activeEl && (activeEl.className = '');

      that.className = 'active';
      setting('color', that.getAttribute('data-color'));
      setting('isPicker', false);
    }
  });
});

// 拾色器
function initColorpicker(isDefault = false, color, pickerColor) {
  let isFirst = true;
  new Colorpicker({
    el: 'color-picker',
    color: isDefault ? color || pickerColor : pickerColor,
    change: function (elem, hex) {
      elem.style.backgroundColor = hex;

      if (!isDefault && isFirst) return (isFirst = false);

      const activeEl = document.querySelector('.container .active');
      activeEl && (activeEl.className = '');
      elem.className = 'active';
      setting('color', hex);
      setting('isPicker', true);
      setting('pickerColor', hex);
    },
  });
}

// 尾部
var urlEl = document.querySelector('#url');
urlEl.addEventListener('click', function () {
  chrome.tabs.create({ url: 'https://github.com/weijhfly' });
});

document.getElementById('js-time').innerText = new Date().getFullYear();

addForEachToNodeList();
function addForEachToNodeList() {
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }
}

function setting(key, value) {
  var obj = {};

  obj[key] = value;
  chrome.storage.local.set(obj);
}

// 打赏弹窗
const donationsBtnEl = document.querySelector('#donations');
const dialogEl = document.querySelector('#donations-dialog');
const closeBtnEls = document.querySelectorAll('.js-dialog-close');
const tabEls = document.querySelectorAll('.donations-dialog__tab');

donationsBtnEl.addEventListener('click', () => {
  dialogEl.style.display = 'block';
});

closeBtnEls.forEach(function (item) {
  item.addEventListener('click', function () {
    if (this.className.includes('active')) {
      this.innerText = chrome.i18n.getMessage('thanks') + '🙏';
      setTimeout(() => {
        dialogEl.style.display = 'none';
        this.innerText = chrome.i18n.getMessage('donated');
      }, 1500);
    } else {
      dialogEl.style.display = 'none';
    }
  });
});

tabEls.forEach(function (item) {
  item.addEventListener('click', function () {
    document.querySelector('.donations-dialog__tabs .active').className =
      'donations-dialog__tab';
    this.className = 'donations-dialog__tab active';
    document.querySelector('.donations-dialog__img').src =
      './img/' + this.dataset.pay + '.jpeg';
  });
});

// 多语言
var lanEls = document.querySelectorAll('.js-lang');

lanEls.forEach(function (item) {
  var text = item.innerText,
    key = text.replace(/_MSG_/, '');

  item.innerText = chrome.i18n.getMessage(key);
});
