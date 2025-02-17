import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    gender: "",
    maritalStatus: "",
    country: "",
    zipCode: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f0ff] p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-3xl p-8 grid grid-cols-2 gap-6 bg-white shadow-lg rounded-lg">
        <div className="space-y-6">
          <Input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="bg-gray-100 border border-gray-300 rounded-md h-12 px-4" />
          <Input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="bg-gray-100 border border-gray-300 rounded-md h-12 px-4" />
          <Input type="date" name="birthday" placeholder="Birthday" value={formData.birthday} onChange={handleChange} className="bg-gray-100 border border-gray-300 rounded-md h-12 px-4" />
          <select name="gender" value={formData.gender} onChange={handleChange} className="bg-gray-100 border border-gray-300 rounded-md h-12 px-4 w-full">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="bg-gray-100 border border-gray-300 rounded-md h-12 px-4 w-full">
            <option value="">Marital Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
          </select>
        </div>

        <div className="space-y-6">
          <Input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} className="bg-gray-100 border border-gray-300 rounded-md h-12 px-4" />
          <Input type="text" name="zipCode" placeholder="Zip Code" value={formData.zipCode} onChange={handleChange} className="bg-gray-100 border border-gray-300 rounded-md h-12 px-4" />
          <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="bg-gray-100 border border-gray-300 rounded-md h-12 px-4" />
          <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="bg-gray-100 border border-gray-300 rounded-md h-12 px-4" />
          <Input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="bg-gray-100 border border-gray-300 rounded-md h-12 px-4" />
        </div>

        <div className="col-span-2 flex justify-center mt-4">
          <Button type="submit" className="bg-[#8080ff] hover:bg-[#6666ff] text-white px-8 rounded-md h-10">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}