const Product = require("../models/ProductSchema");
const {searchByKeyword, filter} = require("../apifeatures/apifeatures");

exports.CreateProduct = async (req, res, next) => {
  const { title, description, category, price } = req.body;

  try {
    const product = await Product.create({
      title,
      description,
      category,
      price,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating product",
      error: error.message,
    });
  }
};

exports.UpdateProduct = async (req, res, next) => {
  const id = req.params.id;
  const { title, description, category, price } = req.body;
  try {
    const newProduct = await Product.findByIdAndUpdate(
      id,
      {
        title,
        description,
        category,
        price,
      },
      { new: true }
    );

    if (!newProduct) {
      res.status(400).json({
        success: false,
        message: "product not found",
      });
    }
    res.status(201).json({
      success: true,
      message: "update successfully",
      newProduct,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
exports.GetAllProducts = async (req, res) => {
  try {
    let query = Product.find();
    if (req.query.keyword) {
        query = searchByKeyword(query, req.query);
    }
    if (Object.keys(req.query).length > 0) {
        query = filter(query, req.query);
    }
    const products = await query;
    res.status(201).json({
      success: true,
      message: "all products",
      products,
    });
  } catch (error) {
    res.status(400).json({
      success: true,
      message: error.message,
    });
  }
};
exports.DeleteProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(id);
    res.status(201).json({
      success: true,
      message: "product delete successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "eerror in deleting the product",
      error: error.messsage,
    });
  }
};

exports.RatingProduct = async (req, res, next) => {
  const { productId, rating } = req.body;
  const userId = req.user.id;

  try {
    // Check if the user has already rated the product
    const product = await Product.findOne({
      _id: productId,
      "ratings.userId": userId,
    });
    if (product) {
      return res.status(400).json({
        success: false,
        message: "You have already rated this product",
      });
    }

    // If the user has not rated the product before, proceed to save the new rating
    const newRating = { userId, value: rating };
    await Product.findByIdAndUpdate(productId, {
      $push: { ratings: newRating },
      rated: true,
    });

    return res.status(200).json({
      success: true,
      message: "Product rated successfully",
      product: newRating,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error rating product",
      error: error.message,
    });
  }
};
