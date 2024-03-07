/* eslint-disable import/no-extraneous-dependencies */
const multer = require('multer');
const router = require('express').Router();
const { User, PetImage } = require('../db/models');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/img/avatars/');
  },
  filename: async (req, file, callback) => {
    const avatarFilename = `id_${req.session.userId}.${file.originalname
      .split('.')
      .at(-1)}`;
    try {
      const user = await User.update(
        { avatar: avatarFilename },
        { where: { id: req.session.userId } }
      );
      console.log(user);
    } catch (error) {
      console.log(error);
    }
    callback(null, avatarFilename);
  },
});

const petStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/img/pets/');
  },
  filename: async (req, file, callback) => {
    const petImageName = `id_${req.params.petId}.${file.originalname}`;
    callback(null, petImageName);
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

router.post(
  '/',
  upload.fileFilter,
  upload.single('avatar'),
  async (req, res) => {
    console.log(req.file);
    res.json({
      msg: 'Аватарка успешно загружена!',
      filename: req.file.filename,
    });
  }
);

const load = multer({ storage: petStorage });

router.post('/pet/:petId', load.array('pets', 3), async (req, res) => {
  const { petId } = req.params;
  try {
    req.files.forEach(async (file) => {
      await PetImage.create({ petId, link: file.filename });
    });
    res.json({ msg: 'success' });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
