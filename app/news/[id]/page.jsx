"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

async function getData(newsId) {
  "use client"
  let token = "";
  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("token");
  }
  if (token != "") {
    const newsData = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}post/${newsId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return newsData.json();
  }
}

const NewsDetail = async () => {
   const params = useParams()
  const data = await getData(params.id);
  return (
    <div className="max-w-[1050px] mx-auto mt-20">
      <Link href="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 inline-block"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
          />
        </svg>
      </Link>
      <div className="mt-10">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/upload/file/${data.data.image}`}
          alt="thumbnail"
          width={1350}
          height={400}
          style={{ objectFit: "cover" }}
          className="transition bg-red-400"
        />
        <p className="text-bold text-3xl">{data.data.title}</p>
        <p>WTF</p>
      </div>
    </div>
  );
};

export default NewsDetail;
