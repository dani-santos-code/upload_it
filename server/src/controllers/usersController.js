const { User } = require("../models/User");

const createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.sendStatus(400);
  }
};

const userLogout = async (req, res) => {
  try {
    // here we are removing the currentToken from the users array
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    // here we are updating the User object with the tokens left
    res.send("Successfully logged out");
  } catch (e) {
    res.sendStatus(500).send();
  }
};

const userLogoutAll = async (req, res) => {
  try {
    // here we are removing the currentToken from the users array
    req.user.tokens = [];
    await req.user.save();
    // here we are updating the User object with the tokens left
    res.send("Successfully logged out");
  } catch (e) {
    res.sendStatus(500).send();
  }
};

const getUserProfile = async (req, res) => {
  res.send(req.user);
};

const deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).send({ message: `Successfully deleted ${req.user.name}.` });
  } catch (e) {
    res.status(500).send(e);
  }
};
module.exports = {
  createUser,
  userLogin,
  userLogout,
  userLogoutAll,
  getUserProfile,
  deleteUser,
};
