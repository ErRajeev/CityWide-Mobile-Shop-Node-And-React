import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import { fetchProducts } from "../Slices/productsSlice";
import { ImSearch } from "react-icons/im";

const AllProducts = () => {
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((store) => store.products);

  const handleFilterChange = (e) => setFilter(e.target.value);

  const filterdProduct = data?.filter(
    (product) =>
      product?.brand.toLowerCase().includes(filter.toLowerCase()) ||
      product?.model.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    if (!data) {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="container text-center">
        <h1 style={{ color: "green" }}>Our Exclusive Products</h1>
      </div>
      <div className="container">
        <div className="input-group mb-4">
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
        <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center m-1">
          <ProductCard data={filterdProduct} />
        </div>
      </div>
    </>
  );
};

export default AllProducts;
