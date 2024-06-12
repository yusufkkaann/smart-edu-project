const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");

const app = express();

//connect db
mongoose.connect("mongodb://127.0.0.1:27017/smartedu-db").then(() => {
  console.log("DB Connected");
});

const port = 3000;

//template engines
app.set("view engine", "ejs");

global.userIN = null;

//middleware
app.use(express.static("public")); //for css files
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/smartedu-db", // MongoDB bağlantı URL'si
    }),
    cookie: { maxAge: 3600000 }, // 1 saat (milisaniye cinsinden)
  })
);

app.use("*", (req, res, next) => {
  userIN = req.session.userID;

  next();
});

//routes
app.use("/", pageRoute); //route işlemini başka bir dosyadan buraya taşıdık
app.use("/courses", courseRoute); //route işlemini başka bir dosyadan buraya taşıdık
app.use("/categories", categoryRoute); //route işlemini başka bir dosyadan buraya taşıdık
app.use("/users", userRoute); //route işlemini başka bir dosyadan buraya taşıdık
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
