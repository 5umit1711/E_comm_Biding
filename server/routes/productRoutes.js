import express from "express";
import Product from "../models/productModel.js";
import authorization from "../middleware/authMiddleware.js";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";
import Bids from "../models/bidModel.js";

const router = express.Router();

router.post("/addProduct", authorization, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.send({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.post("/getProducts", async (req, res) => {
  try {
    const {seller, category, age, status, search} = req.body;
    let filters = {};
    if(search){
      filters.name = {$regex: search};
    }
    if(seller){
        filters.seller = seller;
    }
    if(status){
      filters.status = status;
    }
    if(category){
      filters.category = category;
    }
    if(age){
      const from = age.split("-")[0];
      const to = age.split("-")[1];
      filters.age = {$gte: from, $lte: to};
    }

    const products = await Product.find(filters).populate('seller').sort({ createdAt: -1 });
    res.send({
      success: true,
      products,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/getProduct/:id", authorization, async(req, res)=>{
  try{
    const product = await Product.findById(req.params.id).populate('seller');
    res.send({
      success: true,
      data: product,
    })
  }catch(error){
    res.send({
      success: false,
      message: error.message,
    })
  }
})

router.put("/editProduct/:id", authorization, async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.send({
      success: true,
      message: error.message,
    });
  }
});

router.delete("/deleteProduct/:id", authorization, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    await Bids.deleteMany({product: req.params.id});
    res.send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

const storage = multer.diskStorage({
  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
  },
});

router.post(
  "/uploadImage",
  authorization,
  multer({ storage: storage }).single("file"),
  async (req, res) => {
    try{
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "product",
        });
        const productID = req.body.productID;
        await Product.findByIdAndUpdate(productID, {
            $push: {images: result.secure_url},
        });
        res.send({
            success: true,
            message: "Image Uploaded Successfully",
            result,
        });
    }catch(error){
        res.send({
            success: false,
            message: error.message,
        })
    }
  }
);

router.put("/updateStatus/:id", authorization, async(req, res)=>{
  try{
    const {status} = req.body;
    await Product.findByIdAndUpdate(req.params.id, {status});
    res.send({
      success: true,
      message: "Product status updated successfully",
    })
  }catch(error){
    res.send({
      success: false,
      message: error.message,
    })
  }
});

export default router;
