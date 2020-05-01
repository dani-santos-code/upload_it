const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Image } = require("./Image");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// this is like saying the user id is the foreign key in the image schema
userSchema.virtual("images", {
  ref: "image",
  localField: "_id",
  foreignField: "owner",
});

// methods on the instance
// Do not declare methods using ES6 arrow functions (=>).
// Arrow functions explicitly prevent binding this

// this allows us to choose what to display to enduser
// this is the iunfo to be exposed publicly
userSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();

  delete userObj.password;
  delete userObj.tokens;

  return userObj;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "1264asn343dbajhsgdau", {
    expiresIn: "7d",
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// model methods
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to log in.");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to log in.");
  }
  return user;
};

//middleware to delete users images when user is removed
userSchema.pre("remove", async function (next) {
  const user = this;
  await Image.deleteMany({ owner: user._id });
  next();
});

// using middleware to be run before saving User to the database
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
    // here we are overriding the plain text password
  }
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = { User };
