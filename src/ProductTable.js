import React from "react";
import ProductRow from "./ProductRow";
import ProductCategoryRow from "./ProductCategoryRow";

class ProductTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    const rows = [];
    let lastCategory = null;

    alert("PRODUCTS BEING PASSED: " + this.props.products);

    try {
      alert("PRODUCT TWO FIRST: " + this.props.products[1]);
      alert("PRODUCT TWO FIRST FIELD: " + this.props.products[1].first);
    } catch (err) {
      alert(err);
    }

    this.props.products.forEach(product => {
      if (product.first.indexOf(filterText) === -1) {
        return;
      }
      if (inStockOnly && !product.stocked) {
        return;
      }

      if (product.last !== lastCategory) {
        rows.push(
          <ProductCategoryRow category={product.last} key={product.last} />
        );
      }
      rows.push(<ProductRow product={product} key={product.first} />);
      lastCategory = product.last;
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

export default ProductTable;
