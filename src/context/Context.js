import React, { Component } from "react";
import { storeProducts, detailProduct } from "../data";

const Context = React.createContext();

class ProductProvider extends Component {
  state = {
    products: storeProducts,
    detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    subTotal: 0,
    tax: 0,
    total: 0,
  };
  // Get fresh copies of each project
  setProducts = () => {
    let products = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      products = [...products, singleItem];
    });
    this.setState(() => {
      return {
        products,
      };
    });
  };

  componentDidMount() {
    this.setProducts();
  }
  // Fetch a particular product
  findProduct = (id) =>
    this.state.products.find((product) => product.id === id);
  // Set detailproduct to fetched product
  handleDetail = (id) => {
    const product = this.findProduct(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };

  // Add item to cart
  addToCart = (id) => {
    let products = [...this.state.products];
    const index = products.indexOf(this.findProduct(id));
    const product = products[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(
      () => {
        return {
          products,
          cart: [...this.state.cart, product],
        };
      },
      () => {
        this.addTotals();
      }
    );
  };
  // Open Modal
  openModal = (id) => {
    const product = this.findProduct(id);
    this.setState(() => {
      return {
        modalProduct: product,
        modalOpen: true,
      };
    });
  };
  // Close Modal
  closeModal = () => {
    this.setState(() => {
      return {
        modalOpen: false,
      };
    });
  };
  increment = (id) => {
    const cart = [...this.state.cart];
    const selectedProduct = cart.find((item) => item.id === id);
    const index = cart.indexOf(selectedProduct);
    const product = cart[index];
    product.count = product.count + 1;
    product.total = product.count * product.price;
    this.setState(
      () => {
        return {
          cart: [...cart],
        };
      },
      () => {
        this.addTotals();
      }
    );
  };
  decrement = (id) => {
    const cart = [...this.state.cart];
    const selectedProduct = cart.find((item) => item.id === id);
    const index = cart.indexOf(selectedProduct);
    const product = cart[index];
    product.count = product.count - 1;
    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState(
        () => {
          return {
            cart: [...cart],
          };
        },
        () => {
          this.addTotals();
        }
      );
    }
  };
  removeItem = (id) => {
    let cart = [...this.state.cart];
    let products = [...this.state.products];
    cart = cart.filter((item) => item.id !== id);
    const index = products.indexOf(this.findProduct(id));
    let removedProduct = products[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;
    this.setState(
      () => {
        return {
          cart: [...cart],
          products: [...products],
        };
      },
      () => {
        this.addTotals();
      }
    );
  };
  clearCart = () => {
    this.setState(
      () => {
        return {
          cart: [],
        };
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };
  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map((item) => (subTotal += item.total));
    const tax = parseFloat((subTotal * 0.075).toFixed(2));
    const total = subTotal + tax;
    this.setState(() => {
      return {
        subTotal,
        tax,
        total,
      };
    });
  };
  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

const ProductConsumer = Context.Consumer;
export { ProductProvider, ProductConsumer };
