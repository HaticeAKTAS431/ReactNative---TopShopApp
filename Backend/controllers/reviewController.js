// controllers/reviewController.js

const Review = require("../models/Review");

module.exports = {
  // Yeni bir yorum oluştur
  createReview: async (req, res) => {
    const { userId, productId, content } = req.body;

    try {
      const newReview = new Review({
        userId: userId,
        productId: productId,
        content: content,
      });

      const savedReview = await newReview.save();
      res.status(201).send(savedReview);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while creating the review" });
    }
  },

  getReviews: async (req, res) => {
    const { productId } = req.params; // Assuming productId is passed as a URL parameter

    try {
      const reviews = await Review.find({ productId: productId });
      res.status(200).send(reviews);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching reviews" });
    }
  },
};
