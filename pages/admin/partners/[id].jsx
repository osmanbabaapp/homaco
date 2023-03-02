import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import AdminLayout from '../../../layouts/admin-layout/admin-layout'
import { PartnerPageContent } from './partner'

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
        <PartnerPageContent
          id={id}
          locale={router.locale}
          cookies={cookies?.user}
        />
      </AdminLayout>
    </>
  )
}
