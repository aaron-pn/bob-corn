const cors = require('cors');
const express = require('express');
const Purchase = require('./models/Purchase');
const sequelize = require('./config/database');

const PORT = 3001;
const app = express();

const connectDB = async () => {
  await sequelize.authenticate();
  console.log('Database connection successful.');
  await sequelize.sync();
  console.log('Models synchronized with the database.');
};

app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);

app.use(express.json());

connectDB();

app.post('/buy-corn', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: 'Invalid user' });
    }

    const lastPurchase = await Purchase.findOne({
      where: { userId },
      order: [['createdAt', 'DESC']]
    });

    if (lastPurchase) {
      const now = new Date();
      const lastPurchaseTime = new Date(lastPurchase.createdAt);
      const diffInSeconds = (now - lastPurchaseTime) / 1000;

      if (diffInSeconds < 60) {
        return res.status(429).json({
          error: '429 - Too Many Requests',
          message: 'Too Many Requests',
          status: 429
        });
      }
    }

    const newPurchase = await Purchase.create({
      userId
    });

    return res.status(200).json(newPurchase);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/my-buys/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const lastPurchase = await Purchase.findAll({
      where: { userId: id },
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json(lastPurchase);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
