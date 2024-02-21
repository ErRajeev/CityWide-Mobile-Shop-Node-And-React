import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Slices/productsSlice";
import FeaturesCard from "./FeaturesCard/FeaturesCard";

const Features = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((store) => store.products);

  useEffect(() => {
    if (!data) {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error} </div>
      ) : (
        <div className="container my-5">
          <div className="text-center">
            <h6>Top sells on the week</h6>
            <h1 style={{ color: "#ff4971" }}>Features Products</h1>
            <p>
              Explore our handpicked selection of top-selling products for this
              week.
            </p>
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center m-1">
            <FeaturesCard data={data} />
          </div>
        </div>
      )}
    </>
  );
};

export default Features;
