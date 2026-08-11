import React, { useState } from "react";
import { signup } from "../api/auth.js";
import { useNavigate } from "react-router-dom";
const initialState = {
  username: "",
  name: "",
  email: "",
  password: "",
};

const SignupPage = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialState);

  function handleForm(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await signup(form);
      console.log("response data:", response);
      navigate('/login')

    } catch (error) {
      console.error("error message:", error.message);
    }
    setForm(initialState);
  }

  console.log("form", form);

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Create Account
        </h2>

        <p className="text-zinc-400 text-center mb-8">
          Fill in your details to get started
        </p>

        <div className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-zinc-300 mb-2"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              name="username"
              value={form.username}
              onChange={handleForm}
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-zinc-300 mb-2"
            >
              Full Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              name="name"
              value={form.name}
              onChange={handleForm}
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-300 mb-2"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              name="email"
              value={form.email}
              onChange={handleForm}
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-300 mb-2"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              name="password"
              value={form.password}
              onChange={handleForm}
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-500 active:scale-[0.98]"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
