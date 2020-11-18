import React from "react";
import { ProductConsumer } from "../context/Context";
import { Link } from "react-router-dom";
import { Button } from "./Button";

export default function Details() {
  return (
    <ProductConsumer>
      {(value) => {
        const {
          id,
          img,
          title,
          company,
          info,
          price,
          inCart,
        } = value.detailProduct;
        return (
          <div className="container py-5">
            <div className="row">
              <div className="col-10 mx-auto text-center text-blue my-5 text-slanted">
                <h1>{title}</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-10 mx-auto col-md-6 my-3">
                <img src={img} alt="Product" className="img-fluid" />
              </div>
              <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                <h2>Model: {title}</h2>
                <h4 className="text-uppercase text-title text-muted mt-3 mb-2">
                  Made by: <span className="text-uppercase">{company}</span>
                </h4>
                <h4 className="text-blue">
                  <strong>
                    Price : <span>$</span>
                    {price}
                  </strong>
                </h4>
                <p className="text-capitalize font-weight-bold mt-3 mb-0">
                  Product Description:
                </p>
                <p className="text-muted lead">{info}</p>
                <div>
                  <Link to="/">
                    <Button>Back To Products</Button>
                  </Link>
                  <Button
                    disabled={inCart}
                    onClick={() => {
                      value.addToCart(id);
                      value.openModal(id);
                    }}
                    cart
                  >
                    {inCart ? "In Cart" : "Add To Cart"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </ProductConsumer>
  );
}
