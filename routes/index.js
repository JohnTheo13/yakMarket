const express = require('express');
const router = express.Router();
const multer =require('multer');
const fs = require('fs');
const yakStoreController = require('../controllers/yakStoreController');

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
router.get('/', (req, res) => {
  res.redirect('/stores');
});

router.get('/add', yakStoreController.upload);
router.get('/stores/:days', yakStoreController.getYaks);

router.post(
  '/stores/save',
  upload.single('file'),
  yakStoreController.save
);

module.exports = router;
