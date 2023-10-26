const ErrorHandler = require('../utils/ErrorHandler');

const {
  Servant,
} = require('../models/servantModel');
// const { Cat } = require('../models/catModel');

const getServant = async (req, res, next) => {
  const { noTelepon } = req.query;
  try {
    if (noTelepon) {
      const [servantData] = await Servant.findOne(
        {
          noTelepon: noTelepon,
        }
      );

      return res.status(200).json({
        status: 'success',
        message: `User with phone number: ${noTelepon} displayed successfully`,
        data: {
          Servants: servantData[0],
        },
      });
    }

    const [servantData] = await Servant.findAll();

    res.status(200).json({
      status: 'success',
      message: 'data is displayed successfully',
      data: {
        Servants: servantData[0],
      },
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

const getServantById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [servantData] = await Servant.findOne({
      id: id,
    });

    if (servantData[0].length == 0) {
      return next(
        new ErrorHandler(
          `data with id: ${id} is not found`,
          500
        )
      );
    }

    res.status(200).json({
      status: 'success',
      message: `data with id: ${id} displayed successfully`,
      data: {
        Servants: servantData[0],
      },
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

const insertServant = async (req, res, next) => {
  const { nama, noTelepon } = req.body;
  try {
    await Servant.create(nama, noTelepon);

    const [newServantData] =
      await Servant.findOne({
        noTelepon: noTelepon,
      });

    res.status(201).json({
      status: 'success',
      message: 'data is added successfully',
      data: {
        Servants: newServantData[0],
      },
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

const updateServant = async (req, res, next) => {
  const { nama, noTelepon } = req.body;
  const { id } = req.params;
  try {
    const [updatedServantData] =
      await Servant.findOne({
        id: id,
      });

    console.log(updatedServantData);

    if (updatedServantData[0].length == 0) {
      return next(
        new ErrorHandler(
          `data with id: ${id} is not found`,
          404
        )
      );
    }

    await Servant.update(id, nama, noTelepon);

    res.status(200).json({
      status: 'success',
      message: 'data is updated successfully',
      data: {
        Servants: updatedServantData[0],
      },
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

const deleteServant = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Servant.destroy(id);

    res.status(200).json({
      status: 'success',
      message: `data with id:${id} is deleted successfully`,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

module.exports = {
  getServant,
  insertServant,
  getServantById,
  updateServant,
  deleteServant,
};
