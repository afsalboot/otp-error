const router = require('express').Router();

const { loginAccount } = require('../Controller/LoginController');


router.post('/loginData',loginAccount)

module.exports = router;