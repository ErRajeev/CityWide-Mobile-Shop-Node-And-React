import React from "react";
import { NavLink } from "react-router-dom";

import camera from "../../assets/Images/camera.jpg";
import accessoriesung from "../../assets/Images/accessories.jpg";
import laptop from "../../assets/Images/laptop.jpg";
import watch from "../../assets/Images/watch.jpg";
import bluetooth from "../../assets/Images/bluetooth.jpg";
import smartphone from "../../assets/Images/smartphone.jpg";

const Category = () => {
  const data = [
    {
      id: 1,
      image: camera,
      title: "Camera",
    },
    {
      id: 2,
      image: accessoriesung,
      title: "Accessories",
    },
    {
      id: 3,
      image: laptop,
      title: "Laptop",
    },
    {
      id: 4,
      image: watch,
      title: "Watch",
    },
    {
      id: 5,
      image: bluetooth,
      title: "Bluetooth",
    },
    {
      id: 6,
      image: smartphone,
      title: "Smartphone",
    },
  ];

  return (
    <>
      <div className="container my-5">
        <div className="text-center">
          <h1 style={{ fontSize: "3rem", color: "#ff4971" }}>Categories</h1>
          <h6 className="text-muted">Top Product Categories</h6>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
          {data?.map((item) => (
            <div
              className="col mb-4"
              key={item?.id}
              style={{ cursor: "pointer" }}
            >
              <NavLink to={`/allproducts`} className="text-decoration-none">
                <div className="card bg-dark text-dark">
                  <img
                    src={item?.image}
                    className="card-img"
                    alt={item?.title}
                  />
                  <div className="card-img-overlay d-flex align-items-end">
                    <h5 className="card-title">{item?.title}</h5>
                  </div>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;
