import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "../../hooks/useCart";


const stripePromise = loadStripe("pk_test_51OOfFXKmnk75x50UgQ94DVWOTA25OeqHxJGlBX66YUotuw3FgswAS9cTjTnEtoI9TrR7NFlSEYtcpk8wru8NPwKM00Nm0YFYLi");

const Payment = () => {
  const [cart] = useCart();

   // calc pretul cosului
   const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
   const totalPrice = parseFloat(cartTotal.toFixed(2));
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-28">
      <Elements stripe={stripePromise}>
        <CheckoutForm price={totalPrice} cart={cart}/>
      </Elements>
    </div>
  );
};

export default Payment;
