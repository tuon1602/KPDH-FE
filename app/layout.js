import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FakeNews ',
  description: 'Fakenews website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='px-[15rem] py-10 bg-gray-300'>
      <body className={inter.className}>
        <Header/>
        {children}
        <Footer/>
        </body>
    </html>
  )
}
