import Head from "next/head";
import BannersPageContent from "../../../components/views/banners";
import { useRouter } from "next/router";
import AdminLayout from "../../../layouts/admin-layout/admin-layout";
export default function BannersPage() {
  const router = useRouter();
  let cookies = {};

  return (
    <>
      <Head>
        <title>Banners</title>
      </Head>
      <AdminLayout>
        <BannersPageContent locale={router.locale} cookies={cookies} />
      </AdminLayout>
    </>
  );
}

BannersPage.layout = "dashboard";
