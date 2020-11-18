import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../context/Context";
import PropTypes from "prop-types";

export default function Product({
  product: { id, img, title, price, inCart },
}) {
  return (
    <ProductWrapper className="col-sm-9 col-md-6 col-lg-3 my-3 mx-auto">
      <div className="card">
        <ProductConsumer>
          {(value) => {
            return (
              <div
                className="img-container p-5"
                onClick={() => {
                  value.handleDetail(id);
                }}
              >
                <Link to="/details">
                  <img src={img} alt={title} className="card-img-top" />
                </Link>
                <button
                  onClick={() => {
                    value.openModal(id);
                    value.addToCart(id);
                  }}
                  disabled={inCart}
                  className="cart-btn"
                >
                  {inCart ? (
                    <p className="mb-0">In Cart</p>
                  ) : (
                    <p className="mb-0">
                      <i className="fas fa-cart-plus" />
                    </p>
                  )}
                </button>
              </div>
            );
          }}
        </ProductConsumer>
        <div className="card-footer d-flex justify-content-between">
          <p className="align-self-center mb-0">{title}</p>
          <h5 className="font-italic text-blue mb-0">
            <span className="mr-1">$</span>
            {price}
          </h5>
        </div>
      </div>
    </ProductWrapper>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    img: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    inCart: PropTypes.bool,
  }).isRequired,
};

const ProductWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all 0.6s linear;
  }
  .card-footer {
    border-color: transparent;
    border-top: transparent;
    transition: all 0.6s linear;
  }
  &:hover {
    .card {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.2);
    }
    .card-footer {
      background: rgba(247, 247, 247);
    }
  }
  .img-container {
    position: relative;
    overflow: hidden;
  }
  .card-img-top {
    transition: all 0.6s linear;
  }
  .img-container:hover .card-img-top {
    transform: scale(1.4);
    
  }
  .cart-btn {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 0.2rem 0.4rem;
    background: var(--lightBlue);
    color: var(--mainWhite);
    border: none;
    font-size: 1.4rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%, 100%);
    transition: all 0.6s linear;
  }
  }
  .img-container:hover .cart-btn {
    transform: translate(0, 0);
  }
  .cart-btn:hover {
    color: var(--mainBlue);
    cursor: pointer;
  }  
`;
