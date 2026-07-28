const ProviderProfile = require("../models/ProviderProfile");

exports.createOrUpdateProfile = async (req, res) => {
  try {
    const {
      phone,
      gender,
      dob,
      serviceCategories,
      skills,
      experience,
      city,
      state,
      pincode,
      address,
    } = req.body;

    const profilePhoto = req.files?.profilePhoto
      ? req.files.profilePhoto[0].filename
      : undefined;

    const aadhaar = req.files?.aadhaar
      ? req.files.aadhaar[0].filename
      : undefined;

    const pan = req.files?.pan
      ? req.files.pan[0].filename
      : undefined;

    const experienceCertificate = req.files?.experienceCertificate
      ? req.files.experienceCertificate[0].filename
      : undefined;

    let profile = await ProviderProfile.findOne({
      user: req.user.id,
    });

    if (!profile) {
      profile = new ProviderProfile({
        user: req.user.id,
      });
      if (!profile.documents) {
        profile.documents = {};
      }
    }

    if (profile.status === "Approved") {
      return res.status(400).json({
        message: "Profile already approved and cannot be edited.",
      });
    }

    profile.phone = phone;
    profile.gender = gender;
    profile.dob = dob;
    profile.serviceCategories = JSON.parse(serviceCategories);
    profile.skills = JSON.parse(skills);
    profile.experience = experience;

    profile.location = {
      city,
      state,
      pincode,
      address,
    };

    if (profilePhoto) profile.profilePhoto = profilePhoto;
    if (aadhaar) profile.documents.aadhaar = aadhaar;
    if (pan) profile.documents.pan = pan;
    if (experienceCertificate)
      profile.documents.experienceCertificate = experienceCertificate;

    await profile.save();

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = await ProviderProfile.findOne({
      user: req.user.id,
    }).populate("user", "name email");

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};