const Address = require("../../models/Address");

const addAdress = async (req, res) => {
  try {
    const { address, userId, city, pincode, phone, note } = req.body;

    if (!address || !userId || !city || !pincode || !phone || !note) {
      res.status(404).json({
        success: false,
        message: "Invalid data provided",
      });
    }

    const newlycreatedaddress = Address({
      userId,
      address,
      city,
      pincode,
      phone,
      note,
    });
    await newlycreatedaddress.save();
    res.status(201).json({
      success: true,
      data: newlycreatedaddress,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const fetchAdress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(404).json({
        success: false,
        message: "Invalid data provided",
      });
    }
    const addressList = await Address.find({ userId });
    res.status(201).json({
      success: true,
      data: addressList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const editAdress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formdata = req.body;
    if (!userId || !addressId) {
      res.status(404).json({
        success: false,
        message: "Invalid data provided",
      });
    }

    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formdata,
      { new: true }
    );
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(201).json({
      success: true,
      data: address
    })
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const deleteAdress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
      res.status(404).json({
        success: false,
        message: "Invalid data provided",
      });
    }
    const address = await Address.findByIdAndDelete({
      _id: addressId,userId
    })
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(201).json({
      success: true,
      message: "Delete Address"
    })
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = { addAdress, fetchAdress, editAdress, deleteAdress };
