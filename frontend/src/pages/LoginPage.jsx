import React, { useState } from "react";
import { login } from "../api/auth";

const initialState = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [form, setForm] = useState(initialState);

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await login(form);

      console.log("form:", form);
      console.log("response:", response.data);
    } catch (error) {
      console.error("error:", error.message);
    }
  }

  return (
    <div className="text-white min-h-screen bg-zinc-600">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="enter your email"
            value={form.email}
            onChange={handleForm}
            className="border-2 p-2 m-5 "
          />
        </div>
        <div>
          <label className="">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="enter your password"
            value={form.password}
            onChange={handleForm}
            className="border-2 p-2 m-5 "
          />
        </div>
        <button type="submit" className="border-2 px-6 py-2 bg-amber-950">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
