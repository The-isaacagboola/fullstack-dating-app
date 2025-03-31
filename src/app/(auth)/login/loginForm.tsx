"use client";

import { useReducer } from "react";

const initialState = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [state, dispatch] = useReducer((prev, action) => {
    return { ...prev, [action.type]: action.payload };
  }, initialState);

  return (
    <form action="" className="flex flex-col gap-2">
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        className="block border-2 p-1 border-b-gray-700 rounded mb-2"
        value={state.email}
        onChange={(e) => dispatch({ type: "email", payload: e.target.value })}
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        className="block border-2 p-1 border-b-gray-700 rounded"
        value={state.password}
        onChange={(e) =>
          dispatch({ type: "password", payload: e.target.value })
        }
      />
      <button
        type="submit"
        className="mt-3 rounded bg-slate-500 font-semibold text-lg py-1 cursor-pointer text-white disabled:opacity-30"
        disabled={state.email && state.password ? false : true}
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
