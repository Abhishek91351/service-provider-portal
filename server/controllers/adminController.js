const ProviderProfile = require("../models/ProviderProfile");

exports.getDashboardStats = async (req, res) => {
  try {
    const total = await ProviderProfile.countDocuments();

    const pending = await ProviderProfile.countDocuments({
      status: "Pending",
    });

    const approved = await ProviderProfile.countDocuments({
      status: "Approved",
    });

    const rejected = await ProviderProfile.countDocuments({
      status: "Rejected",
    });

    res.json({
      total,
      pending,
      approved,
      rejected,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllProviders = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const status = req.query.status || "";
    const search = req.query.search || "";

    // Fetch providers
    let providers = await ProviderProfile.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    // Search
    if (search) {
      providers = providers.filter((provider) => {
        const name = provider.user?.name?.toLowerCase() || "";
        const email = provider.user?.email?.toLowerCase() || "";

        return (
          name.includes(search.toLowerCase()) ||
          email.includes(search.toLowerCase())
        );
      });
    }

    // Status Filter
    if (status) {
      providers = providers.filter(
        (provider) => provider.status === status
      );
    }

    const total = providers.length;

    const paginatedProviders = providers.slice(
      skip,
      skip + limit
    );

    res.json({
      providers: paginatedProviders,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalProviders: total,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.approveProvider = async (req, res) => {
  try {
    const provider = await ProviderProfile.findById(req.params.id);

    if (!provider) {
      return res.status(404).json({
        message: "Provider not found",
      });
    }

    provider.status = "Approved";
    provider.rejectionRemark = "";

    await provider.save();

    res.json({
      message: "Provider Approved Successfully",
      provider,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.rejectProvider = async (req, res) => {
  try {
    const { rejectionRemark } = req.body;

    if (!rejectionRemark) {
      return res.status(400).json({
        message: "Rejection remark is required",
      });
    }

    const provider = await ProviderProfile.findById(req.params.id);

    if (!provider) {
      return res.status(404).json({
        message: "Provider not found",
      });
    }

    provider.status = "Rejected";
    provider.rejectionRemark = rejectionRemark;

    await provider.save();

    res.json({
      message: "Provider Rejected Successfully",
      provider,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getProviderById = async (req, res) => {
  try {
    const provider = await ProviderProfile.findById(req.params.id)
      .populate("user", "name email");

    if (!provider) {
      return res.status(404).json({
        message: "Provider not found",
      });
    }

    res.json(provider);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};