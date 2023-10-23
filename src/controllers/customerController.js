const {
  Customer,
} = require('../models/customerModel');

const getCustomer = async (req, res) => {
  const { noTelepon } = req.query;
  try {
    if (noTelepon) {
      const [customerData] =
        await Customer.findOne({
          noTelepon: noTelepon,
        });

      return res.status(200).json({
        status: 'success',
        message: `User with phone number: ${noTelepon} displayed successfully`,
        data: {
          Customers: customerData[0],
        },
      });
    }

    const [customerData] =
      await Customer.findAll();

    res.status(200).json({
      status: 'success',
      message: 'data is displayed successfully',
      data: {
        Customers: customerData[0],
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
};

const getCustomerById = async (req, res) => {
  const { id } = req.params;

  try {
    const [customerData] = await Customer.findOne(
      {
        id: id,
      }
    );

    if (customerData[0].length == 0) {
      return res.status(400).json({
        status: 'failed',
        message: `data with id: ${id} is not found`,
      });
    }

    res.status(200).json({
      status: 'success',
      message: `data with id: ${id} displayed successfully`,
      data: {
        Customers: customerData[0],
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
};

const insertCustomer = async (req, res) => {
  const { nama, noTelepon, alamat } = req.body;
  try {
    await Customer.create(
      nama,
      noTelepon,
      alamat
    );

    const [newCustomerData] =
      await Customer.findOne({
        noTelepon: noTelepon,
      });

    res.status(200).json({
      status: 'success',
      message: 'data is added successfully',
      data: {
        Customers: newCustomerData[0],
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
};

const updateCustomer = async (req, res) => {
  const { nama, noTelepon } = req.body;
  const { id } = req.params;
  try {
    await Customer.update(id, nama, noTelepon);

    const [updatedCustomerData] =
      await Customer.findOne({
        id: id,
      });

    res.status(200).json({
      status: 'success',
      message: 'data is added successfully',
      data: {
        Customers: updatedCustomerData[0],
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
};

const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    await Customer.destroy(id);

    res.status(200).json({
      status: 'success',
      message: `data with id:${id} is deleted successfully`,
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
};

module.exports = {
  getCustomer,
  insertCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
