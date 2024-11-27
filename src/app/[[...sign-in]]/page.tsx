"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

const LoginPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const role = user?.publicMetadata.role;

    if (role) {
      router.push(`/${role}`);
    }
  }, [user, router]);

  const handleSignIn = async () => {
    setIsLoading(true);
    // Simulate sign-in process; this is just an example.
    try {
      // Add your actual sign-in logic here if needed.
      console.log("Signing in...");
    } catch (err) {
      console.error("Sign-in failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Left Side: Colored Background */}
      <div className="md:w-1/2 w-full bg-blue-500 h-1/3 md:h-full"></div>

      {/* Right Side: Login Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center px-4 md:px-0">
        <SignIn.Root>
          <SignIn.Step
            name="start"
            className="bg-white p-8 md:p-12 rounded-md flex flex-col gap-4 w-full max-w-md"
          >
            <div className="flex-start ">
              <Image src="/logo.png" alt="Logo" width={150} height={150} />
            </div>
            <h2 className="text-gray-400">Sign in to your account</h2>
            <Clerk.GlobalError className="text-sm text-red-400" />
            <Clerk.Field name="identifier" className="flex flex-col gap-2">
              <Clerk.Label className="text-xs text-gray-500">
                Username
              </Clerk.Label>
              <Clerk.Input
                type="text"
                required
                className="p-2 rounded-md ring-1 ring-gray-300"
              />
              <Clerk.FieldError className="text-xs text-red-400" />
            </Clerk.Field>
            <Clerk.Field name="password" className="flex flex-col gap-2">
              <Clerk.Label className="text-xs text-gray-500">
                Password
              </Clerk.Label>
              <div className="relative">
                <Clerk.Input
                  type={showPassword ? "text" : "password"}
                  required
                  className="p-2 rounded-md ring-1 ring-gray-300 w-full"
                />
                <button
                  type="button"
                  className="absolute top-2.5 right-2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              <Clerk.FieldError className="text-xs text-red-400" />
            </Clerk.Field>
            <button
              onClick={handleSignIn}
              disabled={isLoading}
              className={`flex items-center justify-center bg-blue-500 text-white my-1 rounded-md text-sm p-[10px] ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                "Sign In"
              )}
            </button>
          </SignIn.Step>
        </SignIn.Root>
      </div>
    </div>
  );
};

export default LoginPage;
