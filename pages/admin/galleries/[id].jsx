import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import AdminLayout from '../../../layouts/admin-layout/admin-layout'
import { GalleryPageContent } from './gallery'

export default function EditPartnerPage() {
  const { data: cookies } = useSession()
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Head>
        <title>Edit Partner</title>
      </Head>
      <AdminLayout>
        <GalleryPageContent
          id={id}
          locale={router.locale}
          cookies={cookies?.user}
        />
      </AdminLayout>
    </>
  )
}
