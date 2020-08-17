require("dotenv").config();
const mongoose = require("mongoose");


mongoose.connect(process.env.CONNECTION_URL, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
});
