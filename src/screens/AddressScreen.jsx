import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useSelector } from "react-redux";

export const AddressScreen = () => {
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const oldAddress = (e) => {
    e.preventDefault();
    navigate("/payment");
  };

  const newAddress = (e) => {
    e.preventDefault();
    navigate("/login?redirect=shipping");
  };

  const cancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const Continue = (e) => {
    e.preventDefault();
    navigate("/login?redirect=shipping");
  };

  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        {userInfo.shippingAddress.address === "vientaine" ? (
          <div className="Login3 col-md-8 col-lg-8 col-11">
            <h2>
              ເນື່ອງຈາກວ່າທ່ານຍັງເປັນສະມາຊິກໃໝ່ຢູ່ກະລຸນາລະບຸສະຖານທີ່ສົ່ງຂອງທ່ານ
            </h2>
            <button onClick={cancel} type="button" className="btn btn-danger">
              ຍົກເລີກ
            </button>
            <span>ຫຼື</span>
            <button
              onClick={Continue}
              type="button"
              className="btn btn-success"
            >
              ດຳເນີນການຕໍ່
            </button>
          </div>
        ) : (
          <div className="Login3 col-md-8 col-lg-4 col-11">
            <h2>ສະຖານທີ່ທີຢາກໃຫ້ສົ່ງ</h2>
            <button
              onClick={oldAddress}
              type="button"
              className="btn btn-warning"
            >
              ສົ່ງບ່ອນເກົ່າ
            </button>
            <span>ຫຼື</span>
            <button
              onClick={newAddress}
              type="button"
              className="btn btn-success"
            >
              ສົ່ງບ່ອນໃໝ່
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AddressScreen;
