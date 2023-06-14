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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import { arrayFn } from 'shochu';
import { useRouter } from 'next/navigation';
import { parseImgUrl } from '@/lib/utils';
import Loading from '@/components/Loading';

export default function Home() {
  const idZero = data[0].id;
  const [posts, setPosts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    setIsLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}post`);
    const data = await response.json();
    console.log(data);

    const shuffleData = arrayFn.shuffle(data.data);
    setPosts({ top: shuffleData[0], rest: shuffleData.slice(1) });
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <Header />
      <main className="px-10 md:px-5 mt-10 max-w-[1350px] mx-auto">
        <p className="font-semibold text-6xl">News</p>
        <Link
          href={{
            pathname: `/news/${posts.top._id}`,
          }}
          className="hidden md:block mt-4"
        >
          <div className=" flex gap-12 items-center">
            <div className="flex-auto w-64 md:h-[500px] relative rounded-md">
              <Image
                src={parseImgUrl(posts.top.image)}
                alt="big image"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-md"
              />
            </div>
            <div className="flex-auto w-16">
              <span className="text-gray-600">{posts.top.createdAt}</span>
              <h1 className="text-4xl mt-2 font-semibold uppercase">
                {posts.top.title}
              </h1>
              <p className="mt-2 text-gray-500">{posts.top.description}</p>
            </div>
          </div>
        </Link>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {posts.rest.map((item, index) => (
            <Card>
              <div className="h-[300px] rounded-md overflow-hidden relative">
                <Image
                  src={parseImgUrl(item.image)}
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
                  className="text-md text-neutral-100 bg-green-400 py-2 px-4 rounded-md "
                >
                  View more
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
      <ToastContainer/>
    </>
  );
}
