"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { parseImgUrl } from "@/lib/utils";
import Footer from "@/app/components/Footer";
import moment from "moment";

var token = "";
if (typeof localStorage !== "undefined") {
  token = localStorage.getItem("token");
}

const NewsDetail = () => {
  const params = useParams();
  const [postData, setPostData] = useState({});
  const [realOrFake,setRealOrFake] = useState("")
  const [isLoading, setIsLoading] = useState(true);

  async function getData() {
    "use client";
    if (token != "") {
      setIsLoading(true);
      const newsData = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}post/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setPostData((await newsData.json()).data);
      setIsLoading(false);
    }
  }

  async function checkContentRealFake() {
    "use client";
    if (token != "" && postData.content) {
      const newsData = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}post/prediction`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({"content":postData?.content}),
        }
      );
      const data = await newsData.json();
      if(data.code ===1){
        setRealOrFake(data.data)
      }
    }
  }

  useEffect(() => {
    getData();
    checkContentRealFake();
  }, []);

  if (isLoading) return <Loading/>;

  return (
    <div className="max-w-[1050px] mx-auto mt-20">
      <div className="flex justify-between items-center">
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-10 h-10 inline-block"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>
        </Link>
        {realOrFake ==1 ?(
          <p className="py-2 px-4 bg-red-400 rounded-xl text-white">This content possibly fake </p>
        ):(
          <p className="py-2 px-4 bg-green-400 rounded-xl text-white">This content consitanly real</p>
        )}
      </div>

      <div className="mt-10 flex flex-col gap-5">
        <Image
          src={parseImgUrl(postData?.image)}
          alt="thumbnail"
          width={1350}
          height={400}
          style={{ objectFit: "cover" }}
          className="transition bg-red-400"
        />
        <p className="font-bold uppercase text-3xl">{postData?.title}</p>
        <div>
          <h3 className="font-semibold">Admin,</h3>
          <h3 className="text-sm text-gray-500">
            {moment(postData?.created_at).format("MMMM DD, YYYY")}
          </h3>
        </div>

        <p className="text-md ">{postData?.content}</p>
      </div>
      <Footer />
    </div>
  );
};

export default NewsDetail;
