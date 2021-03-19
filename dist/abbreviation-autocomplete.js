'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./abbreviation-autocomplete.css");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// Inserts an element into a sorted array containing a limited range of integers
//  @param {array} arr The sorted array
//  @param {array} arrReduced The array represented in the form:
//    [e1: [a1, b1], e2: [a2, b2]]
//    where
//      eX is an element of the array
//      aX is the first index that contains eX in the array
//      bX is the last index that contains eX in the array
//  @param {integer} elem The integer to be inserted into "arrReduced"
//  @throws {TypeError} for incorrect parameter types
function countingSortInsert(arr, arrReduced, elem, elemGroup) {
  if (!(arr instanceof Array)) {
    throw new TypeError('1st param "arr" must be an array');
  }

  if (!(arrReduced instanceof Array)) {
    throw new TypeError('1st param "arrReduced" must be an array');
  } // Increase indicies for elements greater than elem


  for (var _i = elemGroup + 1; _i < arrReduced.length; _i++) {
    var range = arrReduced[_i];

    if (range) {
      range[0]++;
      range[1]++;
    }
  }

  var elemRange = arrReduced[elemGroup];

  if (elemRange) {
    // Increase elem's ending index
    elemRange[1]++;
  } else {
    // Create elem's indicies because it's not in arrReduced yet
    for (var i = elemGroup - 1; i >= 0; i--) {
      var _range = arrReduced[i];

      if (_range) {
        var afterLastPosition = _range[1] + 1;
        arrReduced[elemGroup] = [afterLastPosition, afterLastPosition];
        break;
      }
    }

    if (i < 0) {
      arrReduced[elemGroup] = [0, 0];
    }
  }

  arr.splice(arrReduced[elemGroup][1], 0, elem);
}

var AbbreviationAutocomplete = /*#__PURE__*/function (_Component) {
  _inherits(AbbreviationAutocomplete, _Component);

  var _super = _createSuper(AbbreviationAutocomplete);

  function AbbreviationAutocomplete(props) {
    var _this;

    _classCallCheck(this, AbbreviationAutocomplete);

    _this = _super.call(this, props);

    if (!props.data) {
      throw new Error('Missing required prop data');
    } else if (!(props.data instanceof Array)) {
      throw new TypeError("Prop data must be an array. Instead received ".concat(_typeof(props.data)));
    }

    if (isNaN(props.limit)) {
      throw new TypeError("Prop limit must be a number. Instead received ".concat(_typeof(props.limit)));
    }

    if (isNaN(props.minSearchTextLength)) {
      throw new TypeError("Prop minSearchTextLength must be a number. Instead received ".concat(_typeof(props.minSearchTextLength)));
    }

    if (props.placeholder) {
      if (typeof props.placeholder !== 'string') {
        throw new TypeError("Prop placeholder must be a string. Instead received ".concat(_typeof(props.placeholder)));
      }
    }

    if (typeof props.searchText !== 'string') {
      throw new TypeError("Prop searchText must be a string. Instead received ".concat(_typeof(props.searchText)));
    }

    if (props.onSelect && !(props.onSelect instanceof Function)) {
      throw new TypeError("Prop onSelect must be a function. Instead received ".concat(_typeof(props.onSelect)));
    }

    if (props.onSearchTextChange && !(props.onSearchTextChange instanceof Function)) {
      throw new TypeError("Prop onSearchTextChange must be a function. Instead received ".concat(_typeof(props.onSearchTextChange)));
    }

    _this.state = {
      data: props.data,
      recentlySelected: false,
      showSearchItems: false,
      searchList: [],
      searchText: props.searchText === undefined ? '' : props.searchText,
      selected: -1
    };
    _this.onSearchTextChange = _this.onSearchTextChange.bind(_assertThisInitialized(_this));
    _this.onInputFocus = _this.onInputFocus.bind(_assertThisInitialized(_this));
    _this.onInputKeyPress = _this.onInputKeyPress.bind(_assertThisInitialized(_this));
    _this.select = _this.select.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(AbbreviationAutocomplete, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var props = this.props; // Modify some methods to call prop functions if prop functions are passed

      if (props.onSelect) {
        var select = this.select;

        this.select = function () {
          props.onSelect(select());
        };
      }

      if (props.onSearchTextChange) {
        var onSearchTextChange = this.onSearchTextChange;

        this.onSearchTextChange = function (e) {
          onSearchTextChange(e);
          props.onSearchTextChange(e.target.value);
        };
      }
    }
  }, {
    key: "onInputFocus",
    value: function onInputFocus() {
      var state = this.state;

      if (state.recentlySelected) {
        this.onSearchTextChange({
          target: {
            value: state.searchText
          }
        });
      }

      this.setState({
        showSearchItems: true
      });
    }
  }, {
    key: "onInputKeyPress",
    value: function onInputKeyPress(e) {
      var state = this.state;

      switch (e.key) {
        case 'ArrowDown':
          // down (Set highlighted option 1 down)
          this.setState({
            selected: (state.selected + 1) % state.searchList.length
          });
          break;

        case 'ArrowUp':
          // up (Set highlighted option 1 up)
          var searchLength = state.searchList.length;
          this.setState({
            selected: state.selected === -1 ? searchLength - 1 : (state.selected + searchLength - 1) % searchLength
          });
          break;

        case 'Enter':
          // Select highlighted option
          this.select();
          e.target.blur();
          break;
      }
    }
  }, {
    key: "onSearchTextChange",
    value: function onSearchTextChange(e) {
      var searchText = e.target.value;

      if (this.props.minSearchTextLength <= searchText.length) {
        var countingSortData = [];
        var relatedResults = [];
        this.state.data.forEach(function (elem) {
          var index = elem.d.toLowerCase().indexOf(searchText.toLowerCase()); // if search text is a substring of this definition

          if (index >= 0) {
            countingSortInsert(relatedResults, countingSortData, elem, index);
            elem.substrIndex = index;
          }
        });
        this.setState({
          recentlySelected: false,
          searchList: relatedResults.length <= this.props.limit ? relatedResults : relatedResults.slice(0, this.props.limit),
          searchText: searchText
        });
      } else {
        this.setState({
          recentlySelected: false,
          searchList: [],
          searchText: searchText
        });
      }
    }
  }, {
    key: "select",
    value: function select() {
      var state = this.state;

      if (state.selected !== -1) {
        var selectedSearchItem = state.searchList[state.selected];
        delete selectedSearchItem['substrIndex'];
        var selectedData = JSON.parse(JSON.stringify(selectedSearchItem)); // Copy object

        this.setState({
          recentlySelected: true,
          searchText: state.searchList[state.selected].a,
          selected: -1,
          showSearchItems: false
        });
        return selectedData;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var state = this.state;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "abbreviation-autocomplete"
      }, /*#__PURE__*/_react["default"].createElement("input", {
        type: "text",
        placeholder: this.props.placeholder,
        value: state.searchText,
        onBlur: function onBlur() {
          _this2.setState({
            showSearchItems: false
          });
        },
        onChange: this.onSearchTextChange,
        onFocus: this.onInputFocus,
        onKeyDown: this.onInputKeyPress
      }), /*#__PURE__*/_react["default"].createElement("ul", {
        style: {
          display: state.showSearchItems ? null : "none"
        }
      }, state.searchList.map(function (searchItem, index) {
        return /*#__PURE__*/_react["default"].createElement("li", {
          key: index,
          className: state.selected === index ? 'selected' : null,
          onMouseDown: _this2.select,
          onMouseEnter: function onMouseEnter() {
            _this2.setState({
              selected: index
            });
          }
        }, /*#__PURE__*/_react["default"].createElement("span", null, searchItem.a), /*#__PURE__*/_react["default"].createElement("span", null, " (", searchItem.d.substr(0, searchItem.substrIndex)), /*#__PURE__*/_react["default"].createElement("span", {
          className: "highlight"
        }, searchItem.d.substr(searchItem.substrIndex, state.searchText.length)), /*#__PURE__*/_react["default"].createElement("span", null, searchItem.d.substr(searchItem.substrIndex + state.searchText.length), ")"));
      })));
    }
  }]);

  return AbbreviationAutocomplete;
}(_react.Component);

AbbreviationAutocomplete.defaultProps = {
  limit: Infinity,
  minSearchTextLength: 1,
  searchText: ''
};
var _default = AbbreviationAutocomplete;
exports["default"] = _default;