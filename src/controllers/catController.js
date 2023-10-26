const ErrorHandler = require('../utils/ErrorHandler');

const { Cat } = require('../models/CatModel');

const getCat = async (req, res, next) => {
  const {
    jenisKelamin,
    umur,
    moreThanUmur,
    lessThanUmur,
  } = req.query;
  try {
    if (jenisKelamin && moreThanUmur) {
      const [catData] = await Cat.findOne({
        moreThanUmur: moreThanUmur,
        jenisKelamin: jenisKelamin,
      });

      if (catData[0].length == 0) {
        return next(
          new ErrorHandler(
            `data is not found!`,
            404
          )
        );
      }

      return res.status(200).json({
        status: 'success',
        message: `Cat with sex ${jenisKelamin} and age more than ${moreThanUmur} is displayed succesfully`,
        data: {
          Cats: catData[0],
        },
      });
    } else if (jenisKelamin && lessThanUmur) {
      const [catData] = await Cat.findOne({
        lessThanUmur: lessThanUmur,
        jenisKelamin: jenisKelamin,
      });

      if (catData[0].length == 0) {
        return next(
          new ErrorHandler(
            `data is not found!`,
            404
          )
        );
      }

      return res.status(200).json({
        status: 'success',
        message: `Cat with sex ${jenisKelamin} and age less than ${lessThanUmur} is displayed succesfully`,
        data: {
          Cats: catData[0],
        },
      });
    } else if (umur) {
      const [catData] = await Cat.findOne({
        jenisKelamin: jenisKelamin,
      });

      if (catData[0].length == 0) {
        return next(
          new ErrorHandler(
            `data is not found!`,
            404
          )
        );
      }

      return res.status(200).json({
        status: 'success',
        message: `Cat with age ${umur} is displayed succesfully`,
        data: {
          Cats: catData[0],
        },
      });
    } else if (jenisKelamin) {
      const [catData] = await Cat.findOne({
        jenisKelamin: jenisKelamin,
      });

      if (catData[0].length == 0) {
        return next(
          new ErrorHandler(
            `data is not found!`,
            404
          )
        );
      }

      return res.status(200).json({
        status: 'success',
        message: `Cat with sex ${jenisKelamin} is displayed succesfully`,
        data: {
          Cats: catData[0],
        },
      });
    }

    const [CatData] = await Cat.findAll();

    res.status(200).json({
      status: 'success',
      message: 'data is displayed successfully',
      data: {
        Cats: CatData[0],
      },
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

const getCatById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [CatData] = await Cat.findOne({
      id: id,
    });

    if (CatData[0].length == 0) {
      return next(
        new ErrorHandler(
          `data with id: ${id} is not found`,
          404
        )
      );
    }

    res.status(200).json({
      status: 'success',
      message: `data with id: ${id} displayed successfully`,
      data: {
        Cats: CatData[0],
      },
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

const insertCat = async (req, res, next) => {
  const { ras, nama, umur, jenisKelamin } =
    req.body;

  try {
    if (typeof umur != 'number') {
      return next(
        new ErrorHandler(
          'Age data must be a number ',
          404
        )
      );
    }
    await Cat.create(
      nama,
      umur,
      ras,
      jenisKelamin
    );

    const [newCatData] = await Cat.findOne({
      nama: nama,
    });

    res.status(200).json({
      status: 'success',
      message: 'data is added successfully',
      data: {
        Cats: newCatData[0],
      },
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

const updateCat = async (req, res, next) => {
  const { nama, ras, umur, jenisKelamin } =
    req.body;
  const { id } = req.params;
  try {
    const [updatedCatData] = await Cat.findOne({
      id: id,
    });

    console.log(updatedCatData);

    if (updatedCatData[0].length == 0) {
      return next(
        new ErrorHandler(
          `data with id: ${id} is not found`,
          404
        )
      );
    }

    if (typeof umur != 'number') {
      return next(
        new ErrorHandler(
          'Age data must be a number ',
          404
        )
      );
    }

    await Cat.update(
      id,
      nama,
      ras,
      umur,
      jenisKelamin
    );

    res.status(200).json({
      status: 'success',
      message: 'data is added successfully',
      data: {
        Cats: updatedCatData[0],
      },
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

const deleteCat = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [CatData] = await Cat.findOne({
      id: id,
    });

    if (CatData[0].length == 0) {
      return next(
        new ErrorHandler(
          `data with id: ${id} is not found`,
          404
        )
      );
    }

    await Cat.destroy(id);

    res.status(200).json({
      status: 'success',
      message: `data with id:${id} is deleted successfully`,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

module.exports = {
  getCat,
  insertCat,
  getCatById,
  updateCat,
  deleteCat,
};
