import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { registerUser } from "../redux/thunks/authThunk";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm();
  const [phone, setPhone] = useState("");
  const navigate = useNavigate()

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    data.phone_number = phone; 
    dispatch(registerUser(data))
      .unwrap()
      .then(() => {
        toast.success("Registration successful! Please Verify your email");
        navigate('/')
      })
      .catch((error) => {
        console.log(error);
        toast.error("Registration failed: " + JSON.stringify(error.message));
      });
  };

  // Password validation regex
  const passwordValidation =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  // Name Validation no numbers or spaces
  const nameValidation = /^[A-Za-z]+$/;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="max-w-md w-full p-6 shadow-md bg-white">
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 text-center">
            Register
          </h2>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div>
              <Label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </Label>
              <Input
                id="name"
                type="text"
                {...register("name", {
                  required: "Name is required",
                  pattern: {
                    value: nameValidation,
                    message: "Name should not contain numbers or spaces.",
                  },
                })}
                className="mt-1"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                className="mt-1"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <Label
                htmlFor="phone_number"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </Label>
              <PhoneInput
                international
                defaultCountry="IN"
                value={phone}
                onChange={setPhone}
                className="mt-1 border p-2"
              />
              {errors.phone_number && (
                <p className="text-sm text-red-500">{errors.phone_number.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: passwordValidation,
                    message:
                      "Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 symbol, and be at least 8 characters long.",
                  },
                })}
                className="mt-1"
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <Label
                htmlFor="confirm_password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </Label>
              <Input
                id="confirm_password"
                type="password"
                {...register("confirm_password", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
                className="mt-1"
              />
              {errors.confirm_password && (
                <p className="text-sm text-red-500">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              Register
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
