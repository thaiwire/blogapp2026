"use client";

import supabase from "@/config/supabase-config";
import { IBlog } from "@/interfaces";

export const addBlog = async (payload: Partial<IBlog>) => {
  const { error } = await supabase.from("blogs").insert(payload);
  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }
  return {
    success: true,
    message: "Blog added successfully",
    data: data,
  };
};

export const updateBlog = async (id: string, payload: Partial<IBlog>) => {
  const { error } = await supabase.from("blogs").update(payload).eq("id", id);
  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }
  return {
    success: true,
    message: "Blog updated successfully",
  };
};

export const deleteBlog = async (id: string) => {
  const { error } = await supabase.from("blogs").delete().eq("id", id);
  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }
  return {
    success: true,
    message: "Blog deleted successfully",
  };
};

export const getBlogsByAuthor = async (authorId: string) => {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("author_id", authorId)
    .order("created_at", { ascending: false });
  if (error) {
    return {
      success: false,
      error: error.message,
      data: [],
    };
  }
  return {
    success: true,
    data: data as IBlog[],
  };
};

export const getBlogById = async (id: string) => {
  const { data, error } = await supabase.from("blogs").select("*").eq("id", id);

  if (error || data.length === 0 || !data) {
    return {
      success: false,
      error: "Blog not found",
      data: null,
    };
  }
  const blog = data[0];
  return {
    success: true,
    data: blog,
  };
};

export const getAllBlogs = async () => {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });
  if (error) {
    return {
      success: false,
      error: error.message,
      data: [],
    };
  }
  return {
    success: true,
    data: data as IBlog[],
  };
};
