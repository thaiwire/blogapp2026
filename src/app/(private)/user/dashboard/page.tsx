import LogoutButton from "@/components/functional/logout-btn";
import { IUser } from "@/interfaces";
import { getLoggedInUser } from "@/server-action/users";
import React from "react";

async function UserDashboard() {
  const userResponse = await getLoggedInUser();
  if (!userResponse.success) {
    return <div>Error: {userResponse.message}</div>;
  }
  const user:IUser = userResponse.data;
  
 

  return <div className="p-5 flex flex-col gap-4">
    <h1>UserDashboard</h1>
    <p>Welcome, {user.username}!</p>
    <p>Email: {user.email}</p>
    <LogoutButton />
  </div>;
}

export default UserDashboard;
