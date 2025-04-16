"use client";

import { signInUser } from "@/app/actions/authActions";
import { loginSchema, LoginSchema } from "@/lib/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const LoginForm = () => {
  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });
  const [error, setError] = useState("");

  const router = useRouter();

  const onSubmit = async (data: LoginSchema) => {
    const result = await signInUser(data);
    if (result.status === "success") {
      router.push("/members");
    } else {
      setError(result.error as string);
      toast.error(result.error as string, { position: "top-right" });
    }
  };
  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          {...register("email")}
          className="block border-2 w-full p-1 border-b-gray-700 rounded"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          {...register("password")}
          className="block border-2 w-full p-1 border-b-gray-700 rounded"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="mt-3 rounded bg-slate-500 font-semibold text-lg py-1 cursor-pointer text-white disabled:opacity-30"
      >
        {isSubmitting ? "Please wait..." : "Login"}
      </button>

      <p>{error}</p>
    </form>
  );
};

export default LoginForm;
