const router = require("express").Router();
const cardController = require("../controllers/cardController");
const { verifyToken } = require("../middleware/verifyToken");

router.get("/find/:id", cardController.getCard);
router.post("/", verifyToken , cardController.addToCard);
router.post("/quantity", cardController.decrementCardItem);
router.delete("/:cardItemId", cardController.deleteCardItem);

module.exports = router;
