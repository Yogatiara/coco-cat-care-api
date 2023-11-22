const ErrorHandler = require("../utils/ErrorHandler");

const { Care } = require("../models/careModel");
const { Cat } = require("../models/catModel");

const getCare = async (req, res, next) => {
  try {
    const [CareData] = await Care.findAll();

    res.status(200).json({
      status: "success",
      message: "data is displayed successfully",
      data: {
        Cares: CareData[0],
      },
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

const getCareById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [CareData] = await Care.findOne({
      id: id,
    });

    if (CareData[0].length == 0) {
      return next(new ErrorHandler(`data with id: ${id} is not found`, 500));
    }

    res.status(200).json({
      status: "success",
      message: `data with id: ${id} displayed successfully`,
      data: {
        Cares: CareData[0],
      },
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

const insertCare = async (req, res, next) => {
  const {
    idPelanggan,
    tanggalAkhir,
    hargaPerHari,
    ras,
    namaKucing,
    umurKucing,
    jenisKelamin,
  } = req.body;

  try {
    const pad = (number) => {
      if (number < 10) {
        return "0" + number;
      }
      return number;
    };

    let harga = hargaPerHari;
    if (!hargaPerHari) {
      harga = 60000;
    }

    const currentDate = new Date();
    const tanggalFormatted = `${currentDate.getFullYear()}-${pad(
      currentDate.getMonth() + 1
    )}-${pad(currentDate.getDate())} ${pad(currentDate.getHours())}:${pad(
      currentDate.getMinutes()
    )}:${pad(currentDate.getSeconds())}`;

    await Care.create(idPelanggan, tanggalFormatted, tanggalAkhir, harga);

    await Cat.create({
      idPelanggan: idPelanggan,
      nama: namaKucing,
      ras: ras,
      umur: umurKucing,
      jenisKelamin: jenisKelamin,
    });

    res.status(201).json({
      status: "success",
      message: "data is added successfully",
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

const updateCare = async (req, res, next) => {
  const { tanggalAkhir, hargaPerHari } = req.body;
  const { id } = req.params;
  try {
    let harga = hargaPerHari;
    if (!hargaPerHari) {
      harga = 60000;
    }

    await Care.update(id, tanggalAkhir, harga);

    const [updatedCareData] = await Care.findOne({
      id: id,
    });

    if (updatedCareData[0].length == 0) {
      return next(new ErrorHandler(`data with id: ${id} is not found`, 404));
    }

    res.status(200).json({
      status: "success",
      message: "data is updated successfully",
      data: {
        Cares: updatedCareData[0],
      },
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

const deleteCare = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [CareData] = await Care.findOne({
      id: id,
    });

    if (CareData[0].length == 0) {
      return next(new ErrorHandler(`data with id: ${id} is not found`, 404));
    }

    await Care.destroy(id);

    res.status(200).json({
      status: "success",
      message: `data with id:${id} is deleted successfully`,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

module.exports = {
  getCare,
  insertCare,
  getCareById,
  updateCare,
  deleteCare,
};
