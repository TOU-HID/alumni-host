const { Router } = require('express');
const {
  expertSignup,
  expertLogin,
  getPendingRequests,
  approvedRequestedCustomer,
  getApprovedCustomers,
  removeCustomer,
} = require('../controller/expert.controller');

const router = Router();

router.post('/signup', expertSignup);
router.post('/login', expertLogin);
router.get('/getPendingRequests/:id', getPendingRequests);
router.post('/approvedRequestedCustomer/:id', approvedRequestedCustomer);
router.get('/getApprovedCustomers/:id', getApprovedCustomers);
router.post('/removeCustomer', removeCustomer);

module.exports = router;
