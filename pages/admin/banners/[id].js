import BannerPageContent from "../../../components/views/banners/banner";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import AdminLayout from "../../../layouts/admin-layout/admin-layout";

function EditAdPage(props) {
	const router = useRouter();
	const { id } = router.query;
	const { data: cookies, status } = useSession();
	return (
		<>
			<Head>
				<title>Edit Banner</title>
			</Head>
			<AdminLayout>
				<BannerPageContent id={id} cookies={cookies} status={status} />
			</AdminLayout>
		</>
	);
}

export default EditAdPage;
