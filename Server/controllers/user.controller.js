const User = require("../models/user.model");

async function createUser(req, res) {
  try {
    const user = new User(req.body);
    if (req.session.user) {
      req.session.user = user;
      req.session.save();
    }
    const data = await user.save();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
}

async function loginUser(req, res) {
  const respose = {
    user: null,
    isAuth: false,
    message: "Invalid username password",
  };
  // console.log(req.body);
  try {
    const data = await User.findUser(req.body.email, req.body.password);
    if (data) {
      req.session.user = data;
      req.session.isAuth = true;
      req.session.save((err) => {
        if (err) {
          console.log(err);
          res.json({ message: "session can not save" });
        } else {
          respose["user"] = data;
          respose["isAuth"] = true;
          respose["message"] = "Login Successfull";
          res.json(respose);
        }
      });
    } else {
      res.json(respose);
    }
  } catch (error) {
    console.log(error);
  }
}

async function getLogedInUser(req, res) {
  const session = req.session;
  let userSession = {
    user: session.user,
    isAuth: session.isAuth,
  };
  res.json(userSession);
}

module.exports = {
  createUser: createUser,
  loginUser: loginUser,
  getLogedInUser: getLogedInUser,
};
