import Head from "next/head";
import { LayoutContext } from "../../../context/layout.context";
import { useContext } from "react";
import HomePageContent from "../../../components/views/home-page/index";
import { useRouter } from "next/router";
import AdminLayout from "../../../layouts/admin-layout/admin-layout";
// import https from "https";
// import axios from "axios";

export default function Home(props) {
  const { sideOpen } = useContext(LayoutContext);
  const router = useRouter();
  // const { id } = router.query;

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

// export async function getServerSideProps(context) {
//   const { locale } = context;
//   let props = {};
//   // get Data

//   const httpsAgent = new https.Agent({
//     rejectUnauthorized: false,
//   });

//   try {
//     const { data: res } = await axios.get(
//       process.env.NEXT_PUBLIC_HOST + process.env.NEXT_PUBLIC_ALL_HOME_PAGE_SETTINGS,
//       { httpsAgent: httpsAgent, headers: { websiteHostName: process.env.NEXT_PUBLIC_WEBSITE_HOST_NAME } } // for development only
//     );

//     if (res?.status === true) {
//       props = {
//         status: true,
//         data: res?.description,
//         products: res?.products,
//       };
//     } else {
//       props = {
//         status: false,
//         data: res?.description,
//         products: res?.products,
//         failCode: 400,
//       };
//     }
//   } catch (e) {
//     console.error("Error");
//     console.error(e.toString());
//     if (e?.response?.status === 400) {
//       props = {
//         failCode: 400,
//         status: false,
//         description: "Something went wrong! Please try again later.",
//       };
//     }
//   }

//   return {
//     props: props,
//   };
// }
