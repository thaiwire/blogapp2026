import React, { useEffect } from "react";
import PrivateLayoutHeader from "./header";
import { getLoggedInUser } from "@/server-action/users";
import useUsersStore, { IUsersStore } from "@/global-store/users-store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { set } from "zod";
import Spinner from "@/components/ui/spinner";
import CenteredSpinner from "@/components/ui/centered-spinner";

function PrivateLayout({ children }: { children: React.ReactNode }) {
  const { setUser } = useUsersStore() as IUsersStore;
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getLoggedInUser();
      if (!response?.success) {
        throw new Error("failed to fetch user data");
      } else {
        setUser(response.data);
      }
    } catch (error) {
      toast.error("Failed to fetch user data. Please login again.");
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <CenteredSpinner />;
  }

  return (
    <div>
      <PrivateLayoutHeader />
      <div className="p-5">{children}</div>
    </div>
  );
}

export default PrivateLayout;
