
const Booking = require("../models/booking");
const sendEmail = require("../utils/sendEmail");

// ==============================
// Create Booking
// ==============================
const createBooking = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      gender,
      service,
      appointmentDate,
      appointmentTime,
      notes,
    } = req.body;

    // Validation
    if (
      !fullName ||
      !phone ||
      !service ||
      !appointmentDate ||
      !appointmentTime
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const booking = await Booking.create({
      fullName,
      phone,
      email,
      gender,
      service,
      appointmentDate,
      appointmentTime,
      notes,
      status: "Pending",
    });

    // Send Email (only if email exists)
    if (email) {
      await sendEmail(
        email,
        "UNDERCUT SALON - Appointment Confirmation",
        `
        <div style="font-family:Arial;padding:20px">
          <h2>Appointment Confirmed</h2>

          <p>Hello ${fullName},</p>

          <p>
            Thank you for booking with
            <strong> UNDERCUT SALON </strong>.
          </p>

          <hr/>

          <p><b>Service:</b> ${service}</p>
          <p><b>Date:</b> ${appointmentDate}</p>
          <p><b>Time:</b> ${appointmentTime}</p>
          <p><b>Status:</b> Pending</p>

          <br/>

          <p>We look forward to serving you.</p>

          <h3>UNDERCUT SALON</h3>
        </div>
        `
      );
    }

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      booking,
    });
  } catch (error) {
    console.error("Create Booking Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: error.message,
    });
  }
};

// ==============================
// Get All Bookings
// ==============================
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get Single Booking
// ==============================
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Update Booking Status
// ==============================
const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Delete Booking
// ==============================
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Dashboard Analytics
// ==============================
const getAnalytics = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();

    const pendingBookings =
      await Booking.countDocuments({
        status: "Pending",
      });

    const confirmedBookings =
      await Booking.countDocuments({
        status: "Confirmed",
      });

    const completedBookings =
      await Booking.countDocuments({
        status: "Completed",
      });

    res.status(200).json({
      success: true,
      analytics: {
        totalBookings,
        pendingBookings,
        confirmedBookings,
        completedBookings,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Customer Bookings By Email
const getCustomerBookings = async (req, res) => {
  try {
    const { email } = req.params;

    const bookings = await Booking.find({
      email,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
  getAnalytics,
  getCustomerBookings,
};

