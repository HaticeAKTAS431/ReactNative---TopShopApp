// routes/reviewRoutes.js
const router = require("express").Router();
const reviewController = require("../controllers/reviewController");

router.post("/", reviewController.createReview);
router.get("/:productId", reviewController.getReviews);

module.exports = router;
