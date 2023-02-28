import CategoryPageContent from '../../../components/views/categories/category'
import Head from 'next/head'
import AdminLayout from '../../../layouts/admin-layout/admin-layout'
import { useSession } from 'next-auth/react'

export default function CategoryPage() {
  const { data } = useSession()
  return (
    <>
      <Head>
        <title>Category</title>
      </Head>
      <AdminLayout>
        <CategoryPageContent cookies={data?.user} />
      </AdminLayout>
    </>
  )
}
