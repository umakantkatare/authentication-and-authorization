import User from "../models/user.model.js";
import {
  createUser,
  findUser,
  findUserById,
  findUserByUsername,
  saveUser,
} from "../repository/user.repository.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import crypto from "crypto";

const registerService = async (user) => {
  const { username, name, email, password } = user;
  if (!username || !name || !email || !password) {
    throw new Error("All fields are requireds");
  }

  const existingUser = await findUser(username, email);

  if (existingUser) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await createUser({
    username,
    name,
    email,
    password: hashedPassword,
  });

  return newUser;
};

const loginService = async (data) => {
  const { username, password } = data;

  if (!username || !password) {
    throw new Error("All fields are required");
  }

  const user = await findUserByUsername(username);

  if (!user) {
    throw new Error("User does not exists");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("password does not match");
  }

  const accessToken = JWT.sign(
    { userId: user._id },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    },
  );
  const refreshToken = JWT.sign(
    { userId: user._id },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    },
  );

  const hashedRefreshToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  user.refreshToken = hashedRefreshToken;
  // await user.save();
  await saveUser(user);

  return {
    user: {
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
    },
    accessToken,
    hashedRefreshToken,
  };
};

const profileService = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("user not found");
  }

  return user;
};

const logoutService = async (userId) => {
  console.log("logout:", userId);
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("user not found");
  }

  user.refreshToken = null;
  await saveUser(user);

  return user;
};

export { registerService, loginService, profileService, logoutService };
