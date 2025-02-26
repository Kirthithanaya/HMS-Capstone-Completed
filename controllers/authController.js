import User from "../models/userSchema.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


// Generate JWT Token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
  };
  
  // Register User
  export const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
     console.log(req.body);
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });
  
    res.status(201).json({ message: "User registered successfully" });
  };
  
  // Login User
  export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  
    const token = generateToken(user._id, user.role);
    res.json({ token, role: user.role });
  };
  
  //forgot password

export const forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      const transporter = nodemailer.createTransport({
        //Gmail or yahoo or outlook
        service: "Gmail",
        auth: {
          user: process.env.PASS_MAIL,
          pass: process.env.PASS_KEY,
        },
      });
      const mailOptions = {
        from: process.env.PASS_MAIL,
        to: user.email,
        subject: "Password Reset Link",
        text: `You are receiving this because you have requested the reset of the password for your account
        please click the following link or paste it into your browser to complete the process
         https://localhost:5000/api/auth/reset-password/${user._id}/${token}`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res
            .status(500)
            .json({ message: "Internal Server error in the sending mail" });
        } else {
          res.status(200).json({ message: "Email send Successfully" });
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  //Reset Password
  
  export const resetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: "Invalid Token" });
      } else {
        bcrypt
          .hash(password, 10)
          .then((hash) => {
            User.findByIdAndUpdate({ _id: id }, { password: hash })
              .then((ele) => res.send({ status: "Success" }))
              .catch((err) => res.send({ status: err }));
          })
          .catch((err) => res.send({ status: err }));
      }
    });
  };
  
  // Get Logged-in User Profile
  export const getProfile = async (req, res) => {
    res.json(req.user);
  };
  
  // Get All Users (Admin Only)
  export const getAllUsers = async (req, res) => {
    const users = await User.find().select("-password");
    res.json(users);
  };
  
  // Update User Role (Admin Only)
  export const updateUserRole = async (req, res) => {
    const { role } = req.body;
    const user = await User.findById(req.params.id);
  
    if (!user) return res.status(404).json({ message: "User not found" });
  
    user.role = role;
    await user.save();
    res.json({ message: "User role updated successfully" });
  };
  
  // Delete User (Admin Only)
  export const deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  };







