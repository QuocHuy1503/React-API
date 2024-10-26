import Head from 'next/head';
import navBar from './layout/navbar/page';
export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
      <> 
        {navBar()}
        <body className=" w-screen h-screen bg-gray-100 flex items-center justify-center">
          {children}
        </body>
      </>
  );
}