import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = (props) => {
  const { data } = props;

  return (
    <>
      {data?.map((item) => (
        <div className="col mb-4" key={item?.id} style={{ cursor: "pointer" }}>
          <Link to={`/category/${item?.id}`} className="text-decoration-none">
            <div className="card bg-dark text-dark">
              <img src={item?.image} className="card-img" alt={item?.title} />
              <div className="card-img-overlay d-flex align-items-end">
                <h5 className="card-title">{item?.title}</h5>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default CategoryCard;
