const express = require("express");
const {
  register,
  login,
  userProfile,
} = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/auth");
const { logout } = require("../controllers/userController");

const router = express.Router();

router.post("/SignUp", register);
router.post("/login", login);
router.get("/profile", authMiddleware, userProfile);
router.post("/logout", logout);




module.exports = router;




module.exports = router;
