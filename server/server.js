const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 5555;

const uri =
  'mongodb+srv://lokomanjob:Lokoman_9912@elisey.anbg3qc.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const database = client.db('shop');

// Открываем соединение при запуске приложения
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Подключился клиент к базе данных');
  } catch (error) {
    console.error('Ошибка при подключении к базе данных:', error);
    throw error;
  }
}

// Закрываем соединение при завершении работы приложения
function closeDatabaseConnection() {
  client.close().then(() => {
    console.log('Отключился клиент от базы данных');
  });
}

app.get('/products', async (req, res) => {
  try {
    const collection = database.collection('Products');
    const products = await collection.find().toArray();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const collection = database.collection('Users');
    const users = await collection.find().toArray();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, async () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  await connectToDatabase();
});

process.on('SIGINT', () => {
  closeDatabaseConnection();
  process.exit();
});
