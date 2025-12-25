"use server";

import supabase from "@/config/supabase-config";
import { IUser } from "@/interfaces";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

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

export const loginUser = async (email: string, password: string) => {
  try {
    // step1 : fetch user by email
    const { data: users, error: usersError } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("email", email);
    if (usersError) {
       return {
        success: false,
        message: usersError.message || "Error fetching user",
      };
    }
    if (!users || users.length === 0) {
      return {
        success: false,
        message: "User not found",
      };
    }
    // step2 : compare password
    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password || "");
    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid password",
      };
    }

    // step3 : generate JWT token
    const jwtToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY!, 
      { expiresIn: "1d" }
    );
    return {
      success: true,
      message: "Login successful",
      data: { user, jwtToken },
    };

  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "Error logging in",
    }
  }

}

export const getLoggedInUser = async () => {
  try {
    
    const cookieStore = await cookies();
    const token = cookieStore.get("user_token")?.value;
    const decodedToken = jwt.verify(token || "", process.env.JWT_SECRET_KEY!) as { userId: string  };
    
    if (!decodedToken || !decodedToken.userId) {
      return {
        success: false,
        message: "Invalid token",
      };
    }

    const { data: users, error: usersError } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", decodedToken.userId);
    if (usersError || !users || users.length === 0 ) { 
        return {
        success: false,
        message: usersError?.message || "User not found",
      };
    }
      
    const user = users[0];  
    delete user.password;

    return {
      success: true,
      message: "User fetched successfully",
      data: user,
    };
 
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "Error fetching logged-in user",
    }
  }
}
