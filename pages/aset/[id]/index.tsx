import { useState, type ReactElement } from "react";
import { AuthLayout, DashboardLayout } from "@/components/@layout";
import Image from "next/image";
import Logo from "/public/logo.png";
import { destroyCookie, setCookie } from "nookies";
import { useRouter } from "next/router";
import Head from "next/head";
import { NextPageWithLayout } from "../../_app";

const Page: NextPageWithLayout = ({ data }: any) => {
  return (
    <>
      <Head>
        <title>{`Detail - Data Aset - ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
      </Head>
      <div className="p-6 mt-16 sm:ml-64">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a
                href="#"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-red-600 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3 mr-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Dashboard
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <a
                  href="#"
                  className="ml-1 text-sm font-medium text-gray-700 hover:text-red-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                >
                  Data Aset
                </a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                  Detail
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="mx-auto max-w-screen-xl mt-4">
          {/* Start coding here */}
          <div className="relative overflow-hidden bg-white dark:bg-gray-800 sm:rounded-lg">
            <div className="mt-2 flex-row items-center justify-between space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
              <div>
                <h2 className="mr-3 font-semibold text-2xl dark:text-white">
                  Detail
                </h2>
                {/* <p className="text-gray-500 dark:text-gray-400">
                    Menampilkan semua data aset di perusahaan anda
                  </p> */}
              </div>
            </div>
          </div>

          <>
            <div className="mb-4 mt-4 border-b border-gray-200 dark:border-gray-700">
              <ul
                className="flex flex-wrap -mb-px text-sm font-medium text-center"
                id="myTab"
                data-tabs-toggle="#myTabContent"
                role="tablist"
              >
                <li className="mr-2" role="presentation">
                  <button
                    className="inline-block p-4 border-b-2 rounded-t-lg aria-selected:text-red-600 aria-selected:border-red-600"
                    id="informasi-tab"
                    data-tabs-target="#informasi"
                    type="button"
                    role="tab"
                    aria-controls="informasi"
                    aria-selected="false"
                  >
                    Informasi
                  </button>
                </li>
                <li className="mr-2" role="presentation">
                  <button
                    className="inline-block p-4 border-b-2 rounded-t-lg aria-selected:text-red-600 aria-selected:border-red-600"
                    id="detail-tab"
                    data-tabs-target="#detail"
                    type="button"
                    role="tab"
                    aria-controls="detail"
                    aria-selected="false"
                  >
                    Detail
                  </button>
                </li>
                <li role="presentation">
                  <button
                    className="inline-block p-4 border-b-2 rounded-t-lg aria-selected:text-red-600 aria-selected:border-red-600"
                    id="foto-tab"
                    data-tabs-target="#foto"
                    type="button"
                    role="tab"
                    aria-controls="foto"
                    aria-selected="false"
                  >
                    Foto
                  </button>
                </li>
              </ul>
            </div>

            <div id="myTabContent">
              <div
                className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                id="informasi"
                role="tabpanel"
                aria-labelledby="informasi-tab"
              >
                <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                  <div className="flex flex-col pb-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400">
                      Email address
                    </dt>
                    <dd className="font-semibold">yourname@flowbite.com</dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400">
                      Home address
                    </dt>
                    <dd className="font-semibold">
                      92 Miles Drive, Newark, NJ 07103, California, USA
                    </dd>
                  </div>
                  <div className="flex flex-col pt-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400">
                      Phone number
                    </dt>
                    <dd className="font-semibold">
                      +00 123 456 789 / +12 345 678
                    </dd>
                  </div>
                </dl>
              </div>
              <div
                className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                id="detail"
                role="tabpanel"
                aria-labelledby="detail-tab"
              >
                <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                  <div className="flex flex-col pb-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400">
                      Email address
                    </dt>
                    <dd className="font-semibold">yourname@flowbite.com</dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400">
                      Home address
                    </dt>
                    <dd className="font-semibold">
                      92 Miles Drive, Newark, NJ 07103, California, USA
                    </dd>
                  </div>
                  <div className="flex flex-col pt-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400">
                      Phone number
                    </dt>
                    <dd className="font-semibold">
                      +00 123 456 789 / +12 345 678
                    </dd>
                  </div>
                </dl>
              </div>
              <div
                className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                id="foto"
                role="tabpanel"
                aria-labelledby="foto-tab"
              >
                <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                  <div className="flex flex-col pb-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400">
                      Email address
                    </dt>
                    <dd className="font-semibold">yourname@flowbite.com</dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400">
                      Home address
                    </dt>
                    <dd className="font-semibold">
                      92 Miles Drive, Newark, NJ 07103, California, USA
                    </dd>
                  </div>
                  <div className="flex flex-col pt-3">
                    <dt className="mb-1 text-gray-500 dark:text-gray-400">
                      Phone number
                    </dt>
                    <dd className="font-semibold">
                      +00 123 456 789 / +12 345 678
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
