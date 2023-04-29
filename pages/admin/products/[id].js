import Head from "next/head";
import { useRouter } from "next/router";
import AdminLayout from "../../../layouts/admin-layout/admin-layout";
import ProductPageContent from "../../../components/views/products/product";

function EditAdPage(props) {
	const router = useRouter();
	const { id } = router.query;

	return (
		<>
			<Head>
				<title>Edit Product</title>
			</Head>
			<AdminLayout>
				<ProductPageContent id={id} />
			</AdminLayout>
		</>
	);
}

export default EditAdPage;

EditAdPage.layout = "dashboard";
