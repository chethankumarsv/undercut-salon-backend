
const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
  getAnalytics,
} = require("../controllers/bookingController");

const protectAdmin = require(
  "../middleware/authMiddleware"
);

// ===============================
// Public Routes
// ===============================

// Create Booking
router.post("/", createBooking);

// ===============================
// Admin Protected Routes
// ===============================

// Get All Bookings
router.get(
  "/",
  protectAdmin,
  getBookings
);
router.get(
  "/analytics/dashboard",
  protectAdmin,
  getAnalytics
);
// Get Single Booking
router.get(
  "/customer/:email",
  getCustomerBookings
);
router.get(
  "/:id",
  protectAdmin,
  getBookingById
);

// Update Booking Status
router.put(
  "/:id",
  protectAdmin,
  updateBookingStatus
);

// Delete Booking
router.delete(
  "/:id",
  protectAdmin,
  deleteBooking
);

module.exports = router;
