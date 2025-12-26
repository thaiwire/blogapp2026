import useUsersStore, { IUsersStore } from "@/global-store/users-store";
import React, { use } from "react";
import { Menu } from "lucide-react";
import MenuItems from "./menu-items";

function PrivateLayoutHeader() {
  const { user } = useUsersStore() as IUsersStore;

  const [openMenuItems, setOpenMenuItems] = React.useState(false);

  // Placeholder for potential future user data usage

  return (
    <div className="bg-primary flex justify-between p-6">
      <h1 className="text-xl font-bold text-white">N-N-R-B</h1>
      <div className="flex gap-5 text-white">
        <h1 className="text-sm">
          {user ? `Welcome, ${user.username}` : "Welcome, Guest"}
        </h1>
        <Menu
          size={14}
          className="text-white cursor-pointer"
          onClick={() => setOpenMenuItems(true)}
        />
      </div>
      {openMenuItems && (
        <MenuItems 
          openMenuItems={openMenuItems} 
          setOpenMenuItems={setOpenMenuItems} 
        />
      )}
    </div>
  );
}

export default PrivateLayoutHeader;
