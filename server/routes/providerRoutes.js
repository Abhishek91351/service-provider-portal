const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
  createOrUpdateProfile,
  getProfile,
} = require("../controllers/providerController");

router.post(
  "/profile",
  protect,
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "aadhaar", maxCount: 1 },
    { name: "pan", maxCount: 1 },
    { name: "experienceCertificate", maxCount: 1 },
  ]),
  createOrUpdateProfile
);

router.get("/profile", protect, getProfile);

module.exports = router;