import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/loadingError/Loading";
import Toast from "../components/loadingError/Toast";
import { saveShippingAddress } from "../Redux/Actions/cartActions";
import {
  getUserDetails,
  updateUserAddress,
} from "../Redux/Actions/userActions";
import { toast } from "react-toastify";
import Message from "../components/loadingError/Error";

const ShippingScreen = () => {
  window.scrollTo(0, 0);

  const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateAddress = useSelector((state) => state.userUpdateAddress);
  const { loading: updateLoading } = userUpdateAddress;

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [canPress, setCanPress] = useState(false);
  const toastId = React.useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user) {
  //     setAddress(user.shippingAddress.address);
  //     setCity(user.shippingAddress.city);
  //     setPostalCode(user.shippingAddress.postalCode);
  //     setCountry(user.shippingAddress.country);
  //   }
  // }, [dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  const editAddress = (e) => {
    e.preventDefault();
    // UPDATE PROFILE
    dispatch(
      updateUserAddress({
        id: user._id,
        shippingAddress: { address, city, postalCode, country },
      })
    );
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.success(
        "ລະບຸສະຖານທີ່ສົ່ງຮຽບຮ້ອຍແລ້ວ",
        Toastobjects
      );
      setCanPress(true);
    }
  };

  useEffect(() => {
    dispatch(getUserDetails("profile"));
  }, [dispatch]);

  return (
    <>
      <Toast />
      <Header />
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />}
      {updateLoading && <Loading />}
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login4 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>ປ້ອນຂໍ້ມູນທີ່ຢູ່ຂອງທ່ານ</h6>
          <input
            type="text"
            placeholder="ແຂວງ?"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="ເມືອງ?"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="ເບີໂທລະສັບ"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <input
            type="text"
            placeholder="ເລກບັນຊີຂອງທ່ານ"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          />
          <button className="btn btn-info" type="button" onClick={editAddress}>
            ຢືນຢັນສະຖານທີ່ໄຫ້ສົ່ງ
          </button>
          {canPress ? (
            <button className="btn btn-success" type="submit">
              ດຳເນີນການຕໍ່ໄປ
            </button>
          ) : (
            <button disabled className="btn btn-secondary" type="submit">
              ດຳເນີນການຕໍ່ໄປ
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
