import PageTitle from "@/components/functional/page-title";
import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

function AllBlogPage() {
  return (
    <div className="flex justify-between items-center">
      <PageTitle title="All Blogs" />
      <Button>
        <Link href="/user/blogs/add">Add Blog</Link>
      </Button>
    </div>
  );
}

export default AllBlogPage;
