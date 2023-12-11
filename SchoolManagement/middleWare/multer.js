const multer = require('multer');
const path = require('path');

const imageMaxSize = 2 * 1024 * 1204; // 2mb
const pdfMaxSize = 5 * 1024 * 1204; // 5mb
const stroage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({
  storage: stroage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const fileSize = parseInt(req.headers['content-length'], 10);
    if (ext === '.jpeg' || ext === '.jpg' && fileSize <= imageMaxSize) {
      cb(null, true);
    } else if (ext === '.pdf' && fileSize <= pdfMaxSize) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

module.exports = { upload, stroage };
