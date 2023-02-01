import type { NextPage } from "next";
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

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Homaco Makina</title>
        <link rel="icon" href="/imgs/logo.png" />
      </Head>
      <MainLayout>
        <>
          <Banner />
          <Products />
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

export default Home;
