import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { savePaymentMethod } from "../Redux/Actions/cartActions";

const PaymentScreen = () => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    navigate("/login/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("BcelOne");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>ການຊຳລະເງິນ</h6>
          <div className="payment-container">
              <input
                type="text"
                placeholder="ຊຳລະະຜ່ານ"
                className="form-control"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
          </div>

          <button type="submit">ດຳເນີນການຕໍ່ໄປ</button>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
