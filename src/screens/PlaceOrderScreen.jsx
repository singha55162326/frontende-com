import React, { useEffect } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/loadingError/Error";
import { ORDER_CREATE_RESET } from "../Redux/Constants/OrderContants";
import { createOrder } from "../Redux/Actions/OrderActions";
import NumberFormat from "react-number-format";

const PlaceOrderScreen = () => {
  window.scrollTo(0, 0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Calculate Price
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100);
    // .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  cart.shippingPrice = addDecimals(cart.itemsPrice ? 10000 : 0);
  // cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) + Number(cart.shippingPrice)
  );

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [navigate, dispatch, success, order]);

  const placeOrderHandler = (e) => {
    // e.preventDefault();
    dispatch(
      createOrder({
        orderItems: cart.cartItems.map((item) => ({
          ...item,
          image: item.image[0], // Extract the first URL from the array
        })),
       
        shippingAddress: userInfo.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row order-detail">
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>ຂໍ້ມູນສະມາຊິກ</strong>
                </h5>
                <p>{userInfo.name}</p>
                <p>{userInfo.email}</p>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-truck-moving"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>ຂໍ້ມູນການສັ່ງຊື້</strong>
                </h5>
                <p>ເລກບັນຊີສະມາຊິກ: {userInfo.shippingAddress.country}</p>
                <p>ຊຳລະຜ່ານ: {cart.paymentMethod}</p>
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>ສະຖານທີ່ສົ່ງ</strong>
                </h5>
                <p>
                  ສະຖານທີ່: {userInfo.shippingAddress.city},{" "}
                  {userInfo.shippingAddress.address},{" "}
                  <p>
                    ເບີໂທ: {userInfo.shippingAddress.postalCode}
                  </p>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row order-products justify-content-between">
          <div className="col-lg-8">
            {cart.cartItems.length === 0 ? (
              <Message variant="alert-info mt-5">Your order iss empty</Message>
            ) : (
              <>
                {cart.cartItems.map((item, index) => (
                  <div className="order-product row" key={index}>
                    <div className="col-md-3 col-6">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="col-md-5 col-6 d-flex align-items-center">
                      <Link to={`/products/${item.product}`}>
                        <h6>{item.name}</h6>
                      </Link>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                      <h4>ຈຳນວນສິນຄ້າ</h4>
                      <h6>{item.qty}</h6>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                      <h4>ຍອດລວມ</h4>
                      <h6>
                        <NumberFormat
                          value={item.qty * item.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₭"}
                        />
                      </h6>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {/* TOTAL */}
          <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>
                    <strong>ສິນຄ້າລາຄາ</strong>
                  </td>
                  <td>
                    <NumberFormat
                      value={cart.itemsPrice}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₭"}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>ຄ່າສົ່ງ</strong>
                  </td>
                  <td>
                    <NumberFormat
                      value={cart.shippingPrice}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₭"}
                    />
                  </td>
                </tr>
                {/* <tr>
                  <td>
                    <strong>Tax</strong>
                  </td>
                  <td>₭{cart.taxPrice}</td>
                </tr> */}
                <tr>
                  <td>
                    <strong>ລວມ</strong>
                  </td>
                  <td>
                    <NumberFormat
                      value={cart.totalPrice}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₭"}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            {cart.cartItems.length === 0 ? null : (
              <button type="submit" onClick={placeOrderHandler}>
                ກົດເພື່ອຢືນຢັນ
              </button>
            )}

            {error && (
              <div className="my-3 col-12">
                <Message variant="alert-danger">{error}</Message>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;