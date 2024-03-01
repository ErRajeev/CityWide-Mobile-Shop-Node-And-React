import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../Authentication/context/AuthenticationProvider";
import axiosInstance from "../../Utils/axiosInstance";

const Orders = () => {
  const [orders, setOrders] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id: userId } = useContext(authContext);

  const navigate = useNavigate();

  const getOrders = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/orders/${userId}`);
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
    } finally {
      setLoading(false);
    }
  };

  const getProductDetails = async (productId) => {
    if (!productId) {
      return;
    }
    try {
      const response = await axiosInstance.get(`/product/${productId}`);
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

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (orders === 0) {
    return (
      <>
        <div className="jumbotron text-center mt-5">
          <h1>No Orders Yet</h1>
          <h5>You haven't made any orders yet.</h5>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/allproducts")}
          >
            Shopp Now
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8">
            <h2 className="mb-4">Products</h2>
            <div className="row">
              {products.map((product, index) => (
                <div key={index} className="col-md-6 col-lg-4 mb-4">
                  <div className="card h-100 shadow-sm">
                    <img
                      src={`data:${
                        product?.image?.contentType
                      };base64,${product?.image?.data?.toString("base64")}`}
                      alt={`Product: ${product?.title}`}
                      className="card-img-top"
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{product?.model}</h5>
                      <p className="card-text">Price: {product?.price}</p>
                      <NavLink
                        to={`/Product/${product?._id}`}
                        className="btn btn-primary mt-auto"
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
            <div className="card shadow">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Order ID:</strong> {orders?.orderId}
                </li>
                <li className="list-group-item">
                  <strong>Payment ID:</strong> {orders?.paymentId}
                </li>
                <li className="list-group-item">
                  <strong>Total Pay Amount:</strong>{" "}
                  <span className="text-primary">
                    ₹{orders?.allProductCost}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
