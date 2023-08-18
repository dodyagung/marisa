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

  const res_rekap_per_okupansi = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/dashboard/rekap-per-okupansi",
    {
      headers: {
        Authorization: "Bearer " + cookies.access_token,
      },
    }
  );
  const data_rekap_per_okupansi = await res_rekap_per_okupansi.json();

  return { props: { data_rekap_per_kategori, data_rekap_per_okupansi } };
};

const Page: NextPageWithLayout = ({
  data_rekap_per_kategori,
  data_rekap_per_okupansi,
}: any) => {
  const dataRekapPerKategori: ApexOptions = {
    theme: {
      palette: "palette3",
    },
    series: data_rekap_per_kategori.map((data: any) => data.jml_aset),
    labels: data_rekap_per_kategori.map((data: any) => data.name),
    legend: {
      position: "bottom",
    },
  };

  const dataRekapPerOkupansi: ApexOptions = {
    theme: {
      palette: "palette3",
    },
    series: data_rekap_per_okupansi.map((data: any) => data.jml_aset),
    labels: data_rekap_per_okupansi.map((data: any) => data.name),
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
        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="w-full">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Kategori
              </h5>
              {/* Line Chart */}
              <ReactApexChart
                options={dataRekapPerKategori}
                series={dataRekapPerKategori.series}
                type="pie"
                width={360}
              />
            </div>
          </div>
          <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="w-full">
              <h3 className="text-base font-normal text-gray-500 dark:text-gray-400">
                Users
              </h3>
              <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
                2,340
              </span>
              <p className="flex items-center text-base font-normal text-gray-500 dark:text-gray-400">
                <span className="flex items-center mr-1.5 text-sm text-green-500 dark:text-green-400">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                    />
                  </svg>
                  3,4%
                </span>
                Since last month
              </p>
            </div>
            <div className="w-full" id="week-signups-chart" />
          </div>
          <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="w-full">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Okupansi
              </h5>
              {/* Line Chart */}
              <ReactApexChart
                options={dataRekapPerOkupansi}
                series={dataRekapPerOkupansi.series}
                type="pie"
                width={360}
              />
            </div>
          </div>
        </div>
        <div className="grid my-4 w-full grid-cols-1 gap-4 lg:grid-cols-4">
          <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="w-full">
              <h3 className="text-base font-normal text-gray-500 dark:text-gray-400">
                New products
              </h3>
              <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
                2,340
              </span>
              <p className="flex items-center text-base font-normal text-gray-500 dark:text-gray-400">
                <span className="flex items-center mr-1.5 text-sm text-green-500 dark:text-green-400">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                    />
                  </svg>
                  12.5%
                </span>
                Since last month
              </p>
            </div>
            <div className="w-full" id="new-products-chart" />
          </div>
          <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="w-full">
              <h3 className="text-base font-normal text-gray-500 dark:text-gray-400">
                Users
              </h3>
              <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
                2,340
              </span>
              <p className="flex items-center text-base font-normal text-gray-500 dark:text-gray-400">
                <span className="flex items-center mr-1.5 text-sm text-green-500 dark:text-green-400">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                    />
                  </svg>
                  3,4%
                </span>
                Since last month
              </p>
            </div>
            <div className="w-full" id="week-signups-chart" />
          </div>
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="w-full">
              <h3 className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">
                Audience by age
              </h3>
              <div className="flex items-center mb-2">
                <div className="w-16 text-sm font-medium dark:text-white">
                  50+
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-primary-600 h-2.5 rounded-full dark:bg-primary-500"
                    style={{ width: "18%" }}
                  />
                </div>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-16 text-sm font-medium dark:text-white">
                  40+
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-primary-600 h-2.5 rounded-full dark:bg-primary-500"
                    style={{ width: "15%" }}
                  />
                </div>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-16 text-sm font-medium dark:text-white">
                  30+
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-primary-600 h-2.5 rounded-full dark:bg-primary-500"
                    style={{ width: "60%" }}
                  />
                </div>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-16 text-sm font-medium dark:text-white">
                  20+
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-primary-600 h-2.5 rounded-full dark:bg-primary-500"
                    style={{ width: "30%" }}
                  />
                </div>
              </div>
            </div>
            <div id="traffic-channels-chart" className="w-full" />
          </div>
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="w-full">
              <h3 className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">
                Audience by age
              </h3>
              <div className="flex items-center mb-2">
                <div className="w-16 text-sm font-medium dark:text-white">
                  50+
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-primary-600 h-2.5 rounded-full dark:bg-primary-500"
                    style={{ width: "18%" }}
                  />
                </div>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-16 text-sm font-medium dark:text-white">
                  40+
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-primary-600 h-2.5 rounded-full dark:bg-primary-500"
                    style={{ width: "15%" }}
                  />
                </div>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-16 text-sm font-medium dark:text-white">
                  30+
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-primary-600 h-2.5 rounded-full dark:bg-primary-500"
                    style={{ width: "60%" }}
                  />
                </div>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-16 text-sm font-medium dark:text-white">
                  20+
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-primary-600 h-2.5 rounded-full dark:bg-primary-500"
                    style={{ width: "30%" }}
                  />
                </div>
              </div>
            </div>
            <div id="traffic-channels-chart" className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
