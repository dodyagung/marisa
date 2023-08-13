import { useEffect, type ReactElement, useState } from "react";
import { DashboardLayout } from "@/components/@layout";

import Head from "next/head";
import { GetServerSideProps } from "next";
import nookies, { destroyCookie, parseCookies } from "nookies";
import { NextPageWithLayout } from "../_app";
import Link from "next/link";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { useRouter } from "next/router";

export const getServerSideProps = async (ctx: any) => {
  const cookies = nookies.get(ctx);

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/aset", {
    headers: {
      Authorization: "Bearer " + cookies.access_token,
    },
  });
  const data = await res.json();

  return { props: { data } };
};

const Page: NextPageWithLayout = ({ data }: any) => {
  const router = useRouter();

  const handleDelete = async (id: number) => {
    const cookie = parseCookies();

    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/aset/" + id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookie.access_token,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();

      alert("Delete aset berhasil.");
      router.reload();
    } else {
      if (response.status === 401) {
        destroyCookie(null, "access_token");

        alert("Session expired, please relogin");
        router.push("/login");
      } else {
        alert(response.statusText);
      }
    }
  };

  return (
    <>
      <Head>
        <title>{`Data Aset - ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
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
                  Data Aset
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
                  Data Aset
                </h2>
                {/* <p className="text-gray-500 dark:text-gray-400">
                  Menampilkan semua data aset di perusahaan anda
                </p> */}
              </div>
              <Link
                href="/aset/input"
                type="button"
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                <svg
                  className="h-3.5 w-3.5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  />
                </svg>
                Input Data
              </Link>
            </div>
          </div>

          <div className="mt-5 bg-white dark:bg-gray-900 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Nama
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Jenis
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Pemilik
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Lokasi
                    </th>
                    <th scope="col" className="px-4 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((aset: any, index: number) => (
                    <tr
                      key={index}
                      className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {aset.name}
                      </th>
                      <td className="px-4 py-3">{aset.kategori.name}</td>
                      <td className="px-4 py-3">{aset.perusahaan.name}</td>
                      <td className="px-4 py-3">
                        {aset.aset_detail?.detail_alamat}
                      </td>
                      <td className="px-4 py-3 flex items-center justify-end">
                        <button
                          id="apple-imac-27-dropdown-button"
                          data-dropdown-toggle={`dropdown-${aset.aset_id}`}
                          className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                          type="button"
                        >
                          <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button>
                        <div
                          id={`dropdown-${aset.aset_id}`}
                          className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                        >
                          <ul
                            className="py-1 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="apple-imac-27-dropdown-button"
                          >
                            <li>
                              <Link
                                href={`/aset/${aset.aset_id}`}
                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Show
                              </Link>
                            </li>
                            <li>
                              <Link
                                href={`/aset/${aset.aset_id}/edit`}
                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Edit
                              </Link>
                            </li>
                          </ul>
                          <div className="py-1">
                            <a
                              onClick={() => {
                                window.confirm(
                                  "Are you sure you want to delete?"
                                ) && handleDelete(aset.aset_id);
                              }}
                              className="cursor-pointer block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                              Delete
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
