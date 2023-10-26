const chekBodyRequire = (req, res, next) => {
  const { nama, ras, umur, jenisKelamin } =
    req.body;
  try {
    if (!jenisKelamin && !nama) {
      return res.status(400).json({
        status: 'failed',
        message: 'name and sex must be required!',
      });
    } else if (!nama) {
      return res.status(400).json({
        status: 'failed',
        message: 'name must be required!',
      });
    } else if (!umur) {
      return res.status(400).json({
        status: 'failed',
        message: 'umur  must be required!',
      });
    } else if (!ras) {
      return res.status(400).json({
        status: 'failed',
        message: 'ras must be required!',
      });
    }

    next();
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
};

module.exports = chekBodyRequire;
