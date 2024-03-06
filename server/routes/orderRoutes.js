const router = require('express').Router();

const { Room, User, Order } = require('../db/models');

router.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.session; //! реализовать проверку на юзера и рек.парамс
  try {
    const orders = await Order.findAll({ where: { orderUserId: Number(id) } });
    res.json(orders);
  } catch (error) {
    console.log(error);
  }
});

router.get('/room/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const currentDate = new Date().getTime();
    const ordersWithAllDates = await Order.findAll({
      where: { orderRoomId: Number(id) },
    });
    const orders = [];
    ordersWithAllDates
      .filter((order) => (currentDate > Date.parse(order.orderDateOut)
        ? ''
        : orders.push([order.orderDateIn, order.orderDateOut])))
      .map((el) => el.get({ plain: true }));
    res.json(orders);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
