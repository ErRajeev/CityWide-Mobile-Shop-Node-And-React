import { Router } from "express";
const router = Router();
import { getAllProducts, getProduct } from "../controller/ProductController.js";

router.route("/products").get(getAllProducts);
router.route("/product/:id").get(getProduct);

export default router;
