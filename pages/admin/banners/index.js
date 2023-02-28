import Head from "next/head";
import BannersPageContent from "../../../components/views/banners";
import { useRouter } from "next/router";
import AdminLayout from "../../../layouts/admin-layout/admin-layout";
import { useSession } from 'next-auth/react'
export default function BannersPage() {
  const router = useRouter();
  const { data: cookies, status } = useSession()

  return (
    <>
      <Head>
        <title>Banners</title>
      </Head>
      <AdminLayout>
        <BannersPageContent locale={router.locale} cookies={cookies} status={status} />
      </AdminLayout>
    </>
  );
}
