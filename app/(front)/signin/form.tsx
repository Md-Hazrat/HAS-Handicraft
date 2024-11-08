"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Form = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // Retrieve query params with `useRouter` as a fallback if `useSearchParams` causes issues
  const callbackUrl = router.query.callbackUrl || "/";

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Redirect if user is already logged in
  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl);
    }
  }, [callbackUrl, router, session]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        router.push(`/signin?callbackUrl=${callbackUrl}&success=Account created`);
      } else {
        const data = await res.json();
        throw new Error(data?.message);
      }
    } catch (err: any) {
      const error = err?.message?.includes("E11000")
        ? "Email already exists"
        : err.message || "An error occurred";
      toast.error(error);
    }
  };

  return (
    <div className="max-w-sm mx-auto card bg-base-300 my-4">
      <div className="card-body">
        <h1 className="card-title">Register</h1>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="my-2">
            <label className="label" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className="input input-bordered w-full max-w-sm"
            />
            {errors.name && <div className="text-error">{errors.name.message}</div>}
          </div>

          <div className="my-2">
            <label className="label" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Invalid email",
                },
              })}
              className="input input-bordered w-full max-w-sm"
            />
            {errors.email && <div className="text-error">{errors.email.message}</div>}
          </div>

          <div className="my-2">
            <label className="label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className="input input-bordered w-full max-w-sm"
            />
            {errors.password && <div className="text-error">{errors.password.message}</div>}
          </div>

          <div className="my-2">
            <label className="label" htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) => value === getValues("password") || "Passwords do not match",
              })}
              className="input input-bordered w-full max-w-sm"
            />
            {errors.confirmPassword && <div className="text-error">{errors.confirmPassword.message}</div>}
          </div>

          <div className="my-2">
            <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
              {isSubmitting && <span className="loading loading-spinner"></span>}
              Register
            </button>
          </div>
        </form>

        <div className="divider"></div>
        <div>
          Already have an account?{" "}
          <Link className="link" href={`/signin?callbackUrl=${callbackUrl}`}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Form;
