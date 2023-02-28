import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Container from '../components/container'
import AboutUs from '../components/sections/about-us'
import Banner from '../components/sections/banner'
import Contact from '../components/sections/contact'
import MachineSection1 from '../components/sections/mach1-section'
import Posters from '../components/sections/posters'
import Products from '../components/sections/products'
import Services from '../components/sections/services'
import MainLayout from '../layouts/main-layout'
import PageWithLayoutType from '../layouts/page-with-layout'

import 'animate.css/animate.min.css'
import axios from 'axios'
import Founders from '@/components/sections/founders'
import { useSession } from 'next-auth/react'
import { gql, GraphQLClient } from 'graphql-request'

const Home: NextPage = (props: any) => {
  const { data } = useSession()
  console.log('Session Data', data)
  console.log('props')
  console.log(props)

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
          <Founders />
          <Contact />
        </>
      </MainLayout>
    </div>
  )
}

// Home.layout = MainLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context

  const HomeQuery = gql`
    {
      products {
        id
        title_${locale}
        desc_${locale}
        primary_image
        slug_${locale}
      }
      banners {
        id
      }
    }
  `

  const graphQLClient = new GraphQLClient('http://localhost:8080/graphql')
  const data = await graphQLClient.request(HomeQuery)

  return {
    props: { ...data },
  }
}

export default Home
