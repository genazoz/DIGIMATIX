/**
 * Добавляет кроссбраузерный обработчик событий элементам
 * @return null
 */
function addEventToEls(els, evnt, func) {
  let objOrNo = typeof els === "object";
  if (!objOrNo && els !== null) {
    els = document.querySelectorAll(els);
  }

  els.forEach(function (x) {
    if (x.addEventListener) {
      x.addEventListener(evnt, func, false);
    } else if (x.attachEvent) {
      x.attachEvent("on" + evnt, function () {
        func.apply(x);
      });
    } else {
      x["on" + evnt] = func;
    }
  });
}

/**
 * ForEach по элементам
 * @return null
 */
function each(els, func) {
  let objOrNo = typeof els === "object";
  if (!objOrNo && els !== null) {
    els = document.querySelectorAll(els);
  }
  els.forEach(function (x) {
    func(x);
  });
}

window.addEventListener("DOMContentLoaded", function () {
  addEventToEls(".input__el", "keyup", function (event) {
    var _this = this;
    setTimeout(function () {
      var count = _this.value.length;

      if (count != 0) {
        _this.classList.add("active");
      } else {
        _this.classList.remove("active");
      }
    });
  });

  function setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
    else if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select();
    }
  }

  function mask(event) {
    var matrix = "+7 (___) ___-__-__",
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, "");
    if (def.length >= val.length) val = def;
    this.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length
        ? val.charAt(i++)
        : i >= val.length
        ? ""
        : a;
    });
    if (event.type == "blur") {
      if (this.value.length == 2) this.value = "";
    } else setCursorPosition(this.value.length, this);
  }
  var input = document.querySelector("#tel");
  input.addEventListener("input", mask, false);
  input.addEventListener("focus", mask, false);
  input.addEventListener("blur", mask, false);
});
