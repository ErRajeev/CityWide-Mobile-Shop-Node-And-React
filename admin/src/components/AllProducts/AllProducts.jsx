import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ImSearch } from "react-icons/im";
import { fetchProducts } from "../slices/productsSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Utils/axiosInstance ";

const AllProducts = () => {
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFilterChange = (e) => setFilter(e.target.value);

  const { data, isLoading, error } = useSelector((store) => store.products);

  const updateProduct = (id) => {
    navigate(`/admin/updateProduct/${id}`);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Do you want to remove the user?")) {
      return;
    }
    try {
      const response = await axiosInstance.delete(`/deleteProduct/${id}`);
      if (response.status === 204) {
        // console.log("Product Delete Success");
        dispatch(fetchProducts());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterdProducts = data?.filter(
    (product) =>
      product.brand.toLowerCase().includes(filter.toLowerCase()) ||
      product.model.toLowerCase().includes(filter.toLowerCase())
  );
  useEffect(() => {
    if (!data) {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="justify-content-center m-auto">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="container mt-2">
        <h2 className="text-primary">Products</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Brand name or Model..."
            value={filter}
            onChange={handleFilterChange}
          />
          <button className="btn btn-primary p-0 m-0">
            <span className="input-group-text" id="basic-addon2">
              <i className="bi bi-search">
                <ImSearch />
              </i>
            </span>
          </button>
        </div>
        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center m-1">
            {filterdProducts?.length > 0 ? (
              filterdProducts?.map((item) => (
                <div className="col" key={item?._id}>
                  <div className="card">
                    <div className="d-flex justify-content-center">
                      <img
                        style={{
                          maxWidth: "50%",
                        }}
                        src={`data:${
                          item?.img?.contentType
                        };base64,${item?.image?.data?.toString("base64")}`}
                        className="card-img-top mt-1 "
                        alt="..."
                        onError={(e) => {
                          e.target.src = "your_placeholder_image_url";
                        }}
                      />
                    </div>
                    <div className="card-body">
                      <h3 className="card-title">{item?.brand}</h3>
                      <h5 className="card-text">
                        <strong style={{ color: "#3b8f3f" }}>
                          ₹ {item?.price}
                        </strong>{" "}
                        /-
                      </h5>
                      <ul>
                        <li className="card-text">Model {item?.model}</li>
                        <li className="card-text">Ram {item?.ram} GB</li>
                        <li className="card-text">
                          Storage {item?.storage} GB
                        </li>
                        <li className="card-text">Screen {item?.screen}</li>
                      </ul>
                      <button
                        className="btn btn-success"
                        onClick={() => updateProduct(item?._id)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteProduct(item?._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">
                <p className="fs-4">
                  <strong>No product found</strong>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
