import React from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

function PaypalButton({ history, total, clearCart }) {
  const onSuccess = (payment) => {
    clearCart();
    history.push("/");
  };

  const onCancel = (data) => {
    console.log("The payment was cancelled!", data);
  };

  const onError = (err) => {
    console.log("Error!", err);
  };

  let env = "sandbox"; // you can set here to 'production' for production
  let currency = "USD"; // or you can set this value from your props or state

  const client = {
    sandbox: process.env.REACT_APP_SANDBOX_ID,
    production: "YOUR-PRODUCTION-APP-ID",
  };

  return (
    <PaypalExpressBtn
      env={env}
      client={client}
      currency={currency}
      total={total}
      onError={onError}
      onSuccess={onSuccess}
      onCancel={onCancel}
    />
  );
}

export default PaypalButton;
