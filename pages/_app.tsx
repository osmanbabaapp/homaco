import "../styles/globals.css";
import Head from "next/head";

import type { AppProps } from "next/app";
import PageWithLayoutType from "../layouts/page-with-layout";
import DrawerContainer from "../components/drawer/drawer-container";
import localFont from "@next/font/local";
import MobileNavContextProvider from "../context/mobile-nav-context";
import { SessionProvider } from "next-auth/react";
import LayoutContextProvider from "../context/layout.context";
import GlobalStyles from "../styles/globalStyles";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { useStore } from "../redux/index";
import AuthGuard from "@/components/auth-guard";
import { ApolloProvider } from "@apollo/client";
import gqlClient from "../helpers/apollo-gql";

// layout types
type AppLayoutProps = AppProps & {
	Component: PageWithLayoutType;
	pageProps: any;
};

const jazeeraFont = localFont({
	src: [
		{
			path: "../public/fonts/Al-Jazeera-Arabic-Regular.ttf",
			weight: "normal",
		},
		{
			path: "../public/fonts/Al-Jazeera-Arabic-Bold.ttf",
			weight: "bold",
		},
	],
});

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();

	const store = useStore(pageProps.initialReduxState);

	const imageBg = router.pathname.includes("/admin") ? false : true;
	const locale = router.locale;
	return (
		<>
			<Head>
				<link rel='shortcut icon' href='/media/dahir/dahir-123.png' />

				<meta
					name='google-site-verification'
					content='qg4zIniEUpBAY4rrmeNIR7DvFNqR71Bf9au5J3lUIxg0000000000000'
				/>
				<meta
					name='google-site-verification'
					content='h1M0H97zNrzTcJCcNfZLBOSMdwm-awqkDV6pe24Wcb8'
				/>
			</Head>
			<GlobalStyles image={imageBg} dir={locale === "ar" ? "rtl" : "ltr"} />
			<div
				className={jazeeraFont.className}
				style={locale !== "tr" ? { ...jazeeraFont.style } : {}}
			>
				<ApolloProvider client={gqlClient}>
					<Provider store={store}>
						<style jsx global>{`
							:root {
								--font-sans: ${jazeeraFont.style.fontFamily};
							}
							html,
							p,
							div,
							span,
							h1,
							h2,
							h3,
							h4,
							h5,
							h6 {
								font-family: ${jazeeraFont.style.fontFamily};
							}
						`}</style>
						<SessionProvider
							session={pageProps?.session}
							refetchInterval={5 * 60}
						>
							<MobileNavContextProvider>
								<LayoutContextProvider>
									<MobileNavContextProvider>
										{router.pathname.startsWith("/admin") ? (
											<AuthGuard>
												<Component {...pageProps} />
											</AuthGuard>
										) : (
											<Component {...pageProps} />
										)}
										<DrawerContainer />
									</MobileNavContextProvider>
								</LayoutContextProvider>
							</MobileNavContextProvider>
						</SessionProvider>
					</Provider>
				</ApolloProvider>
			</div>
		</>
	);
}

export default MyApp;
