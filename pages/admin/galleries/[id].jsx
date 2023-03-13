import { useSession } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'
import { useRouter } from 'next/router'
import AdminLayout from '../../../layouts/admin-layout/admin-layout'
import { GalleryPageContent } from './gallery'

export default function EditGalleryPage() {
  const { data: cookies } = useSession()
  const router = useRouter()
  const { id } = router.query
  const { t } = useTranslation('common')
  return (
    <>
      <Head>
        <title>{t('new', { name: t('layout.gallery') })}</title>
      </Head>
      <AdminLayout>
        <GalleryPageContent
          t={t}
          cookies={cookies?.user}
          locale={router.locale}
          id={id}
        />
      </AdminLayout>
    </>
  )
}
