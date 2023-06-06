import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../assets/logo.png";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <div className="flex justify-between items-center max-w-[1350px] mx-auto">
      <div className="flex items-center gap-10">
        <Link href="/">
          <Image src={Logo} width={100} h={100} />
        </Link>
      </div>

      <div className="flex gap-10 items-center">
        <div>
          <Input placeholder="Search your news" />
        </div>
        <Link href="/">Home</Link>
        <Link href="/news">News</Link>
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
      </div>
    </div>
  );
};

export default Header;
