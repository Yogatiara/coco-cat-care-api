const router = require('express').Router();

const memberCardController = require('../controllers/memberCardController');
const chekBodyRequire = require('../middlewares/checkBodyMemberCardRequire');

router
  .route('/')
  .get(memberCardController.getMemberCard)
  .post(
    chekBodyRequire,
    memberCardController.insertMemberCard
  );

router
  .route('/:id')
  .get(memberCardController.getMemberCardById)
  .put(memberCardController.updateMemberCard)
  .delete(memberCardController.deleteMemberCard);

module.exports = router;
