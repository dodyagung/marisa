import { useEffect, type ReactElement } from "react";
import { DashboardLayout } from "@/components/@layout";

import { NextPageWithLayout } from "./_app";
import Head from "next/head";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import nookies from "nookies";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export const getServerSideProps = async (ctx: any) => {
  const cookies = nookies.get(ctx);

  const res_rekap_per_kategori = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/dashboard/rekap-per-kategori",
    {
      headers: {
        Authorization: "Bearer " + cookies.access_token,
      },
    }
  );
  const data_rekap_per_kategori = await res_rekap_per_kategori.json();

  return { props: { data_rekap_per_kategori } };
};

const Page: NextPageWithLayout = ({ data_rekap_per_kategori }: any) => {
  const data: ApexOptions = {
    theme: {
      palette: "palette3",
    },
    series: data_rekap_per_kategori.map((data: any) => data.jml_aset),
    labels: data_rekap_per_kategori.map((data: any) => data.name),
    legend: {
      position: "bottom",
    },
  };

  return (
    <>
      <Head>
        <title>{`Dashboard - ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
      </Head>
      <div className="p-6 mt-16 sm:ml-64 bg-gray-50">
        <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
          <div className="mb-5 flex justify-between items-start w-full">
            <div className="flex-col items-center">
              <div className="flex items-center mb-1">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white mr-1">
                  Kategori
                </h5>
              </div>
            </div>
          </div>
          {/* Line Chart */}
          <ReactApexChart
            options={data}
            series={data.series}
            type="pie"
            width={380}
          />
        </div>
      </div>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
