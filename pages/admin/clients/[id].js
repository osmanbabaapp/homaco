import ClientPageContent from "../../../components/views/clients/client";
import Head from "next/head";
import { useRouter } from "next/router";
import AdminLayout from "../../../layouts/admin-layout/admin-layout";

function EditAdPage(props) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Head>
        <title>Edit Category</title>
      </Head>
      <AdminLayout>
        <ClientPageContent id={id} />
      </AdminLayout>
    </>
  );
}

export default EditAdPage;

EditAdPage.layout = "dashboard";
