/* eslint-disable import/no-extraneous-dependencies */
const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/', async (req, res) => {
  const { mainOrder } = req.body;
  const { userId } = req.session;
  if (userId) {
    const lineItems = ['ORDER MUST BE HERE'].map((item) => ({
      price_data: {
        currency: 'rub',
        product_data: {
          name: 'Оплата проживания питомца в отеле ZooHotel',
          images: ['none'],
        },
        unit_amount: mainOrder.amount * 100,
      },
      quantity: mainOrder.quantity,
    }));
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:5175/rooms',
        cancel_url: 'http://localhost:5175/rooms',
      });
      console.log(session.payment_status)
      res.json({ id: session.id, session });
    } catch (error) {
      res.json({ err: 'Ошибка при выполнении транзакции' });
      console.log(error);
    }
  } else {
    res.json({ err: 'Вы не авторизованы!' });
  }
});

module.exports = router;
