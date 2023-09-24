import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, payOrder } from "../Redux/Actions/OrderActions";
import Loading from "../components/loadingError/Loading";
import Message from "../components/loadingError/Error";
import moment from "moment";
import { ORDER_PAY_RESET } from "../Redux/Constants/OrderContants";
import qrCode from "../../public/images/Qr.png"

import { Box, Button, Typography, Modal, Checkbox } from "@mui/material";

import NumberFormat from "react-number-format";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const OrderScreen = () => {
  window.scrollTo(0, 0);
  const [open, setOpen] = React.useState(false);
  const [confirm, setConfirm] = useState(false);
  // const confirmCheckBox = () => setConfirm(true);
  const confirmCheckBox = () => {
    setConfirm(true)
    setOpen(false)
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [sdkReady, setSdkReady] = useState(false);
  const params = useParams();
  const orderId = params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading) {
    // Calculate Price
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100);
      // .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );

    order.shippingPrice = addDecimals(order.itemsPrice ? 10000 : 0);

    order.totalPrice = (
      Number(order.itemsPrice) + Number(order.shippingPrice)
    );
  }

  useEffect(() => {
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else {
      setSdkReady(true);
    }
  }, [dispatch, orderId, successPay, order]);

  const successPaymentHandler = () => {
    dispatch(payOrder(orderId));
  };

  return (
    <>
      <Header />
      <div className="container">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
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
                    <p>{order.user.name}</p>
                    <p>
                      <a href={`mailto:${order.user.email}`}>
                        {order.user.email}
                      </a>
                    </p>
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
                    <p>ເລກບັນຊີສະມາຊິກ: {order.shippingAddress.country}</p>
                    <p>ຊຳລະຜ່ານ: {order.paymentMethod}</p>
                    {order.isPaid ? (
                      <div className="bg-info p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          ຈ່າຍເມື່ອວັນທີ່ {moment(order.paidAt).calendar()}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-danger p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          ຍັງບໍ່ທັນໄດ້ທຳການຊຳລະເງິນ
                        </p>
                      </div>
                    )}
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
                      ສະຖານທີ່: {order.shippingAddress.city},{" "}
                      {order.shippingAddress.address},{" "}
                      <p>ເບີໂທ: {order.shippingAddress.postalCode}</p>
                    </p>
                    {order.isDelivered ? (
                      <div className="bg-info p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          ກຳລັງຈັດສົ່ງໃນວັນທີ່{" "}
                          {moment(order.deliveredAt).calendar()}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-danger p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          ຍັງບໍ່ທັນໄດ້ທຳການຈັດສົ່ງ
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row order-products justify-content-between">
              <div className="col-lg-8">
                {order.orderItems.length === 0 ? (
                  <Message variant="alert-info mt-5">
                    ທ່ານຍັງບໍ່ມີລາຍການສັ່ງຊື້ສິນຄ້າ
                  </Message>
                ) : (
                  <>
                    {order.orderItems.map((item, index) => (
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
                          value={order.itemsPrice}
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
                          value={order.shippingPrice}
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
                          value={order.totalPrice}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₭"}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                {!order.isPaid && (
                  <div className="col-12">
                    {loadingPay && <Loading />}
                    <button className="bg-danger" onClick={handleOpen}>
                      ຊຳລະເງິນ
                    </button>
                    <Modal
                      style={{
                        textAlign: "center",
                      }}
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          ຊຳລະເງິນຜ່ານ
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <p>160-12-00-01560138-001</p>
                          <img src={qrCode} alt="QrCode" /> <br/>
                          <Button  onClick={confirmCheckBox} variant="contained" color="success" >ກົດເພື່ອຢືນຢັນການຊຳລະເງິນ</Button>
                        </Typography>
                      </Box>
                    </Modal>{" "}
                    <br />
                    { confirm ? (
                      <button type="submit" onClick={successPaymentHandler}>
                      ຢືນຢັນການຊຳລະເງິນ
                    </button>
                    ) : (
                      <button className="btn btn-secondary" disabled type="submit">
                      ຢືນຢັນການຊຳລະເງິນ
                    </button>
                    ) }
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderScreen;
