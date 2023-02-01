import CategoriesPageContent from "../../../components/views/categories";
import Head from "next/head";
import { useRouter } from "next/router";
import AdminLayout from "../../../layouts/admin-layout/admin-layout";

export default function CategoriesPage() {
  const router = useRouter();

  let cookies = {};

  return (
    <>
      <Head>
        <title>Categories</title>
      </Head>
      <AdminLayout>
        <CategoriesPageContent locale={router.locale} cookies={cookies} />
      </AdminLayout>
    </>
  );
}

// CategoriesPage.layout = "dashboard";
