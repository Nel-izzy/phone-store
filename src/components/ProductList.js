import React from "react";
import { ProductConsumer } from "../context/Context";
import Product from "./Product";
import Title from "./Title";

export default function ProductList() {
  return (
    <div className="py-5">
      <div className="container">
        <Title name="Our" title="Products" />
        <div className="row">
          <ProductConsumer>
            {(value) =>
              value.products.map((product) => (
                <Product key={product.id} product={product} />
              ))
            }
          </ProductConsumer>
        </div>
      </div>
    </div>
  );
}
