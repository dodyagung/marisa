import Dummy from "@/components/dummy";
import { Metadata } from "next";

const PAGE_NAME = "Beranda";

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
