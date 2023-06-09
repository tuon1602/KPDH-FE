'use client'

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../assets/logo.png";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const router = useRouter();
  const [userDetail, setUserDetail] = useState();

  let token = '';
  if (typeof localStorage !== 'undefined') {
    token = localStorage.getItem('token');
  }

  const getUserInfo = async () => {
    if (token) {
      const response = await fetch(
        `https://fakenewsapi-1-w3888100.deta.app/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          next:{
            revalidate:10000
          }
        }
      );
      const data = await response.json();
      if (data.code === 1) {
        setUserDetail(data);
      } else if (data.code === 401) {
        setTimeout(() => {
          toast.error("No longer login, Please login again");
          localStorage.removeItem("token");
          router.push("auth/login");
        }, 5000);
      }
    } 
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  //handlelogout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  // console.log(userDetail)
  return (
    <div className="flex justify-between items-center max-w-[1350px] mx-auto">
      <div className="flex items-center gap-10">
        <Link href="/">
          <Image src={Logo} width={100} h={100} />
        </Link>
      </div>

      <div>
        {userDetail?.code === 1 ? (
          <p className="text-bold text-2xl">
            <span className="text-gray-400">Hi</span> {userDetail.data.name}
          </p>
        ) : (
          <p className="text-bold text-2xl">
            <span className="text-gray-400">Hi</span> guest
          </p>
        )}
      </div>

      <div className="flex gap-10 items-center">
        {/* <div>
          <Input placeholder="Search your news" />
        </div> */}
        {userDetail?.data.role === 1 && <Link href="/post">Manage posts</Link>}
        <Link href="/">Home</Link>
        <Link href="/news">News</Link>
        {userDetail?.code === 1 ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>
                <button onClick={handleLogout}>Logout</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/auth/login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </Link>
        )}
        {/* <Link href="/auth/login">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </Link> */}
        {/* <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </div>
  );
};

export default Header;
