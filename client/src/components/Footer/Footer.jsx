import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <hr />
      <div className="footer-main p-4" style={{ color: "rgb(52, 2, 13)" }}>
        <footer className="site-footer">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <h2 style={{ color: "#ff4971" }}>About</h2>
                <p className="text-justify">
                  Discover a world of innovation at CityWide IT Solution. Your
                  go-to destination for the latest smartphones, accessories, and
                  expert recommendations. We offer a seamless online shopping
                  experience with secure payment options and reliable delivery
                  services.
                  <br />
                  <i>
                    {" "}
                    Order online and enjoy a seamless shopping experience with
                    our secure payment options and reliable delivery services.
                    CityWide IT Solution - Your destination for quality and
                    innovation.
                  </i>
                </p>
              </div>

              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-4">
                    <h6>Categories</h6>
                    <ul className="footer-links">
                      <li>
                        <a href="/">Home</a>
                      </li>
                      <li>
                        <a href="/category1">Smartphones</a>
                      </li>
                      <li>
                        <a href="/category2">Accessories</a>
                      </li>
                      <li>
                        <a href="/category3">Deals</a>
                      </li>
                      <li>
                        <a href="/category4">More</a>
                      </li>
                    </ul>
                  </div>

                  <div className="col-md-4">
                    <h6>Quick Links</h6>
                    <ul className="footer-links">
                      <li>
                        <a href="/about">About Us</a>
                      </li>
                      <li>
                        <a href="/contact">Contact Us</a>
                      </li>
                      <li>
                        <a href="/contribute">Contribute</a>
                      </li>
                      <li>
                        <a href="/privacy">Privacy Policy</a>
                      </li>
                    </ul>
                  </div>

                  <div className="col-md-4">
                    <h6>Follow Us</h6>
                    <ul className="footer-social-icons">
                      <li>
                        <a
                          href="https://www.facebook.com/er.rajeev.mca"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Facebook"
                        >
                          <FaFacebook />
                          <span className="ms-1">Facebook</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://twitter.com/ErRajeev_Ranjan"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Twitter"
                        >
                          <BsTwitterX />
                          <span className="ms-1">Twitter</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.instagram.com/er.rajeev.mca/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Instagram"
                        >
                          <FaInstagram />
                          <span className="ms-1">Instagram</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <p className="copyright-text">
                  Copyright &copy; 2022 All Rights Reserved by{" "}
                  <span>
                    <strong>Rajeev Ranjan</strong>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
