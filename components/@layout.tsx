import Head from "next/head";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <main className={`${inter.className} bg-gray-200 dark:bg-gray-900`}>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          {children}
        </div>
      </main>
    </>
  );
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className={` ${inter.className}`}>{children}</main>
    </>
  );
};

export { AuthLayout, DashboardLayout };
