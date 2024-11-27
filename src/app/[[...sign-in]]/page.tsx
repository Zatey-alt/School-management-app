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

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const role = user?.publicMetadata.role;
      if (role) {
        router.push(`/${role}`);
      }
    }
  }, [isLoaded, isSignedIn, user, router]);
  

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Left Side */}
      <div className="md:w-1/2 w-full bg-blue-500 h-1/3 md:h-full"></div>

      {/* Right Side: Login Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center px-4 md:px-0">
        <SignIn.Root>
          <SignIn.Step
            name="start"
            className="bg-white p-8 md:p-12 rounded-md flex flex-col gap-4 w-full max-w-md"
          >
            <div className="flex justify-center">
              <Image src="/logo.png" alt="Logo" width={150} height={150} />
            </div>
            <h2 className="text-gray-400 text-center">Sign in to your account</h2>
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
            <SignIn.Action
              submit
              className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px] flex justify-center"
            >
              Sign In
            </SignIn.Action>
          </SignIn.Step>
        </SignIn.Root>
      </div>
    </div>
  );
};

export default LoginPage;
