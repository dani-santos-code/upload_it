const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const isAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedPayLoad = jwt.verify(token, "1264asn343dbajhsgdau");
    const user = await User.findOne({
      _id: decodedPayLoad._id,
      "tokens.token": token,
    });
    // since the token can be valid but expired,
    //we're checking if the token is still valid or expired/deleted
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    // in the middleware, we're alreasdy querying the user
    // so we can append the user object to subsequent requests
    // if the user is Auth
    next();
  } catch (e) {
    res.status(401).send({ error: "Please, sign in." });
  }
};

module.exports = { isAuth };
