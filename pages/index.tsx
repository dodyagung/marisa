import { type ReactElement } from "react";
import { DashboardLayout } from "@/components/@layout";

import { NextPageWithLayout } from "./_app";
import Dummy from "@/components/dummy";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Dummy text="Dashboard" />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
