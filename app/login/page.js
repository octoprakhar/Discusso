"use client";

import { useForm } from "react-hook-form";
import ErrorMessage from "../_components/ErrorMessage";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInUser } from "../_libs/actions";
import toast from "react-hot-toast";
import Link from "next/link";
import SmallSpinner from "../_components/SmallSpinner";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  //Something I need as an error array
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const result = await signInUser(formData);

      if (result?.error) {
        toast.error(result.error);
      } else if (result?.success) {
        toast.success(result.message || "User registered successfully");
        router.push("/");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
            type="password"
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
            <Link
              href={"/register"}
              className="text-indigo-400 underline cursor-pointer"
            >
              Register Now
            </Link>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`rounded-2xl text-center border-2 w-full cursor-pointer py-3 text-xl sm:text-2xl md:text-3xl xl:text-2xl transition-colors ${
            loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "hover:bg-indigo-500 hover:text-slate-100"
          } flex justify-center items-center`} // Added flex, justify-center, and items-center
        >
          {loading ? (
            <SmallSpinner size="w-6 h-6" color="border-sky-500" />
          ) : (
            "Login Now"
          )}
        </button>
      </form>
    </div>
  );
}
