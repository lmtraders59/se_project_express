const router = require("express").Router();
const clothingItem = require("./clothingItem");
const auth = require("../middlewares/auth");
const NotFoundError = require("../utils/errors/notFoundError");

const userRouter = require("./users");

router.use(auth);
router.use("/users", userRouter);

router.use("/items", clothingItem);

router.use((req, res, next) => {
  next(new NotFoundError("Item not found"));
});

module.exports = router;
