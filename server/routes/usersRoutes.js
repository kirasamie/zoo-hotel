const router = require('express').Router();
const bcrypt = require('bcrypt');

const { User } = require('../db/models');

router.get('/checkSession', async (req, res) => {
  const { userId, username, email } = req.session;
  res.json({ id: userId, username, email });
});

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user) {
      res.sendStatus(401);
    } else {
      const hash = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username, email, password: hash });
      req.session.email = newUser.email;
      req.session.username = newUser.username;
      req.session.userId = newUser.id;
      req.session.save(() => {
        console.log(
          `Welcome, ${newUser.username}. Your registration completed with email ${newUser.email}`
        );
        res.status(201).json({
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        });
      });
    }
  } catch (error) {
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
        req.session.username = user.username;
        req.session.userId = user.id;
        req.session.save(() => {
          res
            .status(200)
            .json({ id: user.id, username: user.username, email: user.email });
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
