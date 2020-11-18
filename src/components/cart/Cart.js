import React from "react";
import { ProductConsumer } from "../../context/Context";
import Title from "../Title";
import CartList from "./CartList";
import CartTotals from "./CartTotals";
import Columns from "./Columns";
import EmptyCart from "./EmptyCart";

export default function Cart({ history }) {
  return (
    <section>
      <ProductConsumer>
        {(value) => {
          const { cart } = value;
          if (cart.length > 0) {
            return (
              <>
                <Title name="Your" title="Cart" />
                <Columns />
                <CartList value={value} />
                <CartTotals value={value} history={history} />
              </>
            );
          } else {
            return <EmptyCart />;
          }
        }}
      </ProductConsumer>
    </section>
  );
}
