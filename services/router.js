const express = require('express');
const router = new express.Router();
const accounts = require('../controllers/accounts.js');

router.route('/accounts/:id?')
  .get(accounts.get)
  .post(accounts.post)
  .put(accounts.put)
  .delete(accounts.delete);

module.exports = router;