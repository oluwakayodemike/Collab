require('dotenv').config();

const Ably = require("ably");
const ably = new Ably.Realtime.Promise({
  authUrl: "https://ably.com/ably-auth/token/docs",
});

// wrapper for async functions
const ablyRealtimePromiseExample = async () => {
    
  // Connect to Ably
  await ably.connection.once("connected");
  console.log("Connected to Ably!");

};