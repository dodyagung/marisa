import { type ReactElement } from "react";
import { DashboardLayout } from "@/components/@layout";

import { NextPageWithLayout } from "./_app";
import Dummy from "@/components/dummy";
import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticProps } from "next";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Dashboard - {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Dummy text="Dashboard" />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
