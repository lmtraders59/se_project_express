const router = require("express").Router();
const { updateUserValidation } = require("../middlewares/validation");

const { getCurrentUser, updateUser } = require("../controllers/users");

router.get("/me", getCurrentUser);

router.patch("/me", updateUserValidation, updateUser);

module.exports = router;
