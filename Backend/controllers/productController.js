import { v2 as cloudinary } from "cloudinary";
import { json } from "express";
import productModel from "../models/productModel.js";
// Function for adding a product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    // Handle image files dynamically
    const imageFiles = Object.values(req.files)
      .flat()
      .filter((file) => file);
    if (imageFiles.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "At least one image is required." });
    }

    // Upload images to Cloudinary
    const imagesUrl = await Promise.all(
      imageFiles.map(async (file) => {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            resource_type: "image",
          });
          return result.secure_url;
        } catch (uploadError) {
          console.error("Cloudinary upload error:", uploadError);
          throw new Error("Error uploading image to Cloudinary.");
        }
      })
    );

    // Prepare product data
    const productData = {
      name,
      description,
      price: Number(price),
      image: imagesUrl,
      category,
      subCategory,
      sizes: JSON.parse(sizes || "[]"), // Default to empty array if sizes is undefined
      bestseller: bestseller === "true" ? true : false,
      date: Date.now(),
    };

    console.log("Product data to save:", productData);

    // Save the product
    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added successfully." });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function for listing products
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function for removing products
const removeProduct = async (req, res) => {
  const productId = req.body.id;
  try {
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product doesn't exist." });
    }
    await productModel.findByIdAndDelete(productId);
    res.json({ success: true, message: "Product removed successfully." });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function for single product info
const singleProduct = async (req, res) => {
  try {
    const  productId  = req.query.productId;
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.json({ success: true, product });
  } catch (error) {
    console.error("Error fetching single product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { listProduct, addProduct, removeProduct, singleProduct };
