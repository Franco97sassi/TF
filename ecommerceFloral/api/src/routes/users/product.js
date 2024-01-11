const { Router } = require("express");
const router = Router();
const { createProduct, createColor,createCategory ,getAllCategories, getAllColors, getAllProducts, createSnack, getSnacks, deleteProduct, deleteSnack,deleteCategory,editProduct} = require('../../controllers/productControllers/product.Controllers')
const isUserLoggedInAdmin = require("../../middlewares/authAdmin")

router.post("/createproduct", isUserLoggedInAdmin, createProduct)
router.post("/createColor",isUserLoggedInAdmin, createColor)
router.post("/createCategory", isUserLoggedInAdmin, createCategory)
router.put('/editproduct/:productId', editProduct);

router.get("/getCategory", getAllCategories)
router.get("/getColor", getAllColors)
router.get("/getProduct", getAllProducts)

router.post("/createsnack",isUserLoggedInAdmin, createSnack)
router.get("/getsnack", getSnacks)

router.delete("/deleteproduct",isUserLoggedInAdmin, deleteProduct)
router.delete("/deletesnack",isUserLoggedInAdmin, deleteSnack)
router.delete("/deletecategory",isUserLoggedInAdmin, deleteCategory)


module.exports = router;

