import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Cart from "./components/cart/Cart";
import Details from "./components/Details";
import ProductList from "./components/ProductList";
import Default from "./components/Default";
import Modal from "./components/Modal";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={ProductList} />{" "}
          <Route path="/details" component={Details} />
          <Route path="/cart" component={Cart} />
          <Route component={Default} />
        </Switch>
        <Modal />
      </div>
    </BrowserRouter>
  );
}

export default App;
