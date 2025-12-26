"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { loginUser } from "@/server-action/users";
import Cookies from 'js-cookie'




const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function LoginPage() {
   
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      //
      setLoading(true);
      const response:any = await loginUser(values.email, values.password);
      if (response.success) {
       
          Cookies.set("user_token", response.data.jwtToken);
          toast.success("Login successful");
          router.push("/user/dashboard");
      } else {
        toast.error(response.message || "Login failed");
      }

    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  }

  return (
    <div className="auth-parent">
      <div className="bg-white p-5 rounded-xl w-[450px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <h1 className="text-xl font-bold">Login</h1>
            <hr className="border-gray-300 border" />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <Link className="text-sm underline" href="/register">
                New account? Register
              </Link>
              <Button type="submit" className="w-max mt-6">
                Login
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
