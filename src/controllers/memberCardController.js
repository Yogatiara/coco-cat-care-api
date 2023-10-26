const ErrorHandler = require('../utils/ErrorHandler');

const {
  memberCard,
} = require('../models/memberCardModel');

const getMemberCard = async (req, res, next) => {
  const { diskon } = req.query;
  try {
    if (diskon) {
      const [memberCardData] =
        await memberCard.findOne({
          noTelepon: noTelepon,
        });

      return res.status(200).json({
        status: 'success',
        message: `Member card with diskon: ${diskon}% displayed successfully`,
        data: {
          MemberCards: memberCardData[0],
        },
      });
    }

    const [memberCardData] =
      await memberCard.findAll();

    res.status(200).json({
      status: 'success',
      message: 'data is displayed successfully',
      data: {
        MemberCards: memberCardData[0],
      },
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

const getMemberCardById = async (
  req,
  res,
  next
) => {
  const { id } = req.params;

  try {
    const [memberCardData] =
      await memberCard.findOne({
        id: id,
      });

    if (memberCardData[0].length == 0) {
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
        MemberCards: memberCardData[0],
      },
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

const insertMemberCard = async (
  req,
  res,
  next
) => {
  const { jenis, diskon } = req.body;
  try {
    await memberCard.create(jenis, diskon);

    const [newMemberCardData] =
      await memberCard.findOne({
        diskon: diskon,
      });

    res.status(201).json({
      status: 'success',
      message: 'data is added successfully',
      data: {
        MemberCards: newMemberCardData[0],
      },
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

const updateMemberCard = async (
  req,
  res,
  next
) => {
  const { jenis, diskon } = req.body;
  const { id } = req.params;
  try {
    const [memberCardData] =
      await memberCard.findOne({
        id: id,
      });

    if (memberCardData[0].length == 0) {
      return next(
        new ErrorHandler(
          `data with id: ${id} is not found`,
          404
        )
      );
    }
    await memberCard.update(id, jenis, diskon);

    const [updatedMemberCardData] =
      await memberCard.findOne({
        id: id,
      });

    res.status(200).json({
      status: 'success',
      message: 'data is added successfully',
      data: {
        MemberCards: updatedMemberCardData[0],
      },
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

const deleteMemberCard = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  try {
    const [memberCardData] =
      await memberCard.findOne({
        id: id,
      });

    if (memberCardData[0].length == 0) {
      return next(
        new ErrorHandler(
          `data with id: ${id} is not found`,
          404
        )
      );
    }

    await memberCard.destroy(id);

    res.status(200).json({
      status: 'success',
      message: `data with id:${id} is deleted successfully`,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

module.exports = {
  getMemberCard,
  insertMemberCard,
  getMemberCardById,
  updateMemberCard,
  deleteMemberCard,
};
