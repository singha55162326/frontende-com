import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Email,
  LocationCity,
  Facebook,
  Instagram,
  Twitter,
} from "@mui/icons-material";
import Morzor from "../../public/images/logo/fns-logo.jpg";
import Payment from "../../public/images/logo/BECL.jpg";
import JDB from "../../public/images/logo/jdb.jpg";
import LDB from "../../public/images/logo/ldb.jpg";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-nav">
        <div className="container">
          <div className="footer-container">
            {" "}
            <div>
              <ul className="footer-nav-list">
                <li className="footer-nav-item">
                  <h2 className="nav-title">ສະໜັບສະໜູນໂດຍ</h2>
                </li>

                <li className="footer-nav-item">
                  <img src={Morzor} alt="fns" className="fns-img" />
                </li>
              </ul>
            </div>
            <div>
              <ul className="footer-nav-list">
                <li className="footer-nav-item">
                  <h2 className="nav-title">ທີ່ຢູ່ຕິດຕໍ່</h2>
                </li>

                <li className="footer-nav-item flex">
                  <div className="icon-box">
                    <LocationCity
                      style={{ color: "hsl(0, 0%, 47%)", width: "30px" }}
                    ></LocationCity>
                  </div>

                  <address className="content">
                    ບ້ານທ່າງອນ,ເມືອງໄຊທານີ,ນະຄອນຫຼວງວຽງຈັນ
                  </address>
                </li>

                <li className="footer-nav-item flex">
                  <div className="icon-box">
                    <Phone
                      style={{ color: "hsl(0, 0%, 47%)", width: "30px" }}
                    ></Phone>
                  </div>

                  <Link
                    to="#"
                    style={{ textDecoration: "none" }}
                    className="footer-nav-link"
                  >
                    +85620 93043691
                  </Link>
                </li>

                <li className="footer-nav-item flex">
                  <div className="icon-box">
                    <Email
                      style={{ color: "hsl(0, 0%, 47%)", width: "30px" }}
                    ></Email>
                  </div>

                  <Link
                    to="#"
                    style={{ textDecoration: "none" }}
                    className="footer-nav-link"
                  >
                    Example@Gmail.Com
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              {" "}
              <ul className="footer-nav-list">
                <li className="footer-nav-item">
                  <h2 className="nav-title">ຕິດຕາມພວກເຮົາໄດ້ທີ່</h2>
                </li>

                <li>
                  <ul className="social-link">
                    <li className="footer-nav-item">
                      <Link
                        to="#"
                        style={{ textDecoration: "none" }}
                        className="footer-nav-link"
                      >
                        <Facebook
                          style={{
                            borderRadius: "50%",
                          }}
                        ></Facebook>
                      </Link>
                    </li>
                  </ul>
                  <ul className="social-link">
                    <li className="footer-nav-item">
                      <Link
                        to="#"
                        style={{ textDecoration: "none" }}
                        className="footer-nav-link"
                      >
                        <Instagram
                          style={{
                            borderRadius: "50%",
                          }}
                        ></Instagram>
                      </Link>
                    </li>
                  </ul>
                  <ul className="social-link">
                    <li className="footer-nav-item">
                      <Link
                        to="#"
                        style={{ textDecoration: "none" }}
                        className="footer-nav-link"
                      >
                        <Twitter
                          style={{
                            borderRadius: "50%",
                          }}
                        ></Twitter>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          {/* <div className="pay-laos">
            
          </div> */}
          <img src={Payment} alt="payment method" className="payment-img" />
          <img src={JDB} alt="payment method" className="payment-img" />
          <img src={LDB} alt="payment method" className="payment-img" />

          <p className="copyright">
            Copyright &copy;{" "}
            <Link
              className="link-copyright"
              to="#"
              style={{ textDecoration: "none" }}
            >
              Singha
            </Link>{" "}
            all rights reserved.
          </p>
        </div>
      </div>
      {/* <div className="card-name">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/450px-MasterCard_Logo.svg.png?20140711182052"
            alt="mastercard"
          />
        </div>
        <div className="card-name">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
            alt="visa"
          />
        </div>
        <div className="card-name">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
            alt="paypal"
          />
        </div>
        <div className="card-name">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
            alt="express"
          />
        </div>
        <div className="card-name">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
            alt="discover"
          />
        </div> */}
    </div>
  );
};

export default Footer;
