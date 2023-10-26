const chekBodyRequire = (req, res, next) => {
  const { jenis, diskon } = req.body;
  try {
    if (!jenis && !diskon) {
      return res.status(400).json({
        status: 'failed',
        message:
          'type and discount card must be required!',
      });
    } else if (!jenis) {
      return res.status(400).json({
        status: 'failed',
        message: 'jenis must be required!',
      });
    } else if (!diskon) {
      return res.status(400).json({
        status: 'failed',
        message: 'diskon must be required!',
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
