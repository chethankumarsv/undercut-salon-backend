const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },

    gender: {
      type: String,
    },

    service: {
      type: String,
      required: true,
    },

    appointmentDate: {
      type: String,
      required: true,
    },

    appointmentTime: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
    },

    status: {
      type: String,
      default: "Pending",
      paymentStatus: {
  type: String,
  default: "Pending",
},

paymentId: {
  type: String,
},
    },
  },
  
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Booking", bookingSchema);