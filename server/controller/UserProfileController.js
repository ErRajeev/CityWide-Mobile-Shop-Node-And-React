import User from "../model/userModel.js";

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, gender, age, mobile, dob, pincode, address } =
      await User.findById({ _id: id });
    const userDate = {
      name,
      email,
      gender,
      age,
      mobile,
      dob,
      pincode,
      address,
    };
    if (userDate) {
      res.status(200).json(userDate);
    } else {
      res.status(404).json({ message: "User Profile not found !!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, gender, mobile, age, dob, pincode, address } =
      req.body;

    const updateUser = await User.findByIdAndUpdate(
      id,
      { name, email, age, mobile, gender, dob, pincode, address },
      { new: true }
    );

    if (updateUser) {
      res.status(200).json({ message: "Profile Updated successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getUserById, updateUser };
