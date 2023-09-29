require('dotenv').config();

const Ably = require('ably');

async function connectToAbly() {
  const ably = new Ably.Realtime.Promise(process.env.ABLY_API_KEY);

  try {
    await ably.connection.once("connected");
    console.log('Connected to Ably!');
  } catch (error) {
    console.error('Error connecting to Ably:', error);
  }
}

connectToAbly(); 