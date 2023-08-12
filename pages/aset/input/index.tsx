import { useState, type ReactElement, useEffect } from "react";
import { DashboardLayout } from "@/components/@layout";

import Head from "next/head";
import { GetServerSideProps } from "next";
import nookies, { destroyCookie, parseCookies } from "nookies";
import { NextPageWithLayout } from "../../_app";
import { useRouter } from "next/router";
import jwtDecode, { JwtPayload } from "jwt-decode";

type Aset = {
  nama: string;
  jenis: string;
  pemilik: string;
  lokasi: string;
};

export const getServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  const res_kategori = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/kategori",
    {
      headers: {
        Authorization: "Bearer " + cookies.access_token,
      },
    }
  );
  const data_kategori = await res_kategori.json();

  const res_status_okupansi = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/status/okupansi",
    {
      headers: {
        Authorization: "Bearer " + cookies.access_token,
      },
    }
  );
  const data_status_okupansi = await res_status_okupansi.json();

  return { props: { data_kategori, data_status_okupansi } };
};

const Page: NextPageWithLayout = ({
  data_kategori,
  data_status_okupansi,
}: any) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser]: any = useState({});

  useEffect(() => {
    const cookie = parseCookies();
    setUser(jwtDecode<JwtPayload>(cookie.access_token));
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const cookie = parseCookies();

    setIsLoading(true);

    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/aset/input",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + cookie.access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kategori_id: event.target.category.value,
          perusahaan_id: user.perusahaan,
          name: event.target.name.value,
          created_by: user.id,
          description: event.target.description.value,
          kode_occupancy: event.target.occupancy.value,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();

      console.log(data);

      alert(
        "Input data aset berhasil.\n\nKlik OK untuk melanjutkan isi detail aset."
      );
      router.push("/aset/" + data.identifiers[0].aset_id + "/edit");
    } else {
      if (response.status === 401) {
        destroyCookie(null, "access_token");

        alert("Session expired, please relogin");
        router.push("/login");
      } else {
        alert(response.statusText);
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{`Input - Data Aset - ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
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
                  Input
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="mx-auto max-w-screen-xl mt-4">
          <h1 className="mb-4 mt-6 text-2xl font-bold text-gray-900 dark:text-white">
            Input Data Aset
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nama
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Masukkan nama aset anda"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Kategori
                </label>
                <select
                  id="category"
                  name="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  {data_kategori.map((kategori: any, index: number) => (
                    <option key={index} value={kategori.kategori_id}>
                      {kategori.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="occupancy"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Okupansi
                </label>
                <select
                  id="occupancy"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  name="occupancy"
                >
                  {data_status_okupansi.map((okupansi: any, index: number) => (
                    <option key={index} value={okupansi.status_id}>
                      {okupansi.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Deskripsi
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Masukkan deskripsi aset anda"
                  defaultValue={""}
                />
              </div>
            </div>
            {/* <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-700"
            >
              Simpan
            </button> */}
            {isLoading ? (
              <button
                disabled
                type="button"
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-700"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Loading...
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-700"
              >
                Simpan
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
