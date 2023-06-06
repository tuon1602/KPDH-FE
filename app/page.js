import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import data from "./data/data.json";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const idZero = data[0].id;
  console.log(idZero);
  return (
    <>
    <Header/>
    <main className="px-20 mt-10">
      <p className="text-bold text-6xl">News</p>
      <Link
        href={{
          pathname: `/news/${idZero}`,
        }}
      >
        <div className="mt-10 flex gap-12 items-center">
          <Image
            src={data[0].image}
            alt="big image"
            className="rounded-xl object-cover"
            width={650}
            height={200}
          />
          <div>
            <span className="text-gray-600">{data[0].createdAt}</span>
            <h1 className="text-4xl mt-2 text-bold uppercase">
              {data[0].title}
            </h1>
            <p className="mt-2 text-gray-500">{data[0].description}</p>
          </div>
        </div>
      </Link>
      <div className="mt-10 grid grid-cols-3 gap-5">
        {data.slice(1).map((item, index) => (
          <Card>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{item.content}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/news/${item.id}`}>View more</Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
    <Footer/>
    </>
  );
}
