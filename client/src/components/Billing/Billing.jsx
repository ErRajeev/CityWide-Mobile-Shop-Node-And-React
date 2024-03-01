import React, { useEffect, useState, useContext } from "react";
import { authContext } from "../Authentication/context/AuthenticationProvider";
import Address from "../Address/Address";
import axiosInstance from "../../Utils/axiosInstance";

const Billing = () => {
  const [user, setUser] = useState({});
  const [productDetails, setProductDetails] = useState([]);

  const authState = useContext(authContext);
  const userId = authState.id;
  const amount = productDetails.allProductCost;

  const getUserHandle = async () => {
    try {
      const response = await axiosInstance.get(`/profile/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCartDetails = async () => {
    try {
      const response = await axiosInstance.get(`/getCardDetails/${userId}`);
      // console.log(response.data);
      setProductDetails(response.data);
      // setAllProductCost(response.data.allProductCost);
    } catch (error) {
      console.error("Error fetching cart details:", error);
    }
  };

  const checkoutHandler = async () => {
    try {
      const {
        data: { key },
      } = await axiosInstance.get("/getkey");
      const {
        data: { order },
      } = await axiosInstance.post("/checkout", {
        userId,
        amount,
        productDetails,
      });

      const options = {
        key: key,
        amount: order.amount,
        currency: "INR",
        name: "Payment Gateway",
        description: "Test Transaction",
        image: "https://avatars.githubusercontent.com/u/86796998?v=4",
        order_id: order.id,
        callback_url: "http://localhost:5000/paymentVarification",
        prefill: {
          name: `${user?.name}`,
          email: `${user?.email}`,
          contact: `${user?.mobile ?? 9999999999}`,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartDetails();
    getUserHandle();
  }, []);

  return (
    <div>
      <div className="container mt-5 p-2 rounded">
        <h3 className="mb-4 p-3 rounded" style={{ backgroundColor: "#2874f0" }}>
          Order Summary
        </h3>
        <div className="row d-flex">
          <hr />
          <Address />
          <div className="col-md-4 mt-5">
            <div className="mt-2">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title">Price details</h2>
                  <hr />
                  <p className="card-text">Delivery Charges ₹ 49</p>
                  <p className="card-text">
                    Discount{" "}
                    <span className="text-decoration-line-through">49</span>{" "}
                    <span style={{ color: "#3b8f3f" }}>Free</span>
                  </p>
                  <h5 className="card-text">
                    <strong>Total ₹ {amount}/-</strong>
                  </h5>
                  <p style={{ color: "#3b8f3f" }}>
                    You will save ₹ 49 on this order
                  </p>
                  <button className="btn btn-success" onClick={checkoutHandler}>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
