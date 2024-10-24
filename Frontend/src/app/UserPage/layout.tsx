import Head from 'next/head';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
      <> 
        <body className=" w-screen h-screen bg-gray-100 flex items-center justify-center">
          {children}
        </body>
      </>
  );
}