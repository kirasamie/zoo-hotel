const router = require('express').Router();
const bcrypt = require('bcrypt');

const { User } = require('../db/models');

router.get('/checkSession', async (req, res) => {
  const { userId, firstName, email } = req.session;
  res.json({ id: userId, firstName, email });
});

router.post('/register', async (req, res) => {
  try {
    const {
      firstName, lastName, email, password, avatar, phone,
    } = req.body;
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
      });
      req.session.email = newUser.email;
      req.session.firstName = newUser.firstName;
      req.session.userId = newUser.id;
      req.session.save(() => {
        console.log(
          `Welcome, ${newUser.name}. Your registration completed with email ${newUser.email}`,
        );
        res.status(201).json({
          id: newUser.id,
          firstName: newUser.firstName,
          email: newUser.email,
        });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
});

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
        req.session.save(() => {
          res
            .status(201)
            .json({
              id: user.id,
              firstName: user.firstName,
              email: user.email,
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

module.exports = router;
