import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  createCheckoutSession,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
router.get("/get-product", getProductController);
router.get("/get-product/:slug", getSingleProductController);

router.get("/product-photo/:pid", productPhotoController);

router.delete("/delete-product/:pid", deleteProductController);
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);
router.post("/product-filter", productFiltersController);
router.get("/product-count", productCountController);
router.get("/product-list/:page", productListController);
router.get("/search/:keyword", searchController);
router.get("/related-product/:pid/:cid", relatedProductController);
//caterory wise product
router.get("/product-category/:slug", productCategoryController);
//PAYMENT
//TOKEN
// router.get("/braintree/token", barinTreeController);
// router.post("/braintree/payment", requireSignIn, brainTreePaymentController);
router.post("/create-checkout-session", requireSignIn, createCheckoutSession);

export default router;
