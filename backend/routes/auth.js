const express = require('express');
const router = express.Router();

const { registerUser, 
        loginUser, 
        logoutUser, 
        forgotPassword, 
        resetPassword, 
        getUserProfile,
        updatePassword } = require('../controllers/authController')

const { isAuthenticatedUser } = require("../middlewares/auth")

router.route("/register").post(registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post('/password/forgot', forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/me", isAuthenticatedUser, getUserProfile)
router.put("/password/update", isAuthenticatedUser, updatePassword)

module.exports = router;