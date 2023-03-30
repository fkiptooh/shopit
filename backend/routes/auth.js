const express = require('express');
const router = express.Router();

const { registerUser, 
        loginUser, 
        logoutUser, 
        forgotPassword, 
        resetPassword, 
        getUserProfile,
        updatePassword, 
        updateProfile,
        allUsers,
        getUserDetails} = require('../controllers/authController')

const { isAuthenticatedUser, authorizedRoles } = require("../middlewares/auth")

router.route("/register").post(registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post('/password/forgot', forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/me", isAuthenticatedUser, getUserProfile)
router.put("/password/update", isAuthenticatedUser, updatePassword)
router.put("/me/update", isAuthenticatedUser, updateProfile)
router.get("/admin/users", isAuthenticatedUser, authorizedRoles("admin"), allUsers);
router.get("/admin/user/:id", isAuthenticatedUser, authorizedRoles("admin"), getUserDetails);

module.exports = router;