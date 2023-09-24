import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Message from "../loadingError/Error";
import Loading from "../loadingError/Loading";
import NumberFormat from "react-number-format";

const Orders = (props) => {
  const { loading, error, orders } = props;
  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          {orders.length === 0 ? (
            <div className="col-12 alert alert-info text-center mt-3">
              ບໍ່ມີລາຍການທີ່ທ່ານໄດ້ສັ່ງຊື້
              <Link
                className="btn btn-success mx-2 px-3 py-2"
                to="/"
                style={{ fontSize: "12px" }}
              >
                ໄປທີ່ໜ້າສັ່ງຊື້ສິນຄ້າເລີຍ
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>ໄອດີ</th>
                    <th>ສະຖານະ</th>
                    <th>ວັນທີ</th>
                    <th>ລວມທັງໝົດ</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      className={`${
                        order.isPaid ? "alert-success" : "alert-danger"
                      }`}
                      key={order._id}
                    >
                      <td>
                        <Link to={`/order/${order._id}`} className="link">
                          {order._id}
                        </Link>
                      </td>
                      <td>
                        {order.isPaid ? <>ຈ່າຍເງິນແລ້ວ</> : <>ຍັງບໍ່ທັນຈ່າຍ</>}
                      </td>
                      <td>
                        {order.isPaid
                          ? moment(order.paidAt).calendar()
                          : moment(order.createdAt).calendar()}
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
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
