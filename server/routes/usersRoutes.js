const router = require('express').Router();
const bcrypt = require('bcrypt');
const randomizer = require('../lib/randomizer');
const mailer = require('../lib/nodemailer');

const { User } = require('../db/models');

router.get('/checkSession', async (req, res) => {
  const { userId } = req.session;
  if (userId) {
    const user = await User.findOne({ where: { id: userId }, attributes: { exclude: ['password'] } });
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, avatar, phone } = req.body;
    console.log(req.body);
    const user = await User.findOne({ where: { email } });
    if (user) {
      res.sendStatus(401);
    } else {
      const hash = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hash,
        avatar,
        phone,
        isWorker: false,
      });
      req.session.email = newUser.email;
      req.session.firstName = newUser.firstName;
      req.session.userId = newUser.id;
      req.session.isWorker = newUser.isWorker;
      req.session.save(() => {
        console.log(`Welcome, ${newUser.name}. Your registration completed with email ${newUser.email}`);
        res.status(201).json({
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          phone: newUser.phone,
          isWorker: newUser.isWorker,
          avatar: newUser.avatar,
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/message', async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const secretWord = randomizer();
    const message = {
      to: req.body.email,
      subject: 'Отель для животных ZooHotel!',
      html: `
        <h2>Добро пожаловать на отель для ваших любимых питомцев, ZooHotel!</h2>
        <br/>
        <p> ${lastName} ${firstName}</p>
        <br/>
        <p> Спасибо за регистрацию на нашем сайте!
        </p>
        <p>Данные для вашей авторизации, а также секретное слово, которое необходимо ввести для завершения процесса регистрации:</p>
        <ul>
        <li>email: ${email}</li>
        <li>Ваше секретное слово: ${secretWord}</li>
        </ul>
        <p>С Уважением,</p>
        <p>Администрация ZooHotel KiraJuckieKate</p>
        `,
    };
    mailer(message);
    res.json({
      secretWord,
    });
  } catch (error) {
    console.log(error);
    res.json({ err: error });
  }
});

// router.post('/register', async (req, res) => {
//   try {
//     const { firstName, lastName, email, password, avatar, phone } = req.body;
//     const hash = await bcrypt.hash(password, 10);
//     const newUser = await User.create({
//       firstName,
//       lastName,
//       email,
//       password: hash,
//       avatar,
//       phone,
//     });
//     req.session.email = newUser.email;
//     req.session.firstName = newUser.firstName;
//     req.session.userId = newUser.id;
//     req.session.save(() => {
//       console.log(`Welcome, ${newUser.firstName}. Your registration completed with email ${newUser.email}`);
//       res.status(201).json({
//         id: newUser.id,
//         firstName: newUser.firstName,
//         email: newUser.email,
//       });
//     });
//   } catch (error) {
//     res.status(500).json({
//       error,
//     });
//   }
// });

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.sendStatus(401);
    } else {
      const checkPass = await bcrypt.compare(password, user.password);
      if (checkPass) {
        req.session.email = user.email;
        req.session.firstName = user.firstName;
        req.session.userId = user.id;
        req.session.isWorker = user.isWorker;
        req.session.save(() => {
          res.status(201).json({
            id: user.id,
            firstName: user.firstName,
            email: user.email,
            isWorker: user.isWorker,
            avatar: user.avatar,
          });
        });
      } else {
        res.sendStatus(402);
      }
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('cookiesFinalOchka');
    res.status(200).json({ msg: 'Goodbye!' });
  });
});

router.patch('/edit', async (req, res) => {
  try {
    const { userId } = req.session;
    const user = await User.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
      },
      { where: { id: userId }, returning: true, plain: true },
    );
    res.json(user[1]);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
