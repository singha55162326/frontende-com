import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Message from "../components/loadingError/Error";
import Loading from "../components/loadingError/Loading";
import { login } from "./../Redux/Actions/userActions";

const Login = () => {
  window.scrollTo(0, 0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}
        <h2 className="loginHeading">ໜ້າລັອກອິນເພື່ອເຂົ້າສູ່ລະບົບ</h2>
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">ເຂົ້າສູ່ລະບົບ</button>
          <p>
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              ສະໝັກສະມາຊິກ
            </Link>
          </p>
        </form>
        <p className="pHeading1">
          ⚠️
          ໝາຍເຫດຜູ້ໃຊ້ງານທ່ານໃດເວລາຈະສັ່ງຊື້ສິນຄ້າແມ່ນຈະຕ້ອງໄດ້ລັອກອິນເຂົ້າສູ່ລະບົບ
          ຫຼື ສະໝັກເປັນສະມາຊິກກ່ອນ
        </p>
      </div>
    </>
  );
};

export default Login;
