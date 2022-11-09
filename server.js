const mongoose = require("mongoose");
const express = require("express");
const app = express();
const routes = require("./routes");
const session = require("express-session");
const passport = require("./passport");
const MongoStore = require("connect-mongo")(session);
const morgan = require("morgan");
const PORT = process.env.PORT || 3001;

// Connect to the Mongo DB

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/volunteam";
mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true },
  console.log("Connected to MongoDB!")
);

// Define middleware here
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// We need to use sessions to keep track of our user's login status
app.use(
    session({
      secret: "keyboard cat",
      store: new MongoStore({
        mongooseConnection: mongoose.connection
      }),
      resave: false,
      saveUninitialized: false
    })
  );