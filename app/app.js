const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo")(session);

// load config file
dotenv.config({ path: "./config.env" });

// init app
const app = express();

// passport config
require("./config/passport")(passport);

// log to console in development using morgan package
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// allows access to the body object of the request
app.use(express.json());

// exposes static resources in public folder
app.use(express.static("public"));

// set express CORS options
const corsOptions = {
  origin: process.env.ORIGIN ?? "http://localhost:3000",
  optionsSuccessStatus: 200,
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Accept-Language",
    "Content-Language",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

// enable CORS middleware
app.use(cors(corsOptions));

// set view engine to pug - template engine
app.set("view engine", "pug");

// set template directory as ./views
app.set("views", `${__dirname}/views`);

// Sessions middleware
app.use(
  session({
    store: new MongoStore({ url: process.env.MONGO_CONNECTION_STRING }),
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "development" ? false : true,
      maxAge: 1000 * 60 * 1440,
    },
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/api/v1", require("./routes/api"));

// error handler middleware
app.use((error, req, res, next) => {
  console.error(error);
  res
    .status(500)
    .send(
      `HTTP 500 - There is an issue with the server, please try again later.`
    );
});

module.exports = app;
