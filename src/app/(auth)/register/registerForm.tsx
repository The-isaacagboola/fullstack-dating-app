"use client";
import { registerUser } from "@/app/actions/authActions";
import { registerSchema, RegisterSchema } from "@/lib/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const submitFn = async (data: RegisterSchema) => {
    console.log(data);
    const result = await registerUser(data);
    console.log(result);

    if (result.status === "success") {
      console.log("User registered successfull:::", result.data);
    } else {
      console.log("Unable to register User. Try again");
      throw new Error("Unable to register User. Try again");
    }
  };

  console.log(errors);

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(submitFn)}>
      <label htmlFor="name">Name:</label>
      <input
        {...register("name")}
        className="block border-2 p-1 border-b-gray-700 rounded mb-2"
      />
      {errors.name && <p>Name is required</p>}

      <label htmlFor="email">Email:</label>
      <input
        className="block border-2 p-1 border-b-gray-700 rounded mb-2"
        {...register("email")}
      />
      {errors.email && <p>Email is required</p>}

      <label htmlFor="password">Password:</label>
      <input
        className="block border-2 p-1 border-b-gray-700 rounded"
        {...register("password")}
      />
      {errors.password && <p>Password must be provided</p>}

      <button
        type="submit"
        className="mt-3 rounded bg-slate-500 font-semibold text-lg py-1 cursor-pointer text-white disabled:opacity-30"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
