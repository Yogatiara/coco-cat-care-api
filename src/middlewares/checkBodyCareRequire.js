const chekBodyRequire = (req, res, next) => {
  const { idPelanggan, tanggalAkhir, namaKucing } = req.body;
  try {
    if (!idPelanggan && !tanggalAkhir) {
      return sendBadRequest(res, "name and telepon must be required!");
    }

    if (!namaKucing) {
      return sendBadRequest(res, "cat data must be required!");
    }

    next();

    const sendBadRequest = (res, message) => {
      return res.status(400).json({
        status: "failed",
        message,
      });
    };
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

module.exports = chekBodyRequire;
