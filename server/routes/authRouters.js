const express = require('express');
const { register,login,getCurrentUser,uploadProfileImage } = require('../controllers/authController');
const upload = require('../middleware/fileupload');
const auth =require("../middleware/auth");
const { logout } = require('../controllers/authController');
const router = express.Router();

router.post('/register',upload.single('profileImage'), register);
router.post('/login', login);
router.get('/me',auth, getCurrentUser);
router.post("/upload-profile-image",auth,upload.single("profileImage"),uploadProfileImage);
router.post('/logout', logout);

module.exports = router;
