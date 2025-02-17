const {postData,getData,getDatabyId,deleteData, updateData, forgotPassword} = require('../Controller/userController');
const verifyToken = require('../verifyToken');

const router = require('express').Router();

router.post('/postData',postData)
router.get('/getData',getData)
router.get('/getDataById/:userId', verifyToken, getDatabyId)
router.delete('/removeDataById/:userId',deleteData)
router.put('/updateDataById/:userId',updateData)
router.post('/sentOtp',forgotPassword)


module.exports = router;