'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { parseImgUrl } from '@/lib/utils';
import moment from 'moment';

const NewsDetail = () => {
  const params = useParams();
  const [postData, setPostData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  async function getData() {
    'use client';
    let token = '';
    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('token');
    }
    if (token != '') {
      setIsLoading(true);
      const newsData = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}post/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setPostData((await newsData.json()).data);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) return <div>isLoading...</div>;

  return (
    <div className="max-w-[1050px] mx-auto my-10">
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
      <div className="mt-8">
        <div className="mb-5">
          <p className="font-semibold">Admin,</p>
          <p
            className="text-sm text-neutral-400"
            children={`${moment(postData.created_at).format('MMMM DD, YYYY')}`}
          />
        </div>
        <Image
          src={parseImgUrl(postData?.image)}
          alt="thumbnail"
          width={1350}
          height={400}
          style={{ objectFit: 'cover' }}
          className="transition bg-red-400"
        />
        <p className="font-bold text-3xl my-5">{postData?.title}</p>
        <p>{postData?.content}</p>
      </div>
    </div>
  );
};

export default NewsDetail;
