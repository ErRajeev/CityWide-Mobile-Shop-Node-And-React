import { Router } from "express";
const router = Router();
import {
  checkout,
  paymentVarification,
} from "../controller/PaymentController.js";

router.route("/checkout").post(checkout);
router.route("/paymentVarification").post(paymentVarification);

export default router;
