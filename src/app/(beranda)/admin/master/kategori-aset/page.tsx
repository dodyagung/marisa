import Dummy from "@/components/dummy";
import { Metadata } from "next";

const PAGE_NAME = "Master Kategori Aset";

export const metadata: Metadata = {
  title: PAGE_NAME + " - " + process.env.APP_NAME,
};

export default function Page() {
  return (
    <>
      <Dummy text={PAGE_NAME} />
    </>
  );
}
