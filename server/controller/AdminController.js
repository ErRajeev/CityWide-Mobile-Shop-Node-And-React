import Products from "../model/productModel.js";
import User from "../model/userModel.js";

export const isAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(email, password);
  if (email === "er.rajeev.mca@gmail.com" && password === "R@jeevoo7") {
    // console.log("if");
    return res.redirect("/admin");
  } else {
    // console.log("Else");
    next();
  }
};

export const AddProduct = async (req, res) => {
  try {
    const {
      title,
      brand,
      model,
      price,
      camera,
      ram,
      processor,
      screen,
      storage,
      color,
      about,
      quantity,
    } = req.body;
    const imgBuffer = req?.file?.buffer;
    const imgContentType = req?.file?.mimetype;

    // console.log("Received Data:", req?.file?.buffer);

    const newProduct = new Products({
      title,
      brand,
      model,
      price,
      ram,
      processor,
      camera,
      screen,
      storage,
      color,
      about,
      image: {
        data: imgBuffer,
        contentType: imgContentType,
      },
      quantity,
    });

    const isUploaded = await newProduct.save();
    if (isUploaded) {
      res.status(201).json({ message: "Image uploaded successfully" });
    } else {
      res.status(400).json({ error: "Somthing went Wrong" });
    }
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const AllUsers = async (req, res) => {
  try {
    const response = await User.find();
    // console.log(response);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
