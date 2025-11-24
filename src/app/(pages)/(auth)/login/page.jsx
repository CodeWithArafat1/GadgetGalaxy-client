"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handelGoogleLogin = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl: "/" });
  };

  const handelLogin = async (data) => {
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password!");
        setLoading(false);
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center py-10">
      <Card className="w-full max-w-md mx-auto shadow-lg border-0 sm:border sm:border-gray-200 px-6 sm:px-10">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            GadgetGalaxy
          </CardTitle>
          <CardDescription>
            Enter your email & password below to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(handelLogin)}>
            {/* Email Field */}
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-base">
                Email
              </Label>
              <Input
                {...register("email", {
                  required: "Email is Required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                })}
                id="email"
                type="email"
                placeholder="admin@gmail.com"
                className={`h-11 ${
                  errors?.email && "border-red-500 focus-visible:ring-red-500"
                } focus-visible:ring-0 focus-visible:ring-offset-0`}
              />
              {errors?.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-sm text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <Input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                id="password"
                type="password"
                placeholder="******"
                className={`h-11 ${
                  errors?.password &&
                  "border-red-500 focus-visible:ring-red-500"
                } focus-visible:ring-0 focus-visible:ring-offset-0`}
              />
              {errors.password && (
                <span className="text-xs text-red-500 font-medium">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Global Error Message */}
            {error && (
              <div className="bg-foreground text-red-500 text-sm p-3 rounded-md text-center font-medium border border-red-200">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button className="w-full h-11 bg-foreground" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Button */}
          <div className="">
            <Button
              onClick={handelGoogleLogin}
              variant={"outline"}
              className="w-full cursor-pointer h-11 gap-2"
              disabled={loading}
            >
              <FcGoogle className="h-5 w-5" />
              Login with Google
            </Button>
          </div>

          <p className="text-center mt-5 text-sm text-muted-foreground">
            Do not have an account?{" "}
            <Link
              href="/register"
              className="text-primary font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
