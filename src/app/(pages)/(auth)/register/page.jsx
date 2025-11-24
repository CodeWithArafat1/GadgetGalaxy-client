"use client";
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
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const Register = () => {
  const router = useRouter();

  const googleLogin = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handelLogin = async (data) => {
    console.log("form data", data);
  };
  return (
    <div className="my-20">
      <Card className="w-full max-w-md mx-auto shadow-lg border-0 sm:border sm:border-gray-200 px-10">
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
            <div className="grid gap-2">
              <Label htmlFor="displayName" className="text-base">
                Full Name
              </Label>
              <Input
                {...register("displayName", {
                  required: "Full Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
                id="displayName"
                type="text"
                placeholder="Arafat Nill"
                className={`h-11 ${
                  errors?.displayName && "border border-red-500"
                } focus-visible:ring-0 focus-visible:ring-offset-0 `}
              />

              {errors.displayName && (
                <span className="text-xs text-red-500 font-medium">
                  {errors.displayName.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="photoURL" className="text-base">
                Photo URL
              </Label>
              <Input
                {...register("photoURL", {
                  required: "Photo URL Name is required",
                })}
                id="photoURL"
                type="text"
                placeholder="https://example.com/profile.png"
                className={`h-11 ${
                  errors?.photoURL && "border border-red-500"
                } focus-visible:ring-0 focus-visible:ring-offset-0 `}
              />

              {errors.photoURL && (
                <span className="text-xs text-red-500 font-medium">
                  {errors.photoURL.message}
                </span>
              )}
            </div>
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
                placeholder="arafat@example.com"
                className={`h-11 ${
                  errors?.email && "border border-red-500"
                } focus-visible:ring-0 focus-visible:ring-offset-0 `}
              />
              {errors?.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-base">
                Password
              </Label>
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
                placeholder="*****"
                className={`h-11 ${
                  errors?.password && "border border-red-500"
                } focus-visible:ring-0 focus-visible:ring-offset-0 `}
              />

              {errors.password && (
                <span className="text-xs text-red-500 font-medium">
                  {errors.password.message}
                </span>
              )}
            </div>
            <Button className="w-full h-11 cursor-pointer">Register Now</Button>
          </form>
          <div className="">
            <Button
              onClick={googleLogin}
              variant={"outline"}
              className="w-full mt-5 cursor-pointer h-11"
            >
              <FcGoogle className="h-5 w-5" />
              Continue with google
            </Button>
          </div>

          <div className="text-center mt-5">
            <Label className="">
              Have an account ?{" "}
              <Link className="hover:underline" href="/login">
                login
              </Link>
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
