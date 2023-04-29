import Head from "next/head";
import axios from "axios";
import https from "https";
import { useRouter } from "next/router";

export default function EditWebsitePage(props: any) {
	const router = useRouter();

	return (
		<>
			<Head>
				<title>Edit Website</title>
			</Head>
		</>
	);
}

EditWebsitePage.layout = "dashboard";

const reqUrl =
	process.env.NEXT_PUBLIC_HOST! +
	process.env.NEXT_PUBLIC_ALL_HOME_PAGE_SETTINGS;

export async function getServerSideProps(context: any) {
	const { locale } = context;
	let props = {};
	// get Data

	const httpsAgent = new https.Agent({
		rejectUnauthorized: false,
	});

	try {
		const { data: res } = await axios.get(
			reqUrl,
			{
				httpsAgent: httpsAgent,
				headers: { websiteHostName: process.env.NEXT_PUBLIC_WEBSITE_HOST_NAME },
			} // for development only
		);

		if (res?.status === true) {
			props = {
				status: true,
				data: res?.description,
				products: res?.products,
			};
		} else {
			props = {
				status: false,
				data: res?.description,
				products: res?.products,

				failCode: 400,
			};
		}
	} catch (e: any) {
		console.error("Error");
		console.error(e.toString());
		if (e?.response?.status === 400) {
			props = {
				failCode: 400,
				status: false,
				description: "Something went wrong! Please try again later.",
			};
		}
	}

	return {
		props: props,
	};
}
