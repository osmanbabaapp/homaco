import ProductPageContent from "../../../components/views/products/product";
import Head from "next/head";
import AdminLayout from "../../../layouts/admin-layout/admin-layout";

export default function ProductPage() {
  return (
    <>
      <Head>
        <title>Product</title>
      </Head>
      <AdminLayout>
        <ProductPageContent />
      </AdminLayout>
    </>
  );
}

ProductPage.layout = "dashboard";
