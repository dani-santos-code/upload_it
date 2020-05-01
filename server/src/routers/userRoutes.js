// USER ROUTES
const express = require("express");
const router = new express.Router();
const { isAuth } = require("../middleware/auth");

const {
  createUser,
  userLogin,
  userLogout,
  userLogoutAll,
  getUserProfile,
  deleteUser,
} = require("../controllers/usersController");

router
  .post("/users", createUser)
  .post("/users/login", userLogin)
  .post("/users/logout", isAuth, userLogout)
  .post("/users/logoutall", isAuth, userLogoutAll)
  .get("/users/me", isAuth, getUserProfile)
  .delete("/users/me", isAuth, deleteUser);

module.exports = router;
