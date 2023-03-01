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

import Founders from '@/components/sections/founders'
import { useSession } from 'next-auth/react'
import { gql, GraphQLClient } from 'graphql-request'
import { useRouter } from 'next/router'

const Home: NextPage = (props: any) => {
  const { data } = useSession()
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>Homaco Makina</title>
        <link rel="icon" href="/imgs/logo.png" />
      </Head>
      <MainLayout>
        <>
          <Banner
            locale={router.locale!}
            banners={props?.banners || []}
            cookies={data}
          />
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
  const website: string = process.env.NEXT_PUBLIC_WEBSITE!
  if (!website)
    return {
      props: {},
    }
  const HomeQuery = gql`
    query($website: String!){
      products(website: $website) {
        id
        title_${locale}
        desc_${locale}
        primary_image
        slug_${locale}
      }
      banners(website: $website) {
        id
        image
        file_type
        title_${locale}
        desc_${locale}
        type
      }
    }
  `

  const url = process.env.NEXT_PUBLIC_HOST + 'graphql'

  const graphQLClient = new GraphQLClient(url)
  const data = await graphQLClient.request(HomeQuery, {
    website: website,
  })

  return {
    props: { ...data },
  }
}

export default Home
