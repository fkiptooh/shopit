const express = require('express');
const router = express.Router();

const { registerUser, loginUser, logoutUser, forgotPassword } = require('../controllers/authController')

router.route("/register").post(registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post('/password/forgot', forgotPassword);

module.exports = router;