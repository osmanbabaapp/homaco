import BannerPageContent from '../../../components/views/banners/banner'
import Head from 'next/head'
import AdminLayout from '../../../layouts/admin-layout/admin-layout'
import { useSession } from 'next-auth/react'

export default function BannerPage() {
  const { data: cookies, status } = useSession()

  return (
    <>
      <Head>
        <title>Banner</title>
      </Head>
      <AdminLayout>
        <BannerPageContent cookies={cookies} status={status} />
      </AdminLayout>
    </>
  )
}

BannerPage.layout = 'dashboard'
