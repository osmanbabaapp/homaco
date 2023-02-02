import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Container from "../components/container";
import AboutUs from "../components/sections/about-us";
import Banner from "../components/sections/banner";
import Contact from "../components/sections/contact";
import MachineSection1 from "../components/sections/mach1-section";
import Posters from "../components/sections/posters";
import Products from "../components/sections/products";
import Services from "../components/sections/services";
import MainLayout from "../layouts/main-layout";
import PageWithLayoutType from "../layouts/page-with-layout";

import "animate.css/animate.min.css";
import axios from "axios";

const Home: NextPage = (props: any) => {
  return (
    <div>
      <Head>
        <title>Homaco Makina</title>
        <link rel="icon" href="/imgs/logo.png" />
      </Head>
      <MainLayout>
        <>
          <Banner />
          <Products products={props?.products} />
          <AboutUs />
          <MachineSection1 />
          <Services />
          <Posters />
          <Contact />
        </>
      </MainLayout>
    </div>
  );
};

// Home.layout = MainLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;

  const reqUrlHomePage =
    process.env.NEXT_PUBLIC_HOST! +
    process.env.NEXT_PUBLIC_ALL_HOME_PAGE_SETTINGS;

  let props = {};
  // get Data

  // const reqUrlParentCat = process.env.NEXT_PUBLIC_HOST + process.env.NEXT_PUBLIC_PARENT_CATEGORIES; // parent

  // const httpsAgent = new https.Agent({
  //   rejectUnauthorized: false,
  // });

  try {
    const { data: res } = await axios.get(reqUrlHomePage, {
      // httpsAgent: httpsAgent,
      headers: { websiteHostName: process.env.NEXT_PUBLIC_WEBSITE_HOST_NAME },
    });

    if (res?.status === true) {
      // if (resClients?.status === true) {
      //   clients = resClients?.description?.slice(0, 16) ?? [];
      // }
      props = {
        status: true,
        data: res?.description || null,
        banners: res?.banners || null,
        products: res?.products.slice(0, 16) || null,
        // clients: clients,
        // headersT: headersT,
      };

      // if (resCat?.status === true) {
      //   props.parentCategories = resCat.description.result;
      // }
    } else {
      props = {
        status: false,
        data: res?.description || null,
        banners: res?.banners || null,
        products: res?.products.slice(0, 12) || null,
        // clients: clients,
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
};

export default Home;
