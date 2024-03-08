const router = require('express').Router();

const { Pet, PetImage, User, Comment } = require('../db/models');

router.get('/', async (req, res) => {
//   const { userId } = req.session;
  try {
    const allComments = await Comment.findAll();
    res.json(allComments);
  } catch (error) {
    console.log(error);
  }
});

router.post('/new/:id', async (req, res) => {
  const { userId } = req.session;
  const { id } = req.params;
  const {
    body
  } = req.body;
  try {
    const newComment = await Comment.create({
     body,
     postId: Number(id),
    });
    res.json(newComment);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
