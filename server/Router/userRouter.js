const multer = require('multer');
const {postData,getData,getDatabyId,deleteData, updateData, forgotPassword} = require('../Controller/userController');
const verifyToken = require('../verifyToken');

const router = require('express').Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './img')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

router.post('/postData',upload.single('image'),postData)
router.get('/getData',getData)
router.get('/getDataById/:userId', verifyToken, getDatabyId)
router.delete('/removeDataById/:userId',deleteData)
router.put('/updateDataById/:userId',updateData)
router.post('/sentOtp',forgotPassword)


module.exports = router;