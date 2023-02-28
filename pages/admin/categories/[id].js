import CategoryPageContent from '../../../components/views/categories/category'
import Head from 'next/head'
import { useRouter } from 'next/router'
import AdminLayout from '../../../layouts/admin-layout/admin-layout'
import { useSession } from 'next-auth/react'

function EditAdPage(props) {
  const router = useRouter()
  const { id } = router.query
  const { data } = useSession()
  return (
    <>
      <Head>
        <title>Edit Category</title>
      </Head>
      <AdminLayout>
        <CategoryPageContent id={id} cookies={data?.user} />
      </AdminLayout>
    </>
  )
}

export default EditAdPage

EditAdPage.layout = 'dashboard'
