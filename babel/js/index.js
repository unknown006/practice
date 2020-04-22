"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Test =
/*#__PURE__*/
function () {
  function Test() {
    var _this = this;

    _classCallCheck(this, Test);

    for (var _len = arguments.length, arr = new Array(_len), _key = 0; _key < _len; _key++) {
      arr[_key] = arguments[_key];
    }

    arr.forEach(function (elem) {
      Object.defineProperty(_this, Symbol(), {
        value: elem,
        writable: false,
        enumerable: false,
        configurable: false
      });
    });
    this.sum = this.getSum();
    this.factorial = this.getFactorial();
  }

  _createClass(Test, [{
    key: "getSum",
    value: function getSum() {
      var _this2 = this;

      var keys = Object.getOwnPropertySymbols(this);
      return keys.reduce(function (res, elem) {
        return res + _this2[elem];
      }, 0);
    }
  }, {
    key: "getFactorial",
    value: function getFactorial() {
      var _this3 = this;

      var keys = Object.getOwnPropertySymbols(this);
      return keys.reduce(function (res, elem) {
        return res * _this3[elem];
      }, 1);
    }
  }]);

  return Test;
}();

var obj = new Test(1, 2, 3, 4, 5);
console.log(obj);