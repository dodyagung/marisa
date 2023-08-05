import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className={` ${inter.className}`}>{children}</main>
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
