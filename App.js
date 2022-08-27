var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FilterableProductTable = function (_React$Component) {
  _inherits(FilterableProductTable, _React$Component);

  function FilterableProductTable(props) {
    _classCallCheck(this, FilterableProductTable);

    var _this = _possibleConstructorReturn(this, (FilterableProductTable.__proto__ || Object.getPrototypeOf(FilterableProductTable)).call(this, props));

    _this.state = {
      filterText: "",
      inStockOnly: false
    };
    _this.handleSearchBarInput = _this.handleSearchBarInput.bind(_this);
    _this.handleSearchBarCheckbox = _this.handleSearchBarCheckbox.bind(_this);
    return _this;
  }

  _createClass(FilterableProductTable, [{
    key: "handleSearchBarInput",
    value: function handleSearchBarInput(value) {
      this.setState({
        filterText: value
      });
    }
  }, {
    key: "handleSearchBarCheckbox",
    value: function handleSearchBarCheckbox(value) {
      this.setState({
        inStockOnly: value
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "w-screen h-screen flex justify-center items-center" },
        React.createElement(
          "div",
          { className: "border rounded-lg p-4 w-72" },
          React.createElement(SearchBar, {
            filterText: this.state.filterText,
            inStockOnly: this.state.inStockOnly,
            onHandleSearchBarCheckbox: this.handleSearchBarCheckbox,
            onHandleSearchBarInput: this.handleSearchBarInput
          }),
          React.createElement(ProductTable, {
            filterText: this.state.filterText,
            inStockOnly: this.state.inStockOnly,
            products: this.props.products
          })
        )
      );
    }
  }]);

  return FilterableProductTable;
}(React.Component);

var SearchBar = function (_React$Component2) {
  _inherits(SearchBar, _React$Component2);

  function SearchBar(props) {
    _classCallCheck(this, SearchBar);

    var _this2 = _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call(this, props));

    _this2.handleSearchBarCheckbox = _this2.handleSearchBarCheckbox.bind(_this2);
    _this2.handleSearchBarInput = _this2.handleSearchBarInput.bind(_this2);
    return _this2;
  }

  _createClass(SearchBar, [{
    key: "handleSearchBarInput",
    value: function handleSearchBarInput(event) {
      this.props.onHandleSearchBarInput(event.target.value);
    }
  }, {
    key: "handleSearchBarCheckbox",
    value: function handleSearchBarCheckbox(event) {
      this.props.onHandleSearchBarCheckbox(event.target.checked);
    }
  }, {
    key: "render",
    value: function render() {
      var filterText = this.props.filterText;
      var inStockOnly = this.props.inStockOnly;
      return React.createElement(
        "form",
        { className: "flex flex-col gap-2" },
        React.createElement("input", {
          type: "text",
          className: "border p-1 rounded-md shadow",
          placeholder: "Search...",
          value: filterText,
          onChange: this.handleSearchBarInput
        }),
        React.createElement(
          "div",
          { className: "flex gap-2 my-2" },
          React.createElement("input", {
            id: "show-stock",
            type: "checkbox",
            checked: inStockOnly,
            onChange: this.handleSearchBarCheckbox
          }),
          React.createElement(
            "label",
            { htmlFor: "show-stock" },
            "Only show products in stock"
          )
        )
      );
    }
  }]);

  return SearchBar;
}(React.Component);

var ProductTable = function (_React$Component3) {
  _inherits(ProductTable, _React$Component3);

  function ProductTable() {
    _classCallCheck(this, ProductTable);

    return _possibleConstructorReturn(this, (ProductTable.__proto__ || Object.getPrototypeOf(ProductTable)).apply(this, arguments));
  }

  _createClass(ProductTable, [{
    key: "render",
    value: function render() {
      var filterText = this.props.filterText;
      var inStockOnly = this.props.inStockOnly;
      var rows = [];
      var lastCategoryName = null;
      this.props.products.forEach(function (product) {
        if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
          return;
        }
        if (inStockOnly && !product.stocked) {
          return;
        }
        if (product.category !== lastCategoryName) {
          rows.push(React.createElement(ProductCategoryRow, {
            category: product.category,
            key: product.category
          }));
        }
        rows.push(React.createElement(ProductRow, { product: product, key: product.name }));
        lastCategoryName = product.category;
      });
      return React.createElement(
        "table",
        null,
        React.createElement(
          "thead",
          null,
          React.createElement(
            "tr",
            null,
            React.createElement(
              "th",
              null,
              "Name"
            ),
            React.createElement(
              "th",
              null,
              "Price"
            )
          )
        ),
        React.createElement(
          "tbody",
          null,
          rows
        )
      );
    }
  }]);

  return ProductTable;
}(React.Component);

var ProductCategoryRow = function (_React$Component4) {
  _inherits(ProductCategoryRow, _React$Component4);

  function ProductCategoryRow() {
    _classCallCheck(this, ProductCategoryRow);

    return _possibleConstructorReturn(this, (ProductCategoryRow.__proto__ || Object.getPrototypeOf(ProductCategoryRow)).apply(this, arguments));
  }

  _createClass(ProductCategoryRow, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "tr",
        null,
        React.createElement(
          "th",
          { colSpan: "2" },
          this.props.category
        )
      );
    }
  }]);

  return ProductCategoryRow;
}(React.Component);

var ProductRow = function (_React$Component5) {
  _inherits(ProductRow, _React$Component5);

  function ProductRow() {
    _classCallCheck(this, ProductRow);

    return _possibleConstructorReturn(this, (ProductRow.__proto__ || Object.getPrototypeOf(ProductRow)).apply(this, arguments));
  }

  _createClass(ProductRow, [{
    key: "render",
    value: function render() {
      var product = this.props.product;
      return React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          null,
          product.name
        ),
        React.createElement(
          "td",
          null,
          product.price
        )
      );
    }
  }]);

  return ProductRow;
}(React.Component);

var PRODUCTS = [{
  category: "Sporting Goods",
  price: "$49.99",
  stocked: true,
  name: "Football"
}, {
  category: "Sporting Goods",
  price: "$9.99",
  stocked: true,
  name: "Baseball"
}, {
  category: "Sporting Goods",
  price: "$29.99",
  stocked: false,
  name: "Basketball"
}, {
  category: "Electronics",
  price: "$99.99",
  stocked: true,
  name: "iPod Touch"
}, {
  category: "Electronics",
  price: "$399.99",
  stocked: false,
  name: "iPhone 5"
}, {
  category: "Electronics",
  price: "$199.99",
  stocked: true,
  name: "Nexus 7"
}];

var root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(FilterableProductTable, { products: PRODUCTS }));