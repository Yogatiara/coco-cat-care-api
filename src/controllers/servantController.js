const {
  Servant,
} = require('../models/servantModel');

const getServant = async (req, res) => {
  const { noTelepon } = req.query;
  try {
    if (noTelepon) {
      const [servantData] = await Servant.findOne(
        {
          noTeleponPegawai: noTelepon,
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
    res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
};

const getServantById = async (req, res) => {
  const { id } = req.params;

  try {
    const [servantData] = await Servant.findOne({
      idPegawai: id,
    });

    res.status(200).json({
      status: 'success',
      message: `data with id: ${id} displayed successfully`,
      data: {
        Servants: servantData[0],
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
};

const insertServant = async (req, res) => {
  const { nama, noTelepon } = req.body;
  try {
    await Servant.create(nama, noTelepon);
    const [newServantData] =
      await Servant.findOne({
        noTeleponPegawai: noTelepon,
      });

    res.status(200).json({
      status: 'success',
      message: 'data is added successfully',
      data: {
        Servants: newServantData[0],
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'faild',
      message: err.message,
    });
  }
};

const updateServant = async (req, res) => {
  try {
  } catch (err) {}
};

module.exports = {
  getServant,
  insertServant,
  getServantById,
};
