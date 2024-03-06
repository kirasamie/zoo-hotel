const router = require('express').Router();

const { Room, User, Order } = require('../db/models');

router.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.session;  //! реализовать проверку на юзера и рек.парамс
  try {
    // const orders = await Order.findAll({where: {order}})
  } catch (error) {
   
  }
});

module.exports = router;
