"use client";

import { useForm } from "react-hook-form";
import ErrorMessage from "../_components/ErrorMessage";

export default function Page() {
  //Something I need as an error array
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    //Sending data to backend
  };

  return (
    <div className="w-80 min-h-96 sm:w-[80vw] lg:w-[70vw] xl:w-[50vw] 2xl:w-[40vw] mx-auto my-20 md:my-36 xl:my-20 rounded-2xl border-2 px-4 py-8 space-y-2 bg-slate-100">
      <h1 className="text-center text-3xl sm:text-4xl md:text-5xl xl:text-3xl font-bold">
        Log In
      </h1>
      <form
        className="flex flex-col justify-center gap-28"
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
      >
        <div className="space-y-4">
          {/* Email block */}
          <input
            placeholder="Enter an email..."
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Email is not valid",
              },
            })}
            className="w-full h-12 sm:h-16 md:h-20 xl:h-16 rounded-md border-2 p-2 text-lg sm:text-2xl md:text-3xl xl:text-2xl"
          />
          {errors.email && <ErrorMessage message={errors.email.message} />}
          {/* password block */}
          <input
            placeholder="Enter a password..."
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            className="w-full h-12 sm:h-16 md:h-20 xl:h-16 rounded-md border-2 p-2 text-lg sm:text-2xl md:text-3xl xl:text-2xl"
          />
          {errors.password && (
            <ErrorMessage message={errors.password.message} />
          )}
          <div className="text-sm sm:text-base md:text-lg lg:text-xl">
            <span>New to Discusso? </span>
            <button className="text-indigo-400 underline cursor-pointer">
              Register Now
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="rounded-2xl text-center border-2 w-full cursor-pointer hover:bg-indigo-500 hover:text-slate-100 py-3 text-xl sm:text-2xl md:text-3xl xl:text-2xl"
        >
          Login
        </button>
      </form>
    </div>
  );
}
