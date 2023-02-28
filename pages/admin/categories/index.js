import CategoriesPageContent from '../../../components/views/categories'
import Head from 'next/head'
import { useRouter } from 'next/router'
import AdminLayout from '../../../layouts/admin-layout/admin-layout'
import { useSession } from 'next-auth/react'

export default function CategoriesPage() {
  const router = useRouter()
  const { data } = useSession()

  return (
    <>
      <Head>
        <title>Categories</title>
      </Head>
      <AdminLayout>
        <CategoriesPageContent locale={router.locale} cookies={data?.user} />
      </AdminLayout>
    </>
  )
}

// CategoriesPage.layout = "dashboard";
