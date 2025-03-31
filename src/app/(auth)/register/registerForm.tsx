"use client";
import { RegisterSchema, registerUser } from "@/app/actions/authActions";
import { useReducer } from "react";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const RegisterForm = () => {
  const [state, dispatch] = useReducer((prev, action) => {
    return { ...prev, [action.type]: action.payload };
  }, initialState);

  const handleSubmit = async (data: RegisterSchema) => {
    const result = await registerUser(data);
    console.log(result);

    if (result.status === "success") {
      console.log("User registered successfull:::", result.data);
    } else {
      console.log("Unable to register User. Try again");
      throw new Error("Unable to register User. Try again");
    }
  };

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(state);
      }}
    >
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        className="block border-2 p-1 border-b-gray-700 rounded mb-2"
        value={state.name}
        onChange={(e) => dispatch({ type: "name", payload: e.target.value })}
      />

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
        disabled={state.name && state.email && state.password ? false : true}
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
