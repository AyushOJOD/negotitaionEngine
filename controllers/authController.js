import Errorhandler from "../middlewares/error.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

export const register = async (req, res, next) => {
  try {
    const { userName, role, firstName, lastName, password, email } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return next(new Errorhandler("User already exists", 400));
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      let user = await User.create({
        userName,
        role,
        firstName,
        lastName,
        password: hashedPassword,
        email,
      });

      sendCookie(user, res, "User registered successfully", 201);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new Errorhandler("Invalid credentials", 401));
    } else {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return next(new Errorhandler("Invalid credentials", 401));
      } else {
        sendCookie(user, res, "User logged in successfully", 200);
      }
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "none",
    });

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};
