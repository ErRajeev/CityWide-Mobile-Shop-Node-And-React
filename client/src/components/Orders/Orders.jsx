import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { authContext } from "../Authentication/context/AuthenticationProvider";

const Orders = () => {
  const [orders, setOrders] = useState(null);
  const [products, setProducts] = useState([]);

  const { id: userId } = useContext(authContext);

  const getOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/orders/${userId}`
      );
      if (response.data === 0) {
        setOrders(0);
      } else {
        setOrders(response.data);
        const cartProducts = response?.data?.cartProducts;
        cartProducts.forEach((product) => {
          getProductDetails(product.productId);
        });
        // console.log(products);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getProductDetails = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/product/${productId}`
      );
      setProducts((prevProducts) => {
        const productExists = prevProducts.some(
          (product) => product._id === response.data._id
        );
        return productExists ? prevProducts : [...prevProducts, response.data];
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, [userId]);

  return (
    <div className="container mt-5">
      {orders === 0 ? (
        <div className="jumbotron text-center">
          <h1>No Orders Yet</h1>
          <p>You haven&apos;t made any orders yet.</p>
        </div>
      ) : !orders ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            <h2 className="mb-4">Products</h2>
            <div className="row g-3">
              {products.map((product, index) => (
                <div key={index} className="col-md-6 col-lg-4">
                  <div className="card">
                    <img
                      src={`data:${
                        product?.image?.contentType
                      };base64,${product?.image?.data?.toString("base64")}`}
                      alt={`Product: ${product?.title}`}
                      className="rounded mx-auto d-block mt-2"
                      style={{
                        maxWidth: "55%",
                      }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{product?.model}</h5>
                      <p className="card-title">Price: {product?.price}</p>
                      <NavLink
                        to={`http://localhost:5173/Product/${product?._id}`}
                        className="btn btn-primary mt-2 align-self-start"
                      >
                        View Product
                      </NavLink>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-4">
            <h2 className="mb-4">Order Summary</h2>
            <div className="card">
              <h6 className="list-group-item">
                <strong>Order ID:</strong> {orders?.orderId}
              </h6>
              <h6 className="list-group-item">
                <strong>Payment ID:</strong> {orders?.paymentId}
              </h6>
              <h5 className="list-group-item">
                <strong>Total Pay Amount:</strong>{" "}
                <span className="primary">₹{orders?.allProductCost}</span>
              </h5>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
