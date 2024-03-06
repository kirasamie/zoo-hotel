/* eslint-disable import/no-extraneous-dependencies */
const multer = require('multer');
const router = require('express').Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/img/avatars/');
  },
  filename: (req, file, callback) => {
    const avatarFilename = `id_${req.session.userId}.${file.originalname.split('.').at(-1)}`;
    callback(null, avatarFilename);
  },
});

const fileFilter = (req, file, callback) => {
  const types = ['image/png', 'image/jpg', 'image/jpeg'];
  if (types.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({ fileFilter, storage });

router.post('/', upload.fileFilter, upload.single('avatar'), async (req, res) => {
  console.log(req.file);
  res.json({ msg: 'Аватарка успешно загружена!', filename: req.file.filename });
});

module.exports = router;
