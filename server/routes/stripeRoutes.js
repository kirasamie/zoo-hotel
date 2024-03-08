/* eslint-disable import/no-extraneous-dependencies */
const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Order } = require('../db/models');

const { FRONT_URL } = process.env;

router.post('/', async (req, res) => {
  const { mainOrder, additionalOrders } = req.body;
  const { userId } = req.session;
  if (userId) {
    const addOrderNames = [
      'Груминг',
      'Занятия с кинологом',
      'Консультация зоопсихолога',
      'Зоотакси',
      'Приготовление пищи для питомца',
      'Фотоотчет более 1 раза в день',
      'Подготовка собаки к выставке',
    ];
    const namedAddOrders = additionalOrders.map((el) => ({ name: addOrderNames[Number(el[0]) - 1], price: el[1] }));
    const mainItem = {
      price_data: {
        currency: 'rub',
        product_data: {
          name: 'Оплата проживания питомца в отеле ZooHotel',
          images: ['none'],
        },
        unit_amount: mainOrder.amount * 100,
      },
      quantity: mainOrder.quantity,
    };
    const additionalItems = namedAddOrders.map((item) => ({
      price_data: {
        currency: 'rub',
        product_data: {
          name: item.name,
          images: ['none'],
        },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    }));
    const lineItems = [mainItem, ...additionalItems]
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: FRONT_URL,
        cancel_url: FRONT_URL,
      });
      const order = await Order.create({
        orderUserId: mainOrder.userId,
        orderPetId: mainOrder.petId,
        orderRoomId: mainOrder.roomId,
        orderDateIn: mainOrder.dateFrom,
        orderDateOut: mainOrder.dateTo,
        addInfo: mainOrder?.description,
        paymentStatus: false,
      });
      res.json({ id: session.id, order });
    } catch (error) {
      res.json({ err: 'Ошибка при выполнении транзакции' });
      console.log(error);
    }
  } else {
    res.json({ err: 'Вы не авторизованы!' });
  }
});

module.exports = router;
