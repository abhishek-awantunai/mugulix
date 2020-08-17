require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("./../models/admin/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.UNIQUE_KEY);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("Not a good token can't find user");
    }

    req.token = token;
    req.user = user;

    next();
  } catch (err) {
    res.status(401).send({ error: "Unauthorized acces please Authenticate" });
  }
};

module.exports = auth;
