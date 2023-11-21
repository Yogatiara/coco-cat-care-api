const chekBodyRequire = (req, res, next) => {
  const { nama, noTelepon, alamat } = req.body;

  const body = [nama, noTelepon, alamat];

  for(let i = 0; i < body.length; i++) {
    if(!body[i]) {
      
    }
  }
  try {
    if (!noTelepon && !nama) {
      return res.status(400).json({
        status: 'failed',
        message:
          'name and telepon must be required!',
      });
    } else if (!noTelepon) {
      return res.status(400).json({
        status: 'failed',
        message: 'noTelepon must be required!',
      });
    } else if (!nama) {
      return res.status(400).json({
        status: 'failed',
        message: 'nama  must be required!',
      });
    } else if (!alamat) {
      return res.status(400).json({
        status: 'failed',
        message: 'alamat must be required!',
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
