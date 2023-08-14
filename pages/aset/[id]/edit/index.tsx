import { useState, type ReactElement, useEffect } from "react";
import { AuthLayout, DashboardLayout } from "@/components/@layout";
import Image from "next/image";
import Logo from "/public/logo.png";
import { useRouter } from "next/router";
import Head from "next/head";
import nookies, { destroyCookie, parseCookies } from "nookies";
import { NextPageWithLayout } from "../../../_app";
import { data } from "autoprefixer";
import jwtDecode, { JwtPayload } from "jwt-decode";

const rupiah = (number: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

export const getServerSideProps = async (ctx: any) => {
  const cookies = nookies.get(ctx);
  const id = ctx.query.id;

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

  const res1 = await fetch(process.env.NEXT_PUBLIC_API_URL + "/aset/" + id, {
    headers: {
      Authorization: "Bearer " + cookies.access_token,
    },
  });
  const data1 = await res1.json();

  const res2 = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/aset/detail/" + id,
    {
      headers: {
        Authorization: "Bearer " + cookies.access_token,
      },
    }
  );

  let data2;
  if (res2.ok) {
    data2 = await res2.json();
  } else {
    data2 = [{}];
  }

  const res3 = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/aset/foto/" + id,
    {
      headers: {
        Authorization: "Bearer " + cookies.access_token,
      },
    }
  );

  let data3;
  if (res3.ok) {
    data3 = await res3.json();
  } else {
    data3 = [{}];
  }

  return {
    props: { data_kategori, data_status_okupansi, data1, data2, data3 },
  };
};

const Page: NextPageWithLayout = ({
  data_kategori,
  data_status_okupansi,
  data1,
  data2,
  data3,
}: any) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser]: any = useState({});

  useEffect(() => {
    const cookie = parseCookies();
    setUser(jwtDecode<JwtPayload>(cookie.access_token));
  }, []);

  const handleSubmitInformasi = async (event: any) => {
    event.preventDefault();
    const cookie = parseCookies();

    setIsLoading(true);

    console.log(router.query.id);

    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/aset/" + router.query.id,
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + cookie.access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kategori_id: event.target.category.value,
          name: event.target.name.value,
          last_updated_by: user.id,
          description: event.target.description.value,
          kode_occupancy: event.target.occupancy.value,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();

      alert("Edit data aset berhasil.");
      router.push("/aset/" + router.query.id);
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

  const handleSubmitDetail = async (event: any) => {
    event.preventDefault();
    const cookie = parseCookies();

    setIsLoading(true);

    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/aset/detail/" + router.query.id,
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + cookie.access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kode_pos: event.target.kode_pos.value,
          detail_alamat: event.target.detail_alamat.value,
          nilai_aset_perolehan: event.target.nilai_aset_perolehan.value,
          luas: event.target.luas.value,
          panjang: event.target.panjang.value,
          lebar: event.target.lebar.value,
          jumlah_lantai: event.target.jumlah_lantai.value,
          nilai_aset_sekarang: event.target.nilai_aset_sekarang.value,
          biaya_aset: event.target.biaya_aset.value,
          nilai_depresiasi: event.target.nilai_depresiasi.value,
          tgl_perolehan: event.target.tgl_perolehan.value,
        }),
      }
    );

    console.log(event.target.tgl_perolehan.value);

    if (response.ok) {
      const data = await response.json();

      alert("Edit data aset detail berhasil.");
      router.push("/aset/" + router.query.id);
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
        <title>{`Edit - Detail - Data Aset - ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
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
                  Detail
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
                  Edit
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
                  Edit Aset
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
                className="hidden rounded-lg "
                id="informasi"
                role="tabpanel"
                aria-labelledby="informasi-tab"
              >
                <form className="mt-8" onSubmit={handleSubmitInformasi}>
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
                        defaultValue={data1.name}
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
                        defaultValue={data1.kategori.kategori_id}
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
                        defaultValue={data1.occupancy.status_id}
                      >
                        {data_status_okupansi.map(
                          (okupansi: any, index: number) => (
                            <option key={index} value={okupansi.status_id}>
                              {okupansi.name}
                            </option>
                          )
                        )}
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
                        defaultValue={data1.description}
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
              <div
                className="hidden rounded-lg"
                id="detail"
                role="tabpanel"
                aria-labelledby="detail-tab"
              >
                <form className="mt-8" onSubmit={handleSubmitDetail}>
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="detail_alamat"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Alamat
                      </label>
                      <textarea
                        id="detail_alamat"
                        name="detail_alamat"
                        rows={4}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Masukkan alamat"
                        defaultValue={data2.detail_alamat}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="kode_pos"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Kode Pos
                      </label>
                      <input
                        type="text"
                        name="kode_pos"
                        id="kode_pos"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Masukkan kode pos"
                        required
                        defaultValue={data2.kode_pos}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="luas"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Luas
                      </label>
                      <input
                        type="text"
                        name="luas"
                        id="luas"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Masukkan luas"
                        required
                        defaultValue={data2.luas}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="panjang"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Panjang
                      </label>
                      <input
                        type="text"
                        name="panjang"
                        id="panjang"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Masukkan panjang"
                        required
                        defaultValue={data2.panjang}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lebar"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Lebar
                      </label>
                      <input
                        type="text"
                        name="lebar"
                        id="lebar"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Masukkan lebar"
                        required
                        defaultValue={data2.lebar}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="jumlah_lantai"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Jumlah Lantai
                      </label>
                      <input
                        type="text"
                        name="jumlah_lantai"
                        id="jumlah_lantai"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Masukkan jumlah_lantai"
                        required
                        defaultValue={data2.jumlah_lantai}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="nilai_aset_perolehan"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Nilai Aset Perolehan
                      </label>
                      <input
                        type="text"
                        name="nilai_aset_perolehan"
                        id="nilai_aset_perolehan"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Masukkan nilai_aset_perolehan"
                        required
                        defaultValue={data2.nilai_aset_perolehan}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="nilai_aset_sekarang"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Nilai Aset Sekarang
                      </label>
                      <input
                        type="text"
                        name="nilai_aset_sekarang"
                        id="nilai_aset_sekarang"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Masukkan nilai_aset_sekarang"
                        required
                        defaultValue={data2.nilai_aset_sekarang}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="biaya_aset"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Biaya Aset
                      </label>
                      <input
                        type="text"
                        name="biaya_aset"
                        id="biaya_aset"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Masukkan biaya_aset"
                        required
                        defaultValue={data2.biaya_aset}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="nilai_depresiasi"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Nilai Depresiasi
                      </label>
                      <input
                        type="text"
                        name="nilai_depresiasi"
                        id="nilai_depresiasi"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Masukkan nilai_depresiasi"
                        required
                        defaultValue={data2.nilai_depresiasi}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="tgl_perolehan"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Tanggal Perolehan
                      </label>
                      <input
                        type="date"
                        name="tgl_perolehan"
                        id="tgl_perolehan"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Masukkan tgl_perolehan"
                        required
                        defaultValue={data2.tgl_perolehan}
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
              <div
                className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                id="foto"
                role="tabpanel"
                aria-labelledby="foto-tab"
              >
                <div
                  id="custom-controls-gallery"
                  className="relative w-full"
                  data-carousel="slide"
                >
                  {/* Carousel wrapper */}
                  <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                    {data3?.map((foto: any, index: number) => (
                      <div
                        key={index}
                        className="hidden duration-700 ease-in-out"
                        data-carousel-item=""
                      >
                        <img
                          src={foto.url}
                          className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center items-center pt-4">
                    <button
                      type="button"
                      className="flex justify-center items-center mr-4 h-full cursor-pointer group focus:outline-none"
                      data-carousel-prev=""
                    >
                      <span className="text-gray-400 hover:text-gray-900 dark:hover:text-white group-focus:text-gray-900 dark:group-focus:text-white">
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 5H1m0 0 4 4M1 5l4-4"
                          />
                        </svg>
                        <span className="sr-only">Previous</span>
                      </span>
                    </button>
                    <button
                      type="button"
                      className="flex justify-center items-center h-full cursor-pointer group focus:outline-none"
                      data-carousel-next=""
                    >
                      <span className="text-gray-400 hover:text-gray-900 dark:hover:text-white group-focus:text-gray-900 dark:group-focus:text-white">
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                        <span className="sr-only">Next</span>
                      </span>
                    </button>
                  </div>
                </div>

                {/* <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
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
                </dl> */}
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
