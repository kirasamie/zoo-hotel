/* eslint-disable import/no-extraneous-dependencies */
const multer = require('multer');
const router = require('express').Router();
const { Post, User, Order } = require('../db/models');
const mailer = require('../lib/nodemailer');

const { FRONT_URL } = process.env;

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/img/posts/');
  },
  filename: async (req, file, callback) => {
    const postPhotoFilename = `id_${req.params.postId}.${file.originalname.split('.').at(-1)}`;
    try {
      const post = await Post.update({ postPhotoLink: postPhotoFilename }, { where: { id: req.params.postId } });
      console.log(post);
    } catch (error) {
      console.log(error);
    }
    callback(null, postPhotoFilename);
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

router.post('/image/:postId', upload.fileFilter, upload.single('postImage'), async (req, res) => {
  res.json({ msg: 'Фото успешно загружено!', filename: req.file.filename });
});

router.get('/:id', async (req, res) => {
  const { userId } = req.session;
  const { id } = req.params;
  try {
    const posts = await Post.findAll({ where: { orderId: id }, include: { model: User, attributes: ['avatar', 'firstName', 'lastName'] }, order: [['createdAt', 'DESC']] });
    console.log(posts.length);
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
});

router.post('/', async (req, res) => {
  const { userId } = req.session;
  const { title, body, orderId, workerId } = req.body;
  if (userId === workerId) {
    try {
      const newPost = await Post.create({
        title,
        body,
        orderId,
        workerId: userId,
      });
      const postForUser = await Post.findOne({ include: { model: Order, where: { id: newPost.orderId }, include: { model: User } } });
      const emailUser = postForUser.Order.User.email;
      const message = {
        to: emailUser,
        subject: 'Отель для животных ZooHotel!',
        html: `
          <h2>У вас новое сообщение от ZooHotel!</h2>
          <br/>
          <p> Здравствуйте, ${postForUser.Order.User.lastName} ${postForUser.Order.User.firstName}</p>
          <br/>
          <p> К вашему заказу №${newPost.orderId} добавлен новый пост!
          </p>
          <p>
            <a style="cursor:pointer;" href="${FRONT_URL}/account/orders/${newPost.orderId}">Посмотреть пост!</a>
          </p>
          <br/>
          <p>С Уважением,</p>
          <p>Администрация ZooHotel KiraJuckieKate</p>
          `,
      };
      mailer(message);
      res.json(newPost);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
