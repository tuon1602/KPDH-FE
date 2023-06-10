"use client";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreatePost from "../components/CreatePost";
import { useRouter } from "next/navigation";

async function getData() {
  "use client";
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}post`, {
  });
  return res.json();
}

const Post = async () => {
  const router = useRouter();
  let token = "";
  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("token");
  }
  const data = await getData();
  //   console.log(data.data);

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post")) {
      if (token) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}post/${postId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = res.json();
        console.log(data);
        router.refresh();
      }
    }
  };
  return (
    <>
      <div>
        <Header />
        <div className="max-w-[1050px] mx-auto mt-20">
          <CreatePost />
          <Table>
            <TableCaption>A list of posts</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">id</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Image</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((item, index) => (
                <TableRow>
                  <TableCell className="font-medium">{item._id}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    {" "}
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/upload/file/${item.image}`}
                      alt="thumbnail"
                      width={150}
                      height={150}
                      style={{ objectFit: "cover" }}
                      className="hover:scale-110 transition"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <button
                      className="px-5 py-2 bg-red-300 transition"
                      onClick={() => handleDeletePost(item._id)}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Post;
