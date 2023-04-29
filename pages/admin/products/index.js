import ProductsPageContent from "../../../components/views/products";
// import ProductsPageContent from "../../components/views/products";
import Head from "next/head";
import { useRouter } from "next/router";
import AdminLayout from "../../../layouts/admin-layout/admin-layout";
import { useSession } from "next-auth/react";

export default function ProductsPage() {
	const router = useRouter();
	const { data: cookies, status } = useSession();

	return (
		<>
			<Head>
				<title>Products</title>
			</Head>
			<AdminLayout>
				<ProductsPageContent
					locale={router.locale}
					cookies={cookies}
					status={status}
				/>
			</AdminLayout>
		</>
	);
}

ProductsPage.layout = "dashboard";
