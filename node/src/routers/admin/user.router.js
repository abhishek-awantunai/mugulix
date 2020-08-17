const express = require("express");
const router = new express.Router();
const auth = require("./../../middlewares/auth");
const User = require("./../../models/admin/user");

router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ status: true, data: { user, token } });
  } catch (err) {
    res.status(400).send({ status: false, error: err.message });
  }
});

router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );

    await req.user.save();
    res.send({ status: true, message: "user logged out successfully" });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/logout-all", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    req.token = "";

    await req.user.save();
    res.send({
      status: true,
      message: "user logged out from all devices successfully",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/sign-up", async (req, res) => {
  try {
    const user = await User.create({ ...req.body });

    if (!user) {
      res.send("Something went wrong unable to create user");
    }

    const token = await user.generateAuthToken();
    res.send({
      status: true,
      data: { user, token, message: "User created successfully" },
    });
  } catch (err) {
    if (err.code == 11000) {
      res.status(400).send({
        status: false,
        message: "Can't create account as user already exists",
      });
    }
    res.status(400).send({
      status: false,
      message: err.message,
    });
  }

  // USING PROMISES

  // user
  //   .save()
  //   .then((suc) => {
  //     res.send(user);
  //   })
  //   .catch((err) => {
  //     res.status(400).send(err);
  //   });
});

router.get("/users", auth, async (req, res) => {
  try {
    const users = await User.find();
    res.send({ status: true, users });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

router.get("/user/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      res.status(404).send({ status: false, message: "user does't exist" });
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
