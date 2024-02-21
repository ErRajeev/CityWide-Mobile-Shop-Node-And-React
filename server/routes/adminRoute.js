import { Router } from "express";
const router = Router();
import multer, { memoryStorage } from "multer";
import {
  isAdmin,
  AddProduct,
  AllUsers,
} from "../controller/AdminController.js";

const storage = memoryStorage();
const upload = multer({ storage: storage });

router
  .route("/admin/upload")
  .patch(isAdmin, upload.single("image"), AddProduct);
router.route("/admin/allusers").get(isAdmin, AllUsers);

export default router;
