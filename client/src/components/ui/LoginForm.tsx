"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { Label } from "./Label";
import { Input } from "./Input";
import { cn } from "../../utils/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { Link } from "react-router-dom";

// Props Interface
interface LoginFormProps {
  formData: {
    email: string;
    password: string;
  };
  setFormData: Dispatch<
    SetStateAction<{
      email: string;
      password: string;
    }>
  >;
}

export function LoginForm({ formData, setFormData }: LoginFormProps) {
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    // Update form data
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Clear error messages when user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
  };

  // Validation Logic
  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Form submitted successfully:", formData);
  };

  return (
    <div className="max-w-md w-full mx-auto p-8 bg-white dark:bg-black rounded-md shadow-input">
      <h1 className="text-xl font-bold text-center dark:text-neutral-200">
        Login
      </h1>

      <form onSubmit={handleSubmit} className="my-8">
        {/* Email Field */}
        <LabelInputContainer>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="demo@gmail.com"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </LabelInputContainer>

        {/* Password Field */}
        <LabelInputContainer>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </LabelInputContainer>

        <p className="text-center text-[10px] text-neutral-700 dark:text-neutral-300">
          Don’t have an account? <Link to="/signup">Signup</Link>
        </p>

        <button
          type="submit"
          className="mt-4 w-full h-10 rounded-md bg-gradient-to-br from-black to-neutral-600 text-white font-medium hover:opacity-90"
        >
          Continue &rarr;
        </button>

        <Divider />

        <p>
          <OAuthButton
            icon={<IconBrandGoogle />}
            label="Continue with Google"
          />
        </p>
        <p className="mt-2">
          <OAuthButton
            icon={<IconBrandGithub />}
            label="Continue with GitHub"
          />
        </p>
      </form>
    </div>
  );
}

// Reusable Components
const LabelInputContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4 flex flex-col space-y-2">{children}</div>
);

const Divider = () => (
  <div className="my-6 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
);

const OAuthButton = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <button className="w-full h-10 flex items-center justify-center space-x-2 rounded-md bg-gray-100 dark:bg-zinc-800 text-neutral-700 dark:text-neutral-300 hover:opacity-90">
    {icon}
    <span>{label}</span>
  </button>
);
