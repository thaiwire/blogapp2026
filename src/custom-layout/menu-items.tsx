"use client";
import LogoutButton from "@/components/functional/logout-btn";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { LayoutDashboard, List, UserCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { useRouter } from "next/navigation";

interface IMenuItems {
  openMenuItems: boolean;
  setOpenMenuItems: (open: boolean) => void;
}

function MenuItems({ openMenuItems, setOpenMenuItems }: IMenuItems) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/user/dashboard",
      icon: <LayoutDashboard size={14} />,
    },
    {
      name: "Blogs",
      path: "/user/blogs",
      icon: <List size={14} />,
    },
    {
      name: "My Blog",
      path: "/user/my-blogs",
      icon: <List size={14} />,
    },
    {
      name: "Profile",
      path: "/user/profile",
      icon: <UserCheck size={14} />,
    },
  ];

  return (
    <Sheet open={openMenuItems} onOpenChange={setOpenMenuItems}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-7 mt-20 px-7">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant={pathname === item.path ? "default" : "ghost"}
              className="justify-start"
              onClick={() => {
                router.push(item.path);
                setOpenMenuItems(false);
              }}
            >
              <div className="mr-2">{item.icon}</div>
              <span className="text-sm">{item.name}</span>
            </Button>
          ))}
          <LogoutButton />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MenuItems;
