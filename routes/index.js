const express = require('express');
const router = express.Router();
const multer =require('multer');
const fs = require('fs');
const yakStoreController = require('../controllers/yakStoreController');
const userController = require('../controllers/userController');

// Note: move middleware to different file
const upload = multer({
  dest: 'upload/',
  fileFilter(req, file, next) {
    const isXML = file.mimetype
    if(isXML === 'text/xml') {
      next(null, true);
    } else {
      next({ message: 'Not supported file' });
    }
  }
})

// App routes
router.get('/home', (req, res) => {
  res.render('./home', { title: req.session.user ? req.session.user.username : 'Home' })
});

router.get('/add', yakStoreController.upload);
router.post(
  '/yaks/save',
  upload.single('file'),
  yakStoreController.save
);

router.get('/yaks/:days', yakStoreController.getYaks);
router.get('/stock/:days', yakStoreController.getStock);

router.get('/register', userController.register);
router.post(
  '/register/user',
  userController.validatePassword,
  userController.saveUser
);

router.get('/login', userController.renderLogin);
router.post(
  '/login/user',
  userController.authorize
);

module.exports = router;
