import { useEffect, type ReactElement } from "react";
import { DashboardLayout } from "@/components/@layout";

import { NextPageWithLayout } from "./_app";
import Head from "next/head";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import nookies from "nookies";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";

if (typeof Highcharts === "object") {
  highchartsMap(Highcharts);
}

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

  const res_map = await fetch(
    "https://code.highcharts.com/mapdata/countries/id/id-all.topo.json"
  );
  const data_map = await res_map.json();

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
      data_map,
    },
  };
};

const Page: NextPageWithLayout = ({
  data_rekap_per_kategori,
  data_rekap_per_okupansi,
  data_rekap_per_perusahaan,
  data_map,
}: any) => {
  const data = [
    ["id-3700", 10],
    ["id-ac", 11],
    ["id-jt", 12],
    ["id-be", 13],
    ["id-bt", 14],
    ["id-kb", 15],
    ["id-bb", 16],
    ["id-ba", 17],
    ["id-ji", 18],
    ["id-ks", 19],
    ["id-nt", 20],
    ["id-se", 21],
    ["id-kr", 22],
    ["id-ib", 23],
    ["id-su", 24],
    ["id-ri", 25],
    ["id-sw", 26],
    ["id-ku", 27],
    ["id-la", 28],
    ["id-sb", 29],
    ["id-ma", 30],
    ["id-nb", 31],
    ["id-sg", 32],
    ["id-st", 33],
    ["id-pa", 34],
    ["id-jr", 35],
    ["id-ki", 36],
    ["id-1024", 37],
    ["id-jk", 38],
    ["id-go", 39],
    ["id-yo", 40],
    ["id-sl", 41],
    ["id-sr", 42],
    ["id-ja", 43],
    ["id-kt", 44],
  ];

  const dataMaps = {
    chart: {
      map: data_map,
    },

    title: {
      text: undefined,
    },

    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: "bottom",
      },
    },

    colorAxis: {
      min: 0,
    },

    series: [
      {
        data: data,
        name: "Random data",
        states: {
          hover: {
            color: "#BADA55",
          },
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}",
        },
      },
    ],
  };

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

  const dataRekapPerPerusahaanRupiah: ApexOptions = {
    theme: {
      palette: "palette3",
    },
    series: [
      {
        name: "Nilai",
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

  const dataRekapPerPerusahaanJumlah: ApexOptions = {
    theme: {
      palette: "palette3",
    },
    series: [
      {
        name: "Jumlah",
        data: data_rekap_per_perusahaan.map((data: any) => data.jml_aset),
      },
    ],
    xaxis: {
      categories: data_rekap_per_perusahaan.map((data: any) => data.perusahaan),
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
                height={360}
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
                height={360}
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
                height={360}
              />
            </div>
          </div>
        </div>
        <div className="grid mt-4 w-full grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="w-full">
              {/* <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Nilai Aset by Perusahaan
              </h5> */}
              {/* Line Chart */}
              <HighchartsReact
                options={dataMaps}
                constructorType={"mapChart"}
                highcharts={Highcharts}
              />
            </div>
          </div>
        </div>
        <div className="grid mt-4 w-full grid-cols-1 gap-4">
          <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="w-full">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Nilai Aset by Perusahaan
              </h5>
              {/* Line Chart */}
              <ReactApexChart
                options={dataRekapPerPerusahaanRupiah}
                series={dataRekapPerPerusahaanRupiah.series}
                type="bar"
                height={400}
              />
            </div>
          </div>
        </div>
        <div className="grid mt-4 w-full grid-cols-1 gap-4">
          <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="w-full">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Jumlah Aset by Perusahaan
              </h5>
              {/* Line Chart */}
              <ReactApexChart
                options={dataRekapPerPerusahaanJumlah}
                series={dataRekapPerPerusahaanJumlah.series}
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
