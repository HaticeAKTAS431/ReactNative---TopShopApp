const router = require("express").Router();
const userController = require("../controllers/userController");

router.delete("/:id", userController.deletedUser);
router.get("/:id", userController.getUser);

module.exports = router;
