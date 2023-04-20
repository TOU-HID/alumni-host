const { Router } = require('express');
const {
  userSignup,
  userLogin,
  getAllExperts,
  getExpertById,
  addBookedExpert,
  getBookedExperts,
} = require('../controller/user.controller');

const router = Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/get_all_expert', getAllExperts);
router.get('/get_expert_by_id/:id', getExpertById);
router.post('/add_booked_expert/:id', addBookedExpert);
router.get('/get_booked_expert/:id', getBookedExperts);

module.exports = router;
