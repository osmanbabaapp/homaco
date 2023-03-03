import { useContext, useEffect, useLayoutEffect } from 'react'
import { MobileNavContext } from '../../context/mobile-nav-context'
import type { LayoutProps } from '../page-with-layout'
import MobileNavbar from './mobile-navbar'
import Navbar from './navbar'
import useFetch from '../../hooks/useFetch'
import { LayoutContext } from '../../context/layout.context'
import { gql, useQuery } from '@apollo/client'
import { RiWhatsappFill } from 'react-icons/ri'
import { motion } from 'framer-motion'

const GET_LAYOUT_DATA = gql`
  query ($website: String!) {
    clients(website: $website) {
      id
      image
      name_ar
      name_en
      name_tr
    }
    settings(website: $website) {
      banner_type
      facebook
      instagram
      twitter
      whatsapp
      phones
      logo
      address
      email
      osmanbaba
    }
  }
`

export const scaleMotionVars = {
  hidden: { opacity: 0, scale: 0.6 },
  show: {
    opacity: 1,
    scale: 1,
  },
}

const MainLayout: LayoutProps = (props) => {
  const { open, toggleNavbar } = useContext(MobileNavContext)
  const { setSettings, settings } = useContext(LayoutContext)
  const {
    data: qData,
    loading: qLoading,
    error: qError,
  } = useQuery(GET_LAYOUT_DATA, {
    variables: { website: process.env.NEXT_PUBLIC_WEBSITE },
  })

  useEffect(() => {
    setSettings({ ...qData?.settings, clients: qData?.clients })
  }, [qData])

  // useLayoutEffect(() => {}, [])

  return (
    <div>
      <Navbar data={settings} />
      <main style={{ marginTop: -102 }}>{props.children}</main>

      {open && <MobileNavbar open={open} toggleNavbar={toggleNavbar} />}

      {settings?.whatsapp && settings.whatsapp !== 'undefined' && (
        <motion.div
          variants={scaleMotionVars}
          initial="hidden"
          animate="show"
          style={{
            position: 'fixed',
            zIndex: 1000,
          }}
        >
          <a href={'https://wa.me/9' + settings?.whatsapp}>
            <div className="flex items-center justify-center w-[70px] h-[70px] text-white text-3xl shadow-lg fixed bottom-10 right-10 rounded-full bg-green-600">
              <RiWhatsappFill />
            </div>
          </a>
        </motion.div>
      )}

      {/* <Footer /> */}
    </div>
  )
}

export default MainLayout
