class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      inStockOnly: false,
    };
    this.handleSearchBarInput = this.handleSearchBarInput.bind(this);
    this.handleSearchBarCheckbox = this.handleSearchBarCheckbox.bind(this);
  }
  handleSearchBarInput(value) {
    this.setState({
      filterText: value,
    });
  }
  handleSearchBarCheckbox(value) {
    this.setState({
      inStockOnly: value,
    });
  }
  render() {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="border rounded-lg p-4 w-72">
          <SearchBar
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly}
            onHandleSearchBarCheckbox={this.handleSearchBarCheckbox}
            onHandleSearchBarInput={this.handleSearchBarInput}
          />
          <ProductTable
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly}
            products={this.props.products}
          />
        </div>
      </div>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchBarCheckbox = this.handleSearchBarCheckbox.bind(this);
    this.handleSearchBarInput = this.handleSearchBarInput.bind(this);
  }
  handleSearchBarInput(event) {
    this.props.onHandleSearchBarInput(event.target.value);
  }
  handleSearchBarCheckbox(event) {
    this.props.onHandleSearchBarCheckbox(event.target.checked);
  }

  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;
    return (
      <form className="flex flex-col gap-2">
        <input
          type="text"
          className="border p-1 rounded-md shadow"
          placeholder="Search..."
          value={filterText}
          onChange={this.handleSearchBarInput}
        />

        <div className="flex gap-2 my-2">
          <input
            id="show-stock"
            type="checkbox"
            checked={inStockOnly}
            onChange={this.handleSearchBarCheckbox}
          />
          <label htmlFor="show-stock">Only show products in stock</label>
        </div>
      </form>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;
    const rows = [];
    let lastCategoryName = null;
    this.props.products.forEach((product) => {
      if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
        return;
      }
      if (inStockOnly && !product.stocked) {
        return;
      }
      if (product.category !== lastCategoryName) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category}
          />
        );
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategoryName = product.category;
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class ProductCategoryRow extends React.Component {
  render() {
    return (
      <tr>
        <th colSpan="2">{this.props.category}</th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    return (
      <tr>
        <td>{product.name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

const PRODUCTS = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football",
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball",
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball",
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch",
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 5",
  },
  {
    category: "Electronics",
    price: "$199.99",
    stocked: true,
    name: "Nexus 7",
  },
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<FilterableProductTable products={PRODUCTS} />);
