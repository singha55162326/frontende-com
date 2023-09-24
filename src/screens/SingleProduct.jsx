import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Rating from "../components/homeComponents/Rating";
import Message from "../components/loadingError/Error";
import Loading from "../components/loadingError/Loading";
import {
  createProductReview,
  listProductDetails,
} from "../Redux/Actions/ProductActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../Redux/Constants/ProductConstants";
import moment from "moment";

import NumberFormat from "react-number-format";

// axios.defaults.baseURL = "http://localhost:5000";

const SingleProduct = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  let params = useParams();
  let navigate = useNavigate();
  const productId = params.id;
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingCreateReview,
    error: errorCreateReview,
    success: successCreateReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successCreateReview) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(productId));
  }, [dispatch, productId, successCreateReview]);

  const AddToCartHandle = (e) => {
    e.preventDefault();
    navigate(`/cart/${productId}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(productId, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Header />
      <div className="container single-product">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row">
              <div className="col-md-6">
                <div className="single-image">
                  <img src={product.image} alt={product.name} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="product-dtl">
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                  </div>
                  <p>{product.description}</p>

                  <div className="product-count col-lg-7 ">
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>ລາຄາ</h6>
                      <span><NumberFormat
                              value={product.price}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"₭"}
                      /></span>
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>ສະຖານະ</h6>
                      {product.countInStock > 0 ? (
                        <span>ມີສິນຄ້າໃນສາງ</span>
                      ) : (
                        <span>ເຄື່ອງໝົດ</span>
                      )}
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>ຄະແນນລີວິວ</h6>
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                    </div>
                    {product.countInStock > 0 ? (
                      <>
                        <div className="flex-box d-flex justify-content-between align-items-center">
                          <h6>Quantity</h6>
                          <select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <button
                          onClick={AddToCartHandle}
                          className="round-black-btn"
                        >
                          ເພີ່ມໃສ່ກະຕ່າ
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* RATING */}
            <div className="row my-5">
              <div className="col-md-6">
                <h6 className="mb-3">ຄວາມຄິດເຫັນຂອງລູກຄ້າທ່ານອື່ນ</h6>
                {product.reviews.length === 0 && (
                  <Message variant={"alert-info mt-3"}>
                    ສິນຄ້ານີ້ຍັງບໍ່ມີລູກຄ້າທ່ານອື່ນໃຫ້ຄວາມຄິດເຫັນ
                  </Message>
                )}
                {product.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                  >
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <span>{moment(review.createdAt).calendar()}</span>
                    <div className="alert alert-info mt-3">
                      {review.comment}
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-md-6">
                <h6>ຮ່ວມສະແດງຄວາມຄິດເຫັນຂອງລູກຄ້າ</h6>
                <div className="my-4">
                  {loadingCreateReview && <Loading />}
                  {errorCreateReview && (
                    <Message variant="alert-danger">
                      {errorCreateReview}
                    </Message>
                  )}
                </div>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <div className="my-4">
                      <strong>ຄະແນນ</strong>
                      <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="col-12 bg-light p-3 mt-2 border-0 rounded"
                      >
                        <option value="">ເລືອກ...</option>
                        <option value="1">1 - ຕ່ຳ</option>
                        <option value="2">2 - ປານກາງ</option>
                        <option value="3">3 - ດີ</option>
                        <option value="4">4 - ດີຫຼາຍ</option>
                        <option value="5">5 - ສຸດຍອດ</option>
                      </select>
                    </div>
                    <div className="my-4">
                      <strong>ຄວາມຄິດເຫັນ</strong>
                      <textarea
                        rows="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="col-12 bg-light p-3 mt-2 border-0 rounded"
                      ></textarea>
                    </div>
                    <div className="my-3">
                      <button
                        disabled={loadingCreateReview}
                        className="col-12 bg-black border-0 p-3 rounded text-white"
                      >
                        ສົ່ງ
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="my-3">
                    <Message variant={"alert-warning"}>
                      ກະລູນາ{" "}
                      <Link to="/login">
                        " <strong>ລັອກອິນເພື່ອເຂົ້າສູ່ລະບົບ</strong> "
                      </Link>{" "}
                      ເພື່ອສະແດງຄວາມຄິດເຫັນຂອງທ່ານ{" "}
                    </Message>
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

export default SingleProduct;
