const ErrorHandler = require("../utils/ErrorHandler");

const { Service } = require("../models/serviceModel");

const getService = async (req, res, next) => {
  try {
    const [ServiceData] = await Service.findAll();

    res.status(200).json({
      status: "success",
      message: "data is displayed successfully",
      data: {
        Services: ServiceData[0],
      },
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

const getServiceById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [ServiceData] = await Service.findOne({
      id: id,
    });

    if (ServiceData[0].length == 0) {
      return next(new ErrorHandler(`data with id: ${id} is not found`, 500));
    }

    res.status(200).json({
      status: "success",
      message: `data with id: ${id} displayed successfully`,
      data: {
        Services: ServiceData[0],
      },
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

const insertService = async (req, res, next) => {
  const { idPenitipan, idKucing, idPegawai } = req.body;

  try {
    await Service.create(idPenitipan, idKucing, idPegawai);

    res.status(201).json({
      status: "success",
      message: "data is added successfully",
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

const updateService = async (req, res, next) => {
  const { idPenitipan, idKucing, idPegawai } = req.body;
  const { id } = req.params;
  try {
    let harga = hargaPerHari;
    if (!hargaPerHari) {
      harga = 60000;
    }

    await Service.update(id, idPenitipan, idKucing, idPegawai);

    const [updatedServiceData] = await Service.findOne({
      id: id,
    });

    if (updatedServiceData[0].length == 0) {
      return next(new ErrorHandler(`data with id: ${id} is not found`, 404));
    }

    res.status(200).json({
      status: "success",
      message: "data is updated successfully",
      data: {
        Services: updatedServiceData[0],
      },
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

const deleteService = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [ServiceData] = await Service.findOne({
      id: id,
    });

    if (ServiceData[0].length == 0) {
      return next(new ErrorHandler(`data with id: ${id} is not found`, 404));
    }

    await Service.destroy(id);

    res.status(200).json({
      status: "success",
      message: `data with id:${id} is deleted successfully`,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

module.exports = {
  getService,
  insertService,
  getServiceById,
  updateService,
  deleteService,
};
