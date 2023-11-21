const chekBodyRequire = (req, res, next) => {
  const { nama, noTelepon, alamat } = req.body;
  try {
    if (!noTelepon && !nama) {
      return sendBadRequest(res, 'name and telepon must be required!');
    }
    
    if (!noTelepon) {
      return sendBadRequest(res, 'noTelepon must be required!');
    }
    
    if (!nama) {
      return sendBadRequest(res, 'nama must be required!');
    }
    
    if (!alamat) {
      return sendBadRequest(res, 'alamat must be required!');
    }
    
    next();
    
    const sendBadRequest = (res, message) => {
      return res.status(400).json({
        status: 'failed',
        message,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
};

module.exports = chekBodyRequire;
