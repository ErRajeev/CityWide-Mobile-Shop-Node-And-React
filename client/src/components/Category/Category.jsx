import React from "react";
import CategoryCard from "./CategoryCard/CategoryCard";

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
          <CategoryCard data={data} />
        </div>
      </div>
    </>
  );
};

export default Category;
