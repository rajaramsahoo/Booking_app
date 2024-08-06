import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => (total = total + item.price));
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await axios.post(
          "/api/v1/product/create-checkout-session",
          { cart }
        );
        setClientSecret(response.data.clientSecret);
        console.log(clientSecret);
      } catch (error) {
        console.error("Failed to fetch client secret:", error);
      }
    };

    fetchClientSecret();
  }, [cart]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const stripe = await loadStripe(
      "pk_test_51P5FbaSEkOCsBxpdE2xt7pM7E4IIungHflv0n8c52zPBROsmRdmjCF4F8ImvMiVkU05ux9xuB8nUxANLN7z2leCI005zeSU5c1"
    );
    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: "",
        },
      }
    );

    if (error) {
      setError(error.message);
    } else {
      console.log("Payment successful:", paymentIntent);
      // Handle successful payment
    }
  };

  //rzpinstance window
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  //default url for razorpay script is "https://checkout.razorpay.com/v1/checkout.js"
  const displayRazorpay = async (orderDetails) => {
    const response = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!response) {
      console.log("Failed to load razorpay window, try again");
      return
    }

    // creating a new order
    const result = await axios.post("/api/v1/payment/rzpPayment",);
    console.log(result)
    if (!result) {
      console.log("No response from server, try again");
      return
    }

    const {amount, id: order_id, currency} = result.data;
console.log(amount,order_id,currency)

    const options = {
      key: process.env.REACT_APP, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Soumya Corp.",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
          const data = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
          };

          const result = await axios.post("http://localhost:5000/payment/success", data);

          alert(result.data.msg);
      },
      prefill: {
          name: "Soumya Dey",
          email: "SoumyaDey@example.com",
          contact: "9999999999",
      },
      notes: {
          address: "Soumya Dey Corporate Office",
      },
      theme: {
          color: "#61dafb",
      },
  };

  const paymentObject = new window.Razorpay(options);
  console.log("raja")
  paymentObject.open();
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length > 1
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "Please Login to checkout"
                  }`
                : "Your cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 p-2 card flex-row" key={p._id}>
                <div className="col-md-4">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    // className="product-img"
                    alt={p.name}
                    style={{
                      height: "100px",
                      width: "100px",
                      //   border: "1px solid grey",
                    }}
                  />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  {/* <p>Price : {p.price}</p> */}
                  <pre>Price : {p.price}</pre>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summery</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total :{totalPrice()}</h4>
            {auth?.user?.adddress ? (
              <div className="mb-3">
                <h4>Current Address</h4>
                <h5>{auth?.user?.adddress}</h5>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              </div>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Log To CheckOut
                  </button>
                )}
              </div>
            )}
            {/* <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: { flow: "vault" },
                    }}
                    onInstance={(instance) => setInstence(instance)}
                  />
                  <button
                    className="btn btn-primary mb-2"
                    onClick={handlePayment}
                    disabled={!instance || !auth?.user?.address || loading}
                  >
                    {loading ? "Processing.............." : "Make Payment"}
                  </button>
                </>
              )}
            </div> */}
            <div className="mt-2">
              {!cart?.length ? (
                ""
              ) : (
                <button
                  className="btn btn-primary mb-2"
                  onClick={displayRazorpay}
                  disabled={!auth?.user}
                >
                  make payment
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
