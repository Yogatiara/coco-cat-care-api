const ErrorHandler = require('../utils/ErrorHandler');

const chekBodyRequire = (req, res, next) => {
  const { nama, noTelepon } = req.body;
  try {
    if (!noTelepon && !nama) {
      next(
        new ErrorHandler(
          'name and telepon must be required!',
          400
        )
      );
    } else if (!noTelepon) {
      next(
        new ErrorHandler(
          'noTelepon and telepon must be required!',
          400
        )
      );
    } else if (!nama) {
      next(
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
