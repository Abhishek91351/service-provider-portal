const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    dob: {
      type: String,
    },

    serviceCategories: [
      {
        type: String,
      },
    ],

    skills: [
      {
        type: String,
      },
    ],

    experience: {
      type: Number,
      default: 0,
    },

    location: {
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      pincode: {
        type: String,
      },
      address: {
        type: String,
      },
    },

    profilePhoto: {
      type: String,
      default: "",
    },

    documents: {
      aadhaar: {
        type: String,
        default: "",
      },

      pan: {
        type: String,
        default: "",
      },

      experienceCertificate: {
        type: String,
        default: "",
      },
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    rejectionRemark: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ProviderProfile", providerSchema);