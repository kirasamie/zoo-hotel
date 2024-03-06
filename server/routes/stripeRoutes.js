/* eslint-disable import/no-extraneous-dependencies */
const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/', async (req, res) => {
  const { order } = req.body;
  const { userId } = req.session;
  console.log(userId);
  if (userId) {
    const lineItems = ['ORDER MUST BE HERE'].map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'productName',
          images: ['none'],
        },
        unit_amount: 100,
      },
      quantity: 10,
    }));
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:5175/rooms',
        cancel_url: 'http://localhost:5175/rooms',
      });
      res.json({ id: session.id });
    } catch (error) {
      res.json({ err: 'Ошибка при выполнении транзакции' });
      console.log(error);
    }
  } else {
    res.json({ err: 'Вы не авторизованы!' });
  }
});

module.exports = router;
