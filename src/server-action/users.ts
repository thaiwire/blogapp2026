"use server";

import supabase from "@/config/supabase-config";
import { IUser } from "@/interfaces";
import bcrypt from "bcryptjs";

export const registerUser = async (payload: Partial<IUser>) => {
  if (!payload.email || !payload.password || !payload.username) {
    throw new Error("Missing required fields");
  }

  const { data: existingUser, error: existingUserError } = await supabase
    .from("user_profiles")
    .select("id")
    .eq("email", payload.email);

  if (existingUserError) {
    throw new Error(
      existingUserError.message || "Error checking existing user"
    );
  }

  if (existingUser && existingUser.length > 0) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const rawData = {
    ...payload,
    password: hashedPassword,
    is_active: true,
    profile_pic: "",
  };

  const { data: newUser, error: insertError } = await supabase
    .from("user_profiles")
    .insert(rawData);

  if (insertError) {
    return {
      success: false,
      message: insertError.message || "Error registering user",
    };
  }
  return {
    success: true,
    message: "User registered successfully",
    data: newUser,
  };
};
