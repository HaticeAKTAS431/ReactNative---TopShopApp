const Product = require("../models/Products");

module.exports = {
  createProduct: async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      await newProduct.save();
      res.status(200).json("product created successfully");
    } catch (error) {
      console.error(error);
      res.status(500).json("failed to create the product");
    }
  },

  getAllProduct: async (req, res) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json("failed to get the products");
    }
  },
  getProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json("failed to get the product");
    }
  },
  searchProduct: async (req, res) => {
    try {
      console.log("Search Key:", req.params.key);
      const result = await Product.find({ title: req.params.key });
      // const result = await Product.aggregate([
      //   {
      //search: {
      //       text: {
      //         query: req.params.key,
      //         path: "your_searchable_field", // Arama yapılacak alan adını ekleyin
      //       },
      //     },
      //   },
      // ]);

      console.log("Elasticsearch Result:", result);

      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json("No matching products found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json("Failed to get the product");
    }
  },
};
