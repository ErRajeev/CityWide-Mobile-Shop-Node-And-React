import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../Authentication/context/AuthenticationProvider";
import axiosInstance from "../../Utils/axiosInstance";

const Address = () => {
  const [data, setData] = useState({});
  const authState = useContext(authContext);

  const getUserData = async () => {
    try {
      const response = await axiosInstance.get(`/profile/${authState.id}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const Billing = () => {
    // Billing logic goes here
    console.log("Billing function is called");
  };

  useEffect(() => {
    getUserData();
  }, [authState.id]);

  return (
    <>
      <div className="col-md-6">
        <div className="my-5">
          <h2 className="mb-3">Your Shipping Address</h2>
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">{data?.name}</h4>
              <p className="card-text">
                <strong>Email:</strong> {data?.email}
              </p>
              <p className="card-text">
                <strong>Mobile:</strong> {data?.mobile}
              </p>
              <p className="card-text">
                <strong>Pin Code:</strong> {data?.pincode}
              </p>
              <p className="card-text">
                <strong>Address:</strong> {data?.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Address;
