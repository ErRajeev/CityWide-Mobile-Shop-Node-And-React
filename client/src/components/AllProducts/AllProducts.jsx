import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FeaturesCard from "../Features/FeaturesCard/FeaturesCard";
import { fetchProducts } from "../Slices/productsSlice";

const AllProducts = () => {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((store) => store.products);

  useEffect(() => {
    if (!data) {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  return (
    <>
      <div className="container text-center">
        <h1 style={{ color: "green" }}>Our Exclusive Products</h1>
      </div>
      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-danger">Error loading data</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center m-1">
            <FeaturesCard data={data} />
          </div>
        )}
      </div>
    </>
  );
};

export default AllProducts;
