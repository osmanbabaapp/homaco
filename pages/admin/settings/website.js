import Head from "next/head";
import axios from "axios";
import https from "https";
import SettingsPageContent from "components/views/settings";
import { useRouter } from "next/router";

export default function EditWebsitePage(props) {
	const router = useRouter();

	const locale = router.locale;
	return (
		<>
			<Head>
				<title>Edit Website</title>
			</Head>

			<SettingsPageContent data={props.data} locale={locale} />
		</>
	);
}

EditWebsitePage.layout = "dashboard";

export async function getServerSideProps(context) {
	const { locale } = context;
	let props = {};
	// get Data

	const httpsAgent = new https.Agent({
		rejectUnauthorized: false,
	});

	try {
		const { data: res } = await axios.get(
			process.env.NEXT_PUBLIC_HOST +
				process.env.NEXT_PUBLIC_ALL_HOME_PAGE_SETTINGS,
			{
				httpsAgent: httpsAgent,
				headers: { websiteHostName: process.env.NEXT_PUBLIC_WEBSITE_HOST_NAME },
			} // for development only
		);

		if (res?.status === true) {
			props = {
				status: true,
				data: res?.description,
			};
		} else {
			props = {
				status: false,
				data: res?.description,
				failCode: 400,
			};
		}
	} catch (e) {
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
