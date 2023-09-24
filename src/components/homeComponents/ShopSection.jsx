import React, { Fragment, useEffect, useState } from "react";
import Rating from "./Rating";
// import Pagination from "./pagination";
// import Products from "../../data/Products";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { listProduct } from "../../Redux/Actions/ProductActions";
import Loading from "../loadingError/Loading";
import Message from "../loadingError/Error";
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { listCategories } from "../../Redux/Actions/CategoryActions";
import Pagination from "react-js-pagination"
import NumberFormat from "react-number-format";

// const categories = [
//   "ເສື້ອ",
//   "ເກີບ",
//   "ສະແອວ",
//   "ຄອມພິວເຕີ",
//   "ໂນດບຸກ",
//   "ກ້ອງ",
//   "ໂທລະສັບ",
//   "ເສື້ອ",
//   "ເກີບ",
//   "ສະແອວ",
//   "ຄອມພິວເຕີ",
//   "ໂນດບຸກ",
//   "ກ້ອງ",
//   "ໂທລະສັບ",
// ];

const ShopSection = (props) => {

  const { keyword, pagenumber } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const [category, setCategory] = useState("");
  // console.log(category)
  // const handleChange = (e) => {
  //   setCategory(e.target.value);
  // };
  // const submitdrh = (e) => {
  //   e.preventDefault();
  //   if (category) {
  //     navigate(`/search/${category}`);
  //   } else {
  //     navigate("/");
  //   }
  // };

  const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector(
    (state) => state.productList
  );

  const categoryList = useSelector((state) => state.categoryList )
  const {categories} = categoryList

  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
  }

  let count = filteredProductsCount

  useEffect(() => {
    if (categories) {
      dispatch(listCategories())
    }
    dispatch(listProduct(keyword, currentPage, category));
  }, [dispatch, keyword, currentPage, category]);

  // useEffect(() => {
  //   if (categories) {
  //     dispatch(listCategories())
  //   }
  //   dispatch(listProduct(keyword, pagenumber,category));
  // }, [dispatch, keyword, pagenumber,category]);

  return (
    <>
      <div className="product-container">
        <div className="container">
          <h2 className="productsHeading">ສິນຄ້າ</h2>

          <div className="content">
          <div className="chips-wrapper">
          {
            categories.map((category) => (
                <ul className="chip" key={category._id}>
                    <li onClick={() => setCategory(category.name) } >{category.name}</li>
                </ul>
                ))}
            </div>
          </div>

          <div className="section">
            <div className="row">
              <div className="col-lg-12 col-md-12 article">
                <div className="shopcontainer row">
                  {loading ? (
                    <div className="mb-5">
                      <Loading />
                    </div>
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
                      {products &&
                        products.map((product) => (
                          <div
                            className="shop col-lg-4 col-md-6 col-sm-6"
                            key={product._id}
                          >
                            <div className="border-product">
                              <Link to={`/products/${product._id}`}>
                                <div className="shopBack">
                                  <img src={product.image} alt={product.name}  />
                                </div>
                              </Link>

                              <div className="shoptext">
                                <p>
                                  <Link to={`/products/${product._id}`}>
                                    {product.name}
                                  </Link>
                                </p>

                                <Rating
                                  value={product.rating}
                                  text={`${product.numReviews} reviews`}
                                />
                                <h3>
                                  <NumberFormat
                                    value={product.price}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"₭"}
                                  />
                                  </h3>
                              </div>
                            </div>
                          </div>
                        ))}
                    </>
                  )}

                  {/* Pagination */}

                  {resultPerPage < count && (
                    <div className="paginationBox">
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={resultPerPage}
                      totalItemsCount={count}
                      onChange={setCurrentPageNo}
                      nextPageText="ໜ້າຕໍ່ໄປ"
                      prevPageText="ກັບໄປໜ້າເກົ່າ"
                      firstPageText="1st"
                      lastPageText="ສຸດທ້າຍ"
                      itemClass="page-item"
                      linkClass="page-link"
                      activeClass="pageItemActive"
                      activeLinkClass="pageLinkActive"
                    />
                  </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;
