"use client";

import React, { useState, Dispatch, SetStateAction } from "react";
import { Label } from "./Label";
import { Input } from "./Input";
import { cn } from "../../utils/utils";
import { useSignup } from "../../context/SignupContext";
import { Link, useNavigate } from "react-router-dom";
import { useCaptainSignup } from "../../context/CaptainSignupContext";
import { color } from "framer-motion";

// Define props for SignupFormDemo
interface CaptainSignupFormDemoProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    capacity: string;
    vehicleType: string;
    color: string;
    plate: string;
  };
  setFormData: Dispatch<
    SetStateAction<{
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      password: string;
      capacity: string;
      vehicleType: string;
      color: string;
      plate: string;
    }>
  >;
}

export function CaptainSignupForm({
  formData,
  setFormData,
}: CaptainSignupFormDemoProps) {
  const navigate = useNavigate();

  // Error state for form validation
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    capacity: "",
    vehicleType: "",
    color: "",
    plate: "",
  });

  const { setSignupData } = useCaptainSignup();

  // Validation function
  const validateInputs = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      capacity: "",
      vehicleType: "",
      color: "",
      plate: "",
    };
    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!/^\d{10,}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be at least 10 digits";
      isValid = false;
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateInputs()) {
      setSignupData(formData);
      navigate("/captain-upload");
    }
  };

  const vehicleTypes = ["auto", "car", "motorcycle"];

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h1 className="font-bold text-xl text-center text-neutral-800 p-5 dark:text-neutral-200">
        Signup as captain
      </h1>

      <form className="my-8 border-white" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              placeholder="First name"
              type="text"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">{errors.firstName}</span>
            )}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              placeholder="Last name"
              type="text"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm">{errors.lastName}</span>
            )}
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="demo@gmail.com"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            placeholder="+91"
            type="number"
            value={formData.phone}
            onChange={handleInputChange}
          />
          {errors.phone && (
            <span className="text-red-500 text-sm">{errors.phone}</span>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password}</span>
          )}
        </LabelInputContainer>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstName">Colour of vehicle</Label>
            <Input
              id="color"
              placeholder="Enter colour of vehicle"
              type="text"
              value={formData.color}
              onChange={handleInputChange}
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">{errors.firstName}</span>
            )}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastName">Vehicle no</Label>
            <Input
              id="plate"
              placeholder="Enter the plate number"
              type="text"
              value={formData.plate}
              onChange={handleInputChange}
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm">{errors.lastName}</span>
            )}
          </LabelInputContainer>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstName">Capacity</Label>
            <Input
              id="capacity"
              placeholder="Enter vehicle capacity "
              type="text"
              value={formData.capacity}
              onChange={handleInputChange}
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">{errors.capacity}</span>
            )}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="vehicleType">Vehicle Type</Label>
            <select
              id="vehicleType"
              value={formData.vehicleType}
              onChange={(e) => {
                setFormData((prevData) => ({
                  ...prevData,
                  vehicleType: e.target.value,
                }));
              }}
              className="p-2 border border-gray-100  bg-black text-white rounded-md w-full"
            >
              <option className="rounded-xl" value="">
                Select vehicle type
              </option>
              {vehicleTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
            {errors.vehicleType && (
              <span className="text-red-500 text-sm">{errors.vehicleType}</span>
            )}
          </LabelInputContainer>
        </div>
        <p className="text-white text-[12px] mb-5 ml-2 text-center">
          Already have an account? <Link to="/captain-login">login</Link>{" "}
        </p>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium"
          type="submit"
        >
          Continue
        </button>
        <div className="flex justify-center mb-2 mt-4">
          <Link
            className="h-10 w-[500px] text-center flex items-center justify-center rounded-md bg-gradient-to-br from-black to-neutral-600 text-white font-medium hover:opacity-90"
            to="/signup"
          >
            Signup as user &rarr;
          </Link>
        </div>
      </form>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
