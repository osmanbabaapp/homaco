import CategoryPageContent from "../../../components/views/categories/category";
import Head from "next/head";
import AdminLayout from "../../../layouts/admin-layout/admin-layout";

export default function CategoryPage() {
  return (
    <>
      <Head>
        <title>Category</title>
      </Head>
      <AdminLayout>
        <CategoryPageContent />
      </AdminLayout>
    </>
  );
}
