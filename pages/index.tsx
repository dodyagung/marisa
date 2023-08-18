import { useEffect, type ReactElement } from "react";
import { DashboardLayout } from "@/components/@layout";

import { NextPageWithLayout } from "./_app";
import Head from "next/head";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import nookies from "nookies";

const rupiah = (number: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

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

  const res_rekap_per_perusahaan = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/dashboard/rekap-per-perusahaan",
    {
      headers: {
        Authorization: "Bearer " + cookies.access_token,
      },
    }
  );
  const data_rekap_per_perusahaan = await res_rekap_per_perusahaan.json();

  return {
    props: {
      data_rekap_per_kategori,
      data_rekap_per_okupansi,
      data_rekap_per_perusahaan,
    },
  };
};

const Page: NextPageWithLayout = ({
  data_rekap_per_kategori,
  data_rekap_per_okupansi,
  data_rekap_per_perusahaan,
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

  const dataRekapPerOkupansiJumlah: ApexOptions = {
    theme: {
      palette: "palette3",
    },
    series: data_rekap_per_okupansi.map((data: any) => data.jml_aset),
    labels: data_rekap_per_okupansi.map((data: any) => data.name),
    legend: {
      position: "bottom",
    },
  };

  const dataRekapPerOkupansiRupiah: ApexOptions = {
    theme: {
      palette: "palette3",
    },
    series: data_rekap_per_okupansi.map((data: any) => data.total_nilai_aset),
    labels: data_rekap_per_okupansi.map((data: any) => data.name),
    legend: {
      position: "bottom",
    },
  };

  const dataRekapPerPerusahaan: ApexOptions = {
    theme: {
      palette: "palette3",
    },
    series: [
      {
        name: "Jumlah",
        data: data_rekap_per_perusahaan.map(
          (data: any) => data.total_nilai_aset
        ),
      },
    ],
    xaxis: {
      categories: data_rekap_per_perusahaan.map((data: any) => data.perusahaan),
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return rupiah(value);
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
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
                Jumlah Aset by Kategori
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
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Jumlah Aset by Okupansi
              </h5>
              {/* Line Chart */}
              <ReactApexChart
                options={dataRekapPerOkupansiJumlah}
                series={dataRekapPerOkupansiJumlah.series}
                type="pie"
                width={360}
              />
            </div>
          </div>
          <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="w-full">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Nilai Aset by Okupansi
              </h5>
              {/* Line Chart */}
              <ReactApexChart
                options={dataRekapPerOkupansiRupiah}
                series={dataRekapPerOkupansiRupiah.series}
                type="pie"
                width={360}
              />
            </div>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-4">
          <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="w-full">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Nilai Aset by Perusahaan
              </h5>
              {/* Line Chart */}
              <ReactApexChart
                options={dataRekapPerPerusahaan}
                series={dataRekapPerPerusahaan.series}
                type="bar"
                height={400}
              />
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
