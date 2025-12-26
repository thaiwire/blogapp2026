"use client";
import React from "react";
import { Button } from "../ui/button";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();
  const handleLogout = () => {
    try {
      //
      setLoading(true);
      const cookieStore = Cookies;
      cookieStore.remove("user_token");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message || "Error logging out",
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button className="w-full" disabled={loading} onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default LogoutButton;
