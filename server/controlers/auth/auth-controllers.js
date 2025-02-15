const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/Users");

// register

const Register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User is already exists with same email! Please try again",
      });

    const hashpassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      email,
      password: hashpassword,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Register successful",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "some problem from data base",
    });
  }
};

// login

const Login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const checkUser = await User.findOne({ email: email });
    console.log(checkUser);
    if (!checkUser)
      return res.json({
        success: false,
        message: "User Dosen't exists! Please Register First.",
      });

    const checkpass = await bcrypt.compare(password, checkUser.password);
    if (!checkpass)
      return res.status(201).json({
        success: false,
        message: "Incorrect password!Please Check Your password.",
      });
    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        username: checkUser.username,
      },
      "SWAMY_KEY"
    );
    // res.cookie('token', token, { httpOnly: true, secure: true }).json({
    //     success: true,
    //     message: "Login successful",
    //     user: {
    //         email: checkUser.email,
    //         role: checkUser.role,
    //         id: checkUser._id,
    //         username: checkUser.username
    //     }
    // })

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        username: checkUser.username,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "some problem from data base",
    });
  }
};

//logout

const Logout = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfull",
  });
};

//middleware

// const authMiddlewar = async (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token)
//     return res.status(401).json({
//       success: false,
//       message: "unathonticated user",
//     });

//   try {
//     const decoded = jwt.verify(token, "SWAMY_KEY");
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({
//       success: false,
//       message: "unathonticated user",
//     });
//   }
// };


const authMiddlewar = async (req, res, next) => {
  const Headers = req.headers['authorization']
  const token = Headers && Headers.split(' ')[1]
  if (!token)
    return res.status(401).json({
      success: false,
      message: "unathonticated user",
    });

  try {
    const decoded = jwt.verify(token, "SWAMY_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "unathonticated user",
    });
  }
};
module.exports = { Register, Login, Logout, authMiddlewar };
