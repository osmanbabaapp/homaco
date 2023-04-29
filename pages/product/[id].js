import Head from "next/head";
import { useRouter } from "next/router";
import { DefaultSeo, NextSeo, ProductJsonLd } from "next-seo";
import moment from "moment";

import OneAdV2Page from "../../components/views/site-product/one-ad-v2";
import { Button, Result } from "antd";
import Link from "next/link";
import { useMemo } from "react";
import MainLayout from "../../layouts/main-layout/index";
import Contact from "../../components/sections/contact";
import { gql, GraphQLClient } from "graphql-request";

ProductPage.layout = "none";
export default function ProductPage(props) {
	const router = useRouter();

	const product = props.product;

	console.log("product");
	console.log(product);

	const googleCodes = useMemo(
		() => props?.category?.map((item) => item?.googleCode) ?? ["3750"],
		[props?.category]
	);

	return (
		<>
			<Head>
				<title>{product?.title} | Homaco Makina</title>
				<meta name='keywords' content={product?.title} />

				<meta
					property='product:plural_title'
					content={product?.title + " - " + product?.publisher?.name}
				/>
				<meta property='product:price:amount' content={1000} />
				<meta property='product:price:currency' content='TRY' />
				<meta property='product:category' content={googleCodes[0]} />
				<meta
					property='og:locale:alternate'
					content={
						router.locale === "ar"
							? "ar_AR"
							: router.locale === "en"
							? "en_GB"
							: "tr_TR"
					}
				/>
			</Head>

			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						availableChannel: {
							"@type": "ServiceChannel",
							name: product?.title + " - " + product?.publisher?.name,
							availableLanguage:
								router.locale === "tr"
									? {
											"@type": "Language",
											name: "Turkish",
											alternateName: "tr",
									  }
									: router.locale === "en"
									? {
											"@type": "Language",
											name: "English",
											alternateName: "en",
									  }
									: {
											"@type": "Language",
											name: "Arabic",
											alternateName: "ar",
									  },
						},
					}),
				}}
			></script>

			<DefaultSeo
				openGraph={{
					type: "website",
					locale:
						router.locale === "en"
							? "en_TR"
							: router.locale === "tr"
							? "tr_TR"
							: "ar_TR",
					url: process.env.NEXT_PUBLIC_WEB,
					site_name: product?.publisher?.name,
				}}
				twitter={{
					handle: "@handle",
					site: "@site",
					cardType: "summary_large_image",
				}}
			/>

			<NextSeo
				title={`${product?.title + " - " + product?.publisher?.name}`.slice(
					0,
					65
				)}
				description={product?.desc?.replace(/(<([^>]+)>)/gi, "").slice(0, 170)}
				canonical={`${process.env.NEXT_PUBLIC_WEB}/${router.locale}${router.asPath}`}
				openGraph={{
					locale:
						router.locale === "ar"
							? "ar-AR"
							: router?.locale === "tr"
							? "tr-TR"
							: "en-GB",
					title: product?.title + " - " + product?.publisher?.name,
					url: `${process.env.NEXT_PUBLIC_WEB}/${router.locale}${router.asPath}`,
					description: product?.desc,
					type: "product",
					images: [
						{
							url: `${process.env.NEXT_PUBLIC_HOST}${props?.data?.primaryImage}`,
							alt: `${process.env.NEXT_PUBLIC_WEB} | ${
								product?.title + " - " + product?.publisher?.name
							}`,
						},
					],
				}}
				facebook='00000000000000'
				twitter={{
					handle: "@handle",
					site: "@product",
					cardType: "summary_large_image",
				}}
				languageAlternates={[
					{
						href: `${process.env.NEXT_PUBLIC_WEB}/ar${router.asPath}`,
						hrefLang: "ar",
					},
					{
						href: `${process.env.NEXT_PUBLIC_WEB}/tr${router.asPath}`,
						hrefLang: "tr",
					},
					{
						href: `${process.env.NEXT_PUBLIC_WEB}${router.asPath}`,
						hrefLang: "tr",
					},
					{
						href: `${process.env.NEXT_PUBLIC_WEB}/en${router.asPath}`,
						hrefLang: "en",
					},
				]}
				// facebook={{ }}
			/>

			<ProductJsonLd
				type='Product'
				// sku="In Stock"
				sku={props?.data?.id}
				productName={product?.title}
				images={[
					`${process.env.NEXT_PUBLIC_HOST}${props?.data?.primaryImage}`,
					`${process.env.NEXT_PUBLIC_HOST}${props?.data?.primaryImage}`,
					`${process.env.NEXT_PUBLIC_HOST}${props?.data?.image1}`,
					`${process.env.NEXT_PUBLIC_HOST}${props?.data?.image2}`,
					`${process.env.NEXT_PUBLIC_HOST}${props?.data?.image3}`,
				]}
				offers={[
					{
						"@type": "Offer",
						price: 1000,
						priceCurrency: "TRY",
						priceValidUntil: moment().toISOString(),
						itemCondition: "https://schema.org/NewCondition",
						availability: "https://schema.org/InStock",
						url: `${process.env.NEXT_PUBLIC_WEB}${router.asPath}`,
						seller: {
							"@type": "Organization",
							name: product?.publisher?.name,
						},
					},
				]}
				description={product?.desc}
				brand={product?.publisher?.name}
				color=''
				manufacturerName={product?.publisher?.name}
				manufacturerLogo={`${process.env.NEXT_PUBLIC_HOST}${product?.primary_image}`}
				material='steel'
				slogan={product?.title + " - " + product?.publisher?.name}
				disambiguatingDescription={product?.desc}
				releaseDate=''
				productionDate=''
				purchaseDate=''
				award=''
				mpn=''
			/>

			{props.status !== false ? (
				<MainLayout>
					<div className='no-scroll-y'>
						<div className='main-page-wrapper has-particles'>
							<OneAdV2Page
								globalT={props.globalT}
								id={product?.id}
								data={product}
								company={props?.company}
								categories={props?.category}
								adjValues={product?.adjects}
								locale={router.locale}
							/>
							<Contact />
						</div>
					</div>
				</MainLayout>
			) : (
				<Result
					status='warning'
					title='There are some problems with your operation.'
					extra={
						<Link legacyBehavior href={`/`}>
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

export async function getStaticPaths(ctx) {
	let paths = [];

	const url = process.env.NEXT_PUBLIC_HOST + "graphql";

	const website = process.env.NEXT_PUBLIC_WEBSITE;
	// query
	const AllProductsQuery = gql`
		query ($website: String!) {
			products(website: $website) {
				slug_ar
				slug_en
				slug_tr
			}
		}
	`;

	const graphQLClient = new GraphQLClient(url);
	const data = await graphQLClient.request(AllProductsQuery, {
		website: website,
	});

	data?.products?.map((item) => {
		for (const locale of ctx?.locales) {
			paths.push({
				params: {
					id: locale === "ar" ? item[`slug_en`] : item[`slug_${locale}`],
					locale,
				},
				locale,
			});
		}
	});

	return {
		paths,
		fallback: "blocking",
	};
}

export async function getStaticProps({ params, locale }) {
	// get slug
	const slug = params?.id;
	const website = process.env.NEXT_PUBLIC_WEBSITE;

	// fetch data
	const OneProductQuery = gql`
    query($website: String!, $slug: String!) {
      product(website: $website, slug: $slug) {
        id,
        title: title_${locale} 
        desc: desc_${locale}
        primary_image
        image1
        image2
        image3
        video
        adjects {
          title: adj_${locale}
          values: adj_value
        }
        publisher {
          name
          id
        }
      }
    }
  `;
	// const url = 'http://localhost:8080/graphql'
	const url = process.env.NEXT_PUBLIC_HOST + "graphql";
	// const url = 'https://os-workspace-api.vercel.app/graphql'

	const graphQLClient = new GraphQLClient(url);
	const data = await graphQLClient.request(OneProductQuery, {
		slug: slug,
		website: website,
	});

	return {
		props: {
			...data,
		},
		// Next.js will attempt to re-generate the page:
		// - When a request comes in
		// - At most once every 10 seconds
		revalidate: 60 * 1, // In seconds => 1 minute
	};
}
