const router = require('express').Router();

const { Room, RoomImage } = require('../db/models');

router.get('/all', async (req, res) => {
  try {
    const allRooms = await Room.findAll({ include: { model: RoomImage } });
    res.json(allRooms);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
