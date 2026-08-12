import { cookieOptions } from "../config/cookie.config.js";
import {
  loginService,
  logoutService,
  profileService,
  registerService,
} from "../services/auth.service.js";

const register = async (req, res) => {
  try {
    const user = await registerService(req.body);

    res.status(201).json({
      success: true,
      message: "user registered successfully!",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await loginService(req.body);

    res.cookie("accessToken", user.accessToken, cookieOptions);
    res.status(200).json({
      success: true,
      message: "user login successfully!",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const googleCallback = async (req, res) => {
  try {
    const user = req.user;

    return res.redirect(`http://localhost:5173/`);
  } catch (error) {
    console.error(error);

    return res.redirect(`http://localhost:5173/login?error=google_auth_failed`);
  }
};

const profile = async (req, res) => {
  try {
    const user = await profileService(req.user._id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    await logoutService(req.user._id);

    res.clearCookie("accessToken", cookieOptions).status(200).json({
      success: true,
      message: "user logout successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { register, login, googleCallback, profile, logout };
