import { Schema, model } from "mongoose";

const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    default: 9999999999,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  dob: {
    type: Date,
  },
  pincode: {
    type: Number,
  },
  address: {
    type: String,
  },
  role: {
    type: Number,
    default: 0,
  },
});

const User = model("User", userSchema);
export default User;
