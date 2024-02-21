import React from "react";
import Carousel from "../Carousel/Carousel";
import Icons from "../Icons/Icons";
import Category from "../Category/Category";
import HomeBody from "../Features/Features";
import Footer from "../Footer/Footer";

const Home = () => {
  return (
    <>
      <Carousel />
      <Icons />
      <Category />
      <HomeBody />
      <Footer />
    </>
  );
};
export default Home;
