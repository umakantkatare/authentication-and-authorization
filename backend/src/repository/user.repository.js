import User from "../models/user.model.js";

export const findUserById = async (id) => {
  return await User.findById(id);
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email: email.toLowerCase() });
};

export const findUserByUsername = async (username) => {
  return await User.findOne({ username }).select("+password");
};

export const findUser = async (username, email) => {
  return await User.findOne({
    $or: [{ username }, { email: email.toLowerCase() }],
  });
};

export const createUser = async (userData) => {
  return await User.create(userData);
};

export const updateUser = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

export const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

export const updateRefreshToken = async (id, refreshToken) => {
  return await User.findByIdAndUpdate(id, { refreshToken }, { new: true });
};

export const removeRefreshToken = async (id) => {
  return await User.findByIdAndUpdate(
    id,
    { $unset: { refreshToken: 1 } },
    { new: true },
  );
};

export const saveUser = async (user) => {
  return await user.save();
};
