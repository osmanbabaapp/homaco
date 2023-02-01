import BannerPageContent from "../../../components/views/banners/banner";
import Head from "next/head";
import AdminLayout from "../../../layouts/admin-layout/admin-layout";

export default function BannerPage() {
  return (
    <>
      <Head>
        <title>Banner</title>
      </Head>
      <AdminLayout>
        <BannerPageContent />
      </AdminLayout>
    </>
  );
}

BannerPage.layout = "dashboard";
