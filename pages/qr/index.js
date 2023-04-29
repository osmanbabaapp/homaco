import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";

import QrScreen from "components/views/qr/index";
import { Button, Result } from "antd";
import Link from "next/link";

// Home.layout = "default";
export default function Home(props) {
	const router = useRouter();
	const locale = router.locale;

	console.log("props", props);

	return (
		<>
			{props.status !== false && (
				<>
					<Head>
						<title>Home | United Ambalaj</title>
					</Head>
				</>
			)}

			{props.status !== false ? (
				<QrScreen data={props?.data} />
			) : (
				<Result
					status='warning'
					title='There are some problems with your operation.'
					extra={
						<Link href={`/`}>
							<a>
								<Button type='primary'>Go Home</Button>
							</a>
						</Link>
					}
				/>
			)}
		</>
	);
}

export async function getServerSideProps(context) {
	const { locale } = context;
	let props = {};
	// get Data

	try {
		const { data: res } = await axios.get(
			process.env.NEXT_PUBLIC_HOST + process.env.NEXT_PUBLIC_ALL_CLIENTS,

			{
				headers: {
					lang: locale,
					websiteHostName: process.env.NEXT_PUBLIC_WEBSITE_HOST_NAME,
				},
			}
		);

		if (res?.status === true) {
			props = {
				status: true,
				data: "res?.description",
			};
		} else {
			props = {
				status: false,
				data: "res?.description",
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
