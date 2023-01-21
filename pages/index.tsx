import type { NextPage } from "next";
import Head from "next/head";
import Container from "../components/container";
import AboutUs from "../components/sections/about-us";
import Banner from "../components/sections/banner";
import Contact from "../components/sections/contact";
import Products from "../components/sections/products";
import Services from "../components/sections/services";
import MainLayout from "../layouts/main-layout";
import PageWithLayoutType from "../layouts/page-with-layout";

const Home: PageWithLayoutType = () => {
  return (
    <div>
      <Head>
        <title>Home Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner />
      <AboutUs />
      <Products />
      <Services />
      <Contact />
    </div>
  );
};

Home.layout = MainLayout;

export default Home;
