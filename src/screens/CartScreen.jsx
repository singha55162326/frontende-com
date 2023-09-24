import React, { useEffect } from "react";
import Header from "../components/Header";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removefromcart } from "../Redux/Actions/cartActions";
import NumberFormat from "react-number-format";
import { getUserDetails } from "../Redux/Actions/userActions";
const CartScreen = () => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const productId = params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0);

  useEffect(() => {
    dispatch(getUserDetails("profile"));
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const checkOutHandler = () => {
    if (user.shippingAddress.address === "vientaine") {
      navigate("/login?redirect=shipping");
    } else {
      navigate("/login/chooseAddress");
    }
  };

  const checkOutHandler1 = () => {
    navigate("/login?redirect=chooseAddress");
  };

  const removeFromCartHandler = (id) => {
    dispatch(removefromcart(id));
  };
  return (
    <>
      <Header />
      {/* Cart */}
      <div className="container">
        {cartItems.length === 0 ? (
          <div className="alert alert-info text-center mt-3">
            ທ່ານຍັງບໍ່ມີລາຍການສິນຄ້າ
            <Link
              className="btn btn-success mx-5 px-5 py-3"
              to="/"
              style={{ fontSize: "12px" }}
            >
              ໄປທີ່ໜ້າເລືອກຊື້ສິນຄ້າກ່ອນ
            </Link>
          </div>
        ) : (
          <>
            <div className="alert alert-info text-center mt-3">
              ຈຳນວນສິນຄ້າ
              <Link className="text-success mx-2" to="/cart">
                ({cartItems.length})
              </Link>
            </div>

            {/* cartitem */}
            {cartItems.map((item) => (
              <div className="cart-iterm row">
                <div
                  onClick={() => removeFromCartHandler(item.product)}
                  className="remove-button d-flex justify-content-center align-items-center"
                >
                  <i className="fas fa-times"></i>
                </div>
                <div className="cart-image col-md-3">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-text col-md-5 d-flex align-items-center">
                  <Link to={`/products/${item.product}`}>
                    <h4>{item.name}</h4>
                  </Link>
                </div>
                <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                  <h6>ຈຳນວນ</h6>
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, Number(e.target.value)))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                  <h6>ລາຄາ</h6>
                  <h4>
                    <NumberFormat
                      value={item.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₭"}
                    />
                  </h4>
                </div>
              </div>
            ))}

            {/* End of cart items */}
            <div className="total">
              <span className="sub">ລວມລາຄາທັງໝົດ:</span>
              {/* <span className="total-price">₭{total}</span> */}
              <span className="total-price">
                <NumberFormat
                  value={total}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₭"}
                />
              </span>
            </div>
            <hr />
            <div className="cart-buttons d-flex align-items-center row">
              <Link to="/" className="col-md-6">
                <button>ເລືອກຊື້ສິນຄ້າຕໍ່</button>
              </Link>
              {total > 0 && user ? (
                <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                  <button onClick={checkOutHandler}>ຢືນຢັນ</button>
                </div>
              ) : (
                <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                  <button onClick={checkOutHandler1}>ຢືນຢັນ</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartScreen;
