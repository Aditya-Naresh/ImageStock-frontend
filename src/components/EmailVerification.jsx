import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { emailVerification } from "../redux/thunks/authThunk";
import toast from "react-hot-toast";
const EmailVerification = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleVerifyEmail = () => {
    dispatch(emailVerification({ uid: uid, token: token }))
    .unwrap()
    .then(() => {
        toast.success("Email Verification successful!")
        navigate('/')
    })
    .catch((error) => {
        console.log(error);
        toast.error("Verification failed: "+ JSON.stringify(error.message))
    })
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Email Verification
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Click the button below to verify your email address.
        </p>
        <Button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={handleVerifyEmail}
        >
          Verify Email
        </Button>
      </div>
    </div>
  );
};

export default EmailVerification;
