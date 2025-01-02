import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/thunks/authThunk";
import toast from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const resultAction = await dispatch(loginUser(data));

    try {
      if (loginUser.fulfilled.match(resultAction)) {
        toast.success("Login successful");
        navigate("/");
      } else if (loginUser.rejected.match(resultAction)) {
        const errorMessage = resultAction.payload?.error || "Login failed";
        toast.error(errorMessage);
        console.log("login error: ", resultAction.payload);
      }
    } catch (error) {
      toast.error("An unexpected error occured");
      console.error("Unexpected error during login: ", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div>
              <Label htmlFor="email" className="block text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className={`mt-1 w-full border ${
                  errors.email ? "border-red-500 focus:ring-red-500" : ""
                }`}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <Label htmlFor="password" className="block text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`mt-1 w-full border ${
                  errors.password ? "border-red-500 focus:ring-red-500" : ""
                }`}
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
