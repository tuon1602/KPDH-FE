'use client';

import Image from 'next/image';
import Header from './components/Header';
import Footer from './components/Footer';
import data from './data/data.json';
import Link from 'next/link';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from 'moment';
import { arrayFn } from 'shochu';
import { useRouter } from 'next/navigation';

export default function Home() {

  const idZero = data[0].id;
  const [posts, setPosts] = useState([]);



  const getData = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}post`
    );
    const data = await response.json();
    console.log(data)

    setPosts(arrayFn.shuffle(data.data));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header />
      <main className="px-10 md:px-5 mt-10 max-w-[1350px] mx-auto">
        <p className="font-semibold text-6xl">News</p>
        <Link
          href={{
            pathname: `/news/${idZero}`,
          }}
          className="hidden md:block mt-4"
        >
          <div className=" flex gap-12 items-center">
            <div className="flex-auto w-64 bg-red-500 md:h-[500px] relative rounded-md">
              <Image
                src={data[0].image}
                alt="big image"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-md"
              />
            </div>
            <div className="flex-auto w-16">
              <span className="text-gray-600">{data[0].createdAt}</span>
              <h1 className="text-4xl mt-2 text-bold uppercase">
                {data[0].title}
              </h1>
              <p className="mt-2 text-gray-500">{data[0].description}</p>
            </div>
          </div>
        </Link>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {posts.map((item, index) => (
            <Card>
              <div className="h-[300px] rounded-md overflow-hidden relative">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/upload/file/${item.image}`}
                  alt="thumbnail"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="hover:scale-110 transition"
                />
                {/* <img
                  src={`https://fakenewsapi-1-w3888100.deta.app/upload/file/${item.image}`}

                /> */}
              </div>
              <h3 className="mt-4 text-sm text-gray-500">
                {moment(item.created_at).format('MMMM DD, YYYY')}
              </h3>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Link
                  href={`/news/${item._id}`}
                  className="text-md text-gray-500"
                >
                  View more
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
