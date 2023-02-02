import Head from "next/head";
import { useRouter } from "next/router";
import { DefaultSeo, NextSeo, ProductJsonLd } from "next-seo";
import axios from "axios";
import moment from "moment";

import OneAdV2Page from "../../components/views/site-product/one-ad-v2";
import { makeURLFriendly } from "../../helpers/generate-url-withname";
import { Button, Result } from "antd";
import Link from "next/link";
import { useMemo, useEffect } from "react";
import MainLayout from "../../layouts/main-layout/index";
import Contact from "../../components/sections/contact";

ProductPage.layout = "none";
export default function ProductPage(props) {
  console.log("props");
  console.log(props);
  const router = useRouter();
  const locale = router.locale;
  const { id } = router.query;

  const companyName = useMemo(
    () =>
      locale === "ar"
        ? "المتحدة للطباعة والتغليف"
        : locale === "en"
        ? "United Ambalaj EN"
        : locale === "tr"
        ? "United Ambalaj TR"
        : "United Ambalaj default",
    [locale]
  );

  const productName = props.data?.[`title_${router.locale}`] ?? "";

  const additionalMetaTags1 =
    props.data?.[`additionalMetaTags1_${router.locale}`] ?? "";
  const additionalMetaTags2 =
    props.data?.[`additionalMetaTags2_${router.locale}`] ?? "";
  const additionalMetaTags3 =
    props.data?.[`additionalMetaTags3_${router.locale}`] ?? "";
  const additionalMetaTags4 =
    props.data?.[`additionalMetaTags4_${router.locale}`] ?? "";

  const pPrice = useMemo(() => {
    // const lol = props.adjactiveOneValue?.find((x) => x.result.adjactiveEN.toLowerCase().includes("price"));
    const lol = props?.data?.price.toString() ?? "10";
    return lol;
  }, [props]);

  const regexedPrice = useMemo(() => pPrice.replace("$", ""), [pPrice]);

  const googleCodes = useMemo(
    () => props?.category?.map((item) => item?.googleCode) ?? ["3750"],
    [props?.category]
  );

  useEffect(() => {
    // if (router.locale === "tr") {
    //   import("react-facebook-pixel")
    //     .then((x) => x.default)
    //     .then((ReactPixel) => {
    //       ReactPixel.init(
    //         "328247011199158",
    //         {},
    //         {
    //           autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
    //           debug: true, // enable logs
    //         }
    //       );
    //       ReactPixel.pageView();
    //       ReactPixel.track("ViewContent", {
    //         content_category: [...googleCodes],
    //         content_ids: props?.data?.id,
    //         content_name: props?.data?.[`title_${router.locale}`],
    //         content_type: "product",
    //         value: regexedPrice,
    //         // currency: "TRY",
    //         num_items: 1,
    //         search_string: props?.data?.[`title_${router.locale}`],
    //         status: true,
    //         custom_data: {
    //           // override: "tr_TR",
    //           // locale:
    //           //   router.locale === "ar"
    //           //     ? "ar_AR"
    //           //     : router.locale === "en"
    //           //     ? "en_XX"
    //           //     : "tr_TR",
    //         },
    //         // override: "tr_TR",
    //         // locale:
    //         //   router.locale === "ar"
    //         //     ? "ar_AR"
    //         //     : router.locale === "en"
    //         //     ? "en_XX"
    //         //     : "tr_TR",
    //       });
    //     });
    // } else
    // if (router.locale === "ar") {
    //   import("react-facebook-pixel")
    //     .then((x) => x.default)
    //     .then((ReactPixel) => {
    //       ReactPixel.init(
    //         "00000000000000",
    //         {},
    //         {
    //           autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
    //           debug: true, // enable logs
    //         }
    //       );
    //       ReactPixel.pageView();
    //       ReactPixel.track("ViewContent", {
    //         content_category: [...googleCodes],
    //         content_ids: props?.data?.id,
    //         content_name: props?.data?.[`title_${router.locale}`],
    //         content_type: "product",
    //         value: regexedPrice,
    //         // currency: "TRY",
    //         num_items: 1,
    //         search_string: props?.data?.[`title_${router.locale}`],
    //         status: true,
    //         custom_data: {
    //           // override: "ar_AR",
    //           // locale:
    //           //   router.locale === "ar"
    //           //     ? "ar_AR"
    //           //     : router.locale === "en"
    //           //     ? "en_XX"
    //           //     : "tr_TR",
    //         },
    //         // override: "ar_AR",
    //         // locale:
    //         //   router.locale === "ar"
    //         //     ? "ar_AR"
    //         //     : router.locale === "en"
    //         //     ? "en_XX"
    //         //     : "tr_TR",
    //       });
    //     });
    // }
  }, [googleCodes, id, props?.data, regexedPrice, router.locale]);

  return (
    <div className="">
      {props.status !== false && (
        <>
          <Head>
            <title>Home | Homaco Makina</title>

            <meta
              name="keywords"
              content={
                productName +
                "," +
                additionalMetaTags1 +
                "," +
                additionalMetaTags2 +
                "," +
                additionalMetaTags3 +
                "," +
                additionalMetaTags4
              }
            />

            <meta
              property="additionalMetaTags"
              content={
                additionalMetaTags1 +
                "," +
                additionalMetaTags2 +
                "," +
                additionalMetaTags3 +
                "," +
                additionalMetaTags4
              }
            />

            <meta
              property="product:plural_title"
              content={
                props?.data?.[`title_${router.locale}`] +
                  " - " +
                  props?.company?.[`name`] ?? companyName
              }
            />
            <meta property="product:price:amount" content={regexedPrice} />
            <meta property="product:price:currency" content="TRY" />
            <meta property="product:category" content={googleCodes[0]} />
            <meta
              property="og:locale:alternate"
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
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                availableChannel: {
                  "@type": "ServiceChannel",
                  name:
                    props?.data?.[`title_${router.locale}`] +
                      " - " +
                      props?.company?.[`name`] ?? companyName,
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
              url: "https://www.osmanbaba.com/",
              site_name: "SiteName",
            }}
            twitter={{
              handle: "@handle",
              site: "@site",
              cardType: "summary_large_image",
            }}
          />

          <NextSeo
            title={`${
              props?.data?.[`title_${router.locale}`] +
                " - " +
                props?.company?.[`name`] ?? companyName
            }`.slice(0, 65)}
            description={props?.data?.[`description_${router.locale}`]
              ?.replace(/(<([^>]+)>)/gi, "")
              .slice(0, 170)}
            canonical={`${process.env.NEXT_PUBLIC_WEB}/${router.locale}${router.asPath}`}
            openGraph={{
              locale:
                router.locale === "ar"
                  ? "ar-AR"
                  : router?.locale === "tr"
                  ? "tr-TR"
                  : "en-GB",
              title:
                props?.data?.[`title_${router.locale}`] +
                  " - " +
                  props?.company?.[`name`] ?? companyName,
              url: `${process.env.NEXT_PUBLIC_WEB}/${router.locale}${router.asPath}`,
              description: props?.data?.[`description_${router.locale}`],
              type: "product",
              images: [
                {
                  url: `${process.env.NEXT_PUBLIC_HOST}${props?.data?.primaryImage}`,
                  alt: `${props?.headersT?.homeTitle} | ${
                    props?.company?.name ?? companyName
                  } - ${props?.data?.[`title_${router.locale}`]}`,
                },
              ],
            }}
            facebook="00000000000000"
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
            type="Product"
            // sku="In Stock"
            sku={props?.data?.id}
            productName={props?.data?.[`title_${router.locale}`]}
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
                price: regexedPrice,
                priceCurrency: "TRY",
                priceValidUntil: moment().toISOString(),
                itemCondition: "https://schema.org/NewCondition",
                availability: "https://schema.org/InStock",
                url: `${process.env.NEXT_PUBLIC_WEB}${router.asPath}`,
                seller: {
                  "@type": "Organization",
                  name: props?.company?.name ?? companyName,
                },
              },
            ]}
            description={props?.data?.[`description_${router.locale}`]}
            brand={props?.company?.name ?? companyName}
            color=""
            manufacturerName={props?.company?.name ?? companyName}
            manufacturerLogo={`${process.env.NEXT_PUBLIC_HOST}${
              props?.company?.logo?.split('"')[3]
            }`}
            material="steel"
            slogan={
              props?.data?.[`title_${router.locale}`] +
                " - " +
                props?.company?.[`name`] ??
              companyName + " | " + props?.headersT?.homeTitle
            }
            disambiguatingDescription={
              props?.data?.[`description_${router.locale}`]
            }
            releaseDate=""
            productionDate=""
            purchaseDate=""
            award=""
            // reviews={[
            //   {
            //     author: "Jim",
            //     datePublished: "2022-01-06T03:37:40Z",
            //     reviewBody:
            //       "This is my favorite product yet! Thanks Nate for the example products and reviews.",
            //     name: "So awesome!!!",
            //     reviewRating: {
            //       bestRating: "5",
            //       ratingValue: "5",
            //       worstRating: "1",
            //     },
            //     publisher: {
            //       type: "Organization",
            //       name: "TwoVit",
            //     },
            //   },
            // ]}
            // aggregateRating={{
            //   ratingValue: "4.4",
            //   reviewCount: "89",
            // }}

            mpn=""
          />
        </>
      )}

      {props.status !== false ? (
        <MainLayout>
          <div className="no-scroll-y">
            <div className="main-page-wrapper has-particles">
              <OneAdV2Page
                globalT={props.globalT}
                id={id}
                data={props?.data}
                company={props?.company}
                categories={props?.category}
                adjValues={props?.adjactiveOneValue}
                locale={router.locale}
              />
              <Contact />
            </div>
          </div>
        </MainLayout>
      ) : (
        // <AdPageContent
        //   globalT={props.globalT}
        //   id={id}
        //   data={props?.data}
        //   company={props?.company}
        //   categories={props?.category}
        //   adjValues={props?.adjactiveOneValue}
        //   locale={router.locale}
        // />
        <Result
          status="warning"
          title="There are some problems with your operation."
          extra={
            <Link legacyBehavior href={`/`}>
              <a>
                <Button type="primary">Go Home</Button>
              </a>
            </Link>
          }
        />
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  // context.res.setHeader(
  //   'Cache-Control',
  //   'public, s-maxage=10, stale-while-revalidate=59'
  // )

  const {
    params: { id },
    locale,
  } = context;
  let props = {};

  let isRoutTitleCompatibleWithLocal;

  // get Data

  const reqUrlBySerial =
    process.env.NEXT_PUBLIC_HOST +
    process.env.NEXT_PUBLIC_GET_PRODUCT_BY_SERIAL_WITH_DES;

  const routTitle = id.split("_")[1];

  try {
    const { data: res } = await axios.post(
      reqUrlBySerial,
      {
        // id: "41fed71a-63e8-489c-ba6f-168438f8703c",
        SerialNumber: id.split("_")[0],
      },
      {
        headers: {
          lang: locale,
          websiteHostName: process.env.NEXT_PUBLIC_WEBSITE_HOST_NAME,
        },
      }
    );

    console.log("responseee");
    console.log(res);

    if (res?.status === true) {
      const title = res?.description?.result?.[`name${locale}`];

      const slug = makeURLFriendly(title);
      isRoutTitleCompatibleWithLocal = slug === routTitle;

      props = {
        status: true,
        data: res.description.result,
        adjactiveOneValue: res.description.result?.descriptions,
        productCategoriesGoogleCode:
          res?.description?.result?.productCategoriesGoogleCode ?? "",
        isRoutTitleCompatibleWithLocal: isRoutTitleCompatibleWithLocal,
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
