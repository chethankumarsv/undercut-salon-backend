
const express = require("express");
const router = express.Router();

const {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
  getAnalytics,
  getCustomerBookings,
} = require("../controllers/bookingController");

const protectAdmin = require("../middleware/authMiddleware");

// ======================================
// Public Routes
// ======================================

// Create Booking
router.post("/", createBooking);

// Customer Appointment History
router.get(
  "/customer/:email",
  getCustomerBookings
);

// ======================================
// Admin Protected Routes
// ======================================

// Dashboard Analytics
router.get(
  "/analytics/dashboard",
  protectAdmin,
  getAnalytics
);

// Get All Bookings
router.get(
  "/",
  protectAdmin,
  getBookings
);

// Get Single Booking
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

