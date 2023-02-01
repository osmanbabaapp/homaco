import ProductsPageContent from "../../../components/views/products";
// import ProductsPageContent from "../../components/views/products";
import Head from "next/head";
import { useRouter } from "next/router";
import AdminLayout from "../../../layouts/admin-layout/admin-layout";

export default function ProductsPage() {
  const router = useRouter();
  let cookies = {};

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <AdminLayout>
        <ProductsPageContent locale={router.locale} cookies={cookies} />
      </AdminLayout>
    </>
  );
}

ProductsPage.layout = "dashboard";
