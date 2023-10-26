const ErrorHandler = require('../utils/ErrorHandler');

const {
  Customer,
} = require('../models/customerModel');

const { Cat } = require('../models/catModel');

const getCustomer = async (req, res, next) => {
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
        Customers: customerData,
      },
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

const getCustomerById = async (
  req,
  res,
  next
) => {
  const { id } = req.params;

  try {
    const [customerData] = await Customer.findOne(
      {
        id: id,
      }
    );

    if (customerData[0].length == 0) {
      return next(
        new ErrorHandler(
          `data with id: ${id} is not found`,
          404
        )
      );
    }

    res.status(200).json({
      status: 'success',
      message: `data with id: ${id} displayed successfully`,
      data: {
        Customers: customerData[0],
      },
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

const insertCustomer = async (req, res, next) => {
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

    res.status(201).json({
      status: 'success',
      message: 'data is added successfully',
      data: {
        Customers: newCustomerData[0],
      },
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

const updateCustomer = async (req, res, next) => {
  const { nama, noTelepon } = req.body;
  const { id } = req.params;
  try {
    const [updatedCustomerData] =
      await Customer.findOne({
        id: id,
      });

    if (updatedCustomerData[0].length == 0) {
      return next(
        new ErrorHandler(
          `data with id: ${id} is not found`,
          404
        )
      );
    }

    await Customer.update(id, nama, noTelepon);

    res.status(200).json({
      status: 'success',
      message: 'data is added successfully',
      data: {
        Customers: updatedCustomerData[0],
      },
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

const deleteCustomer = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Customer.destroy(id);

    res.status(200).json({
      status: 'success',
      message: `data with id:${id} is deleted successfully`,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

module.exports = {
  getCustomer,
  insertCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
