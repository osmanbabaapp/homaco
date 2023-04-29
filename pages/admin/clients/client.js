import ClientPageContent from "../../../components/views/clients/client";
import Head from "next/head";
import AdminLayout from "../../../layouts/admin-layout/admin-layout";

export default function CategoryPage() {
	return (
		<>
			<Head>
				<title>Category</title>
			</Head>
			<AdminLayout>
				<ClientPageContent />
			</AdminLayout>
		</>
	);
}

CategoryPage.layout = "dashboard";
