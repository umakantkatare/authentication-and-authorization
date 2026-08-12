import React, { useState } from "react";
import { google, signup } from "../api/auth.js";
import { useNavigate } from "react-router-dom";
const initialState = {
  username: "",
  name: "",
  email: "",
  password: "",
};

const SignupPage = () => {
  const navigate = useNavigate();
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
      navigate("/login");
    } catch (error) {
      console.error("error message:", error.message);
    }
    setForm(initialState);
  }

  async function handleGoogleSignup() {
    try {
      const response = await google();
      console.log("response data:", response);
      navigate("/");
    } catch (error) {
      console.error("error message:", error.message);
    }
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
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full rounded-lg bg-white py-3 font-semibold text-zinc-900 transition hover:bg-zinc-100 active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M21.35 12.23c0-.79-.07-1.55-.23-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42Z"
              />
              <path
                fill="#34A853"
                d="M12 21.8c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.29v2.53A9.74 9.74 0 0 0 12 21.8Z"
              />
              <path
                fill="#FBBC05"
                d="M6.54 13.89A5.85 5.85 0 0 1 6.23 12c0-.66.11-1.3.31-1.89V7.58H3.29A9.76 9.76 0 0 0 2.25 12c0 1.58.38 3.07 1.04 4.42l3.25-2.53Z"
              />
              <path
                fill="#EA4335"
                d="M12 6.08c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.19 14.63 2.2 12 2.2a9.74 9.74 0 0 0-8.71 5.38l3.25 2.53C7.31 7.8 9.46 6.08 12 6.08Z"
              />
            </svg>
            Sign up with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
