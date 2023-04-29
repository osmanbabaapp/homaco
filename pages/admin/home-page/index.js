import Head from "next/head";
import HomePageContent from "../../../components/views/home-page/index";
import { useRouter } from "next/router";
import AdminLayout from "../../../layouts/admin-layout/admin-layout";

export default function Home(props) {
	const router = useRouter();

	const locale = router.locale;
	return (
		<>
			<Head>
				<title>Home Page</title>
			</Head>
			<AdminLayout>
				<HomePageContent
					data={props?.data}
					products={props?.products}
					locale={locale}
				/>
			</AdminLayout>
		</>
	);
}

Home.layout = "dashboard";
