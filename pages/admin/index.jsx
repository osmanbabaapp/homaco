import Head from 'next/head'
import { LayoutContext } from '../../context/layout.context'
import { useContext } from 'react'
import HomePageContent from '../../components/views/home-page/index'
import { useRouter } from 'next/router'
import AdminLayout from '../../layouts/admin-layout/admin-layout'
// import https from "https";
// import axios from "axios";

export default function Home(props) {
  const { sideOpen } = useContext(LayoutContext)
  const router = useRouter()
  // const { id } = router.query;

  const locale = router.locale
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
  )
}
