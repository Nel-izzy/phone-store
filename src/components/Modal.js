import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../context/Context";
import { Button } from "./Button";

export default function Modal() {
  return (
    <ProductConsumer>
      {(value) => {
        const { modalOpen, closeModal } = value;
        const { img, title, price } = value.modalProduct;
        if (!modalOpen) return null;
        return (
          <ModalWrapper>
            <div className="container">
              <div className="row">
                <div
                  id="modal"
                  className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize py-5"
                >
                  <h5>item added to cart</h5>
                  <img src={img} alt="Product" className="img-fluid" />
                  <h5>{title}</h5>
                  <h5 className="text-muted">Price : {price}</h5>
                  <Link to="/">
                    <Button onClick={() => closeModal()}>
                      Continue Shopping
                    </Button>
                  </Link>
                  <Link to="/cart">
                    <Button cart onClick={() => closeModal()}>
                      Go to Cart
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </ModalWrapper>
        );
      }}
    </ProductConsumer>
  );
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  #modal {
    background: var(--mainWhite);
  }
`;
