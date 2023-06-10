import './globals.css';
import { Inter, Montserrat } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata = {
  title: 'FakeNews ',
  description: 'Fakenews website',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="pt-5 bg-gray-300">
      <body className={montserrat.className}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
