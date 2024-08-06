import express from "express";
import { rzpPayment } from "../controllers/rzpController.js";

const router = express.Router();

router.post("/rzpPayment", rzpPayment);

export default router;
