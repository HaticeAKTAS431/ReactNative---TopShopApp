const router = require("express").Router();
const productsController = require("../controllers/productsControllers");

router.get("/search/:key", productsController.searchProduct);
router.get("/:id", productsController.getProduct);
router.get("/", productsController.getAllProduct);
router.post("/", productsController.createProduct);

module.exports = router;
