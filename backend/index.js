const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("./models/user.js");
const Link = require("./models/link.js");
const utils = require("./utils");

// initialise dotenv
dotenv.config();

// connect to database
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once("open", () => {
  console.log("Connected to database successfully");
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); 

if (process.env.NODE_ENV === "production") {

  app.use(express.static(path.join(__dirname, "public", "min-link")));

  app.get("*", (req, res) => {

  res.sendFile(path.resolve(__dirname, "public", "min-link", "index.html"));

 });

}

// app.use(express.static(path.join(__dirname, "public", "min-link"))); 

// app.get("//*", function (req, res) { 

//   res.sendFile(path.join(__dirname, "public", "min-link", "index.html")); 

// }); 

app.post("/login", async function (req, res) {
  const { email, password } = req.body;

  // return 400 status if email/password is not exist
  if (!email || !password) {
    return res.status(400).json({
      error: true,
      message: "Username or Password required.",
    });
  }
  let user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({
      error: true,
      message: "Username or Password required.",
    });
  const pwd = await bcrypt.compare(password, user.password);

  // return 401 status if the credential is not match.
  if (user.email !== email || !pwd) {
    return res.status(401).json({
      error: true,
      message: "Username or Password is Wrong.",
    });
  }

  // generate token
  const token = utils.generateToken(user);

  // get basic user details
  const userObj = utils.getCleanUser(user);

  // return the token along with user details
  return res.json({ user: userObj, token });
});

// verify the token
app.get("/verifyToken", function (req, res) {
  // check header or url parameters or post parameters for token
  let token = req.body.token || req.query.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required.",
    });
  }

  // check token that was passed by decoding token using secret
  jwt.verify(token, process.env.JWT_SECRET, async function (err, user) {
    if (err)
      return res.status(401).json({
        error: true,
        message: "Invalid token.",
      });

    const userData = await User.findOne({ email: user.email });
    // return 401 status if the userId does not match.
    if (user.email !== userData.email) {
      return res.status(401).json({
        error: true,
        message: "Invalid user.",
      });
    }
    // get basic user details
    let userObj = utils.getCleanUser(userData);
    return res.status(200).json({ user: userObj, token });
  });
});

app.post("/register", async (req, res, next) => {
  const { email, password, name } = req.body;
  if (email && password) {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exist" });
    } else {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        let user = new User({
          name: name,
          email: email,
          password: hashedPassword,
        });
        const crUser = await user.save();

        return res
          .status(200)
          .json({ name: crUser.name, email: crUser.email, _id: crUser._id });
      } catch (err) {
        return res.status(500).json({ message: "failed to create user" });
      }
    }
  }
});

app.post("/short", async (req, res) => {
  const { full, email } = req.body;
  try {
    const link = new Link({
      full,
      email,
    });
    const l = await link.save();
    return res.status(200).json(l);
  } catch (error) {
    res.status(500).json({ message: "unable to shorten link" });
  }
});

app.get("/shorts", async (req, res) => {
  const ml = req.query.email;
  const links = await Link.find({ email: ml });
  return res.status(200).json(links);
});

app.get("/:short", async (req, res) => {
  const { short } = req.params;
  try {
    const link = await Link.findOne({ short });
    res.redirect(link.full);
  } catch (error) {
    res.status(500).json({ message: "unable to get links" });
  }
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log("App is running on PORT:", PORT));
