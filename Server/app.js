const express = require("express");
const cors = require("cors");
app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./routes/user.router");
const quizeRoutes = require("./routes/quize.router");

const sessionStore = new MySQLStore({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "gaurav",
  database: "quizeapplication",
  createDatabaseTable: true,
});

app.use(
  session({
    secret: "super-secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);

app.use("/user", userRoutes);
app.use("/quize", quizeRoutes);

app.listen(3000, () => {
  console.log("Server started at 3000");
});
