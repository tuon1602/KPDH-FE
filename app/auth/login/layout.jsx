import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Login ",
  description: "Login",
};

export default function LoginLayout({ children }) {
  return (
    <html lang="en" className="px-[15rem] py-10 bg-gray-300">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
