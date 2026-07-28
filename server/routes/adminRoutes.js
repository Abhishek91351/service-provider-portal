const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const {
  getDashboardStats,
  getAllProviders,
  getProviderById,
  approveProvider,
  rejectProvider,
} = require("../controllers/adminController");

router.get(
  "/stats",
  protect,
  adminMiddleware,
  getDashboardStats
);

router.get(
  "/providers",
  protect,
  adminMiddleware,
  getAllProviders
);

router.get(
  "/provider/:id",
  protect,
  adminMiddleware,
  getProviderById
);

router.put(
  "/approve/:id",
  protect,
  adminMiddleware,
  approveProvider
);

router.put(
  "/reject/:id",
  protect,
  adminMiddleware,
  rejectProvider
);

module.exports = router;