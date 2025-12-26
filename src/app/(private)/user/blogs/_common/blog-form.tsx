"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { blogsCategories } from "@/constants";
import Editor from "react-simple-wysiwyg";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  content: z.string().min(1, "Content is required"),
});

function BlogForm({ formType }: { formType: "add" | "edit" }) {
  const [content, setContent] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      //
      setLoading(true);
    } catch (error) {
      toast.error("Failed to submit blog. Please try again.");
    }
  }

  return (
    <div className="mt-7">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-4 gap-5">
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter the title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter a short description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full">
                        {blogsCategories.map((category) => (
                          <SelectItem
                            value={category.value}
                            key={category.value}
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Editor
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            className="border border-gray-300 rounded-md p-2 text-sm min-h-[300px]"
          />

          <div className="flex justify-end gap-3">
            <Button variant="outline">Cancel</Button>
            <Button type="submit" disabled={loading}>
              {formType === "add" ? "Add Blog" : "Update Blog"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default BlogForm;
