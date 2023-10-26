const ErrorHandler = require('../utils/ErrorHandler');

const chekBodyRequire = (req, res, next) => {
  const { nama, noTelepon } = req.body;
  try {
    if (!noTelepon && !nama) {
      return next(
        new ErrorHandler(
          'name and telepon must be required!',
          400
        )
      );
    } else if (!noTelepon) {
      return next(
        new ErrorHandler(
          'noTelepon  must be required!',
          400
        )
      );
    } else if (!nama) {
      return next(
        new ErrorHandler(
          'nama must be required!',
          400
        )
      );
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
