import { useContext, useEffect, useLayoutEffect } from 'react'
import { MobileNavContext } from '../../context/mobile-nav-context'
import type { LayoutProps } from '../page-with-layout'
import Footer from './footer'
import MobileNavbar from './mobile-navbar'
import Navbar from './navbar'
import useFetch from '../../hooks/useFetch'
import { LayoutContext } from '../../context/layout.context'
import { gql, useQuery } from '@apollo/client'

const GET_LAYOUT_DATA = gql`
  query ($website: String!) {
    clients(website: $website) {
      id
      image
      name_ar
      name_en
      name_tr
    }
  }
`

const MainLayout: LayoutProps = (props) => {
  const { open, toggleNavbar } = useContext(MobileNavContext)
  const { setSettings } = useContext(LayoutContext)
  const {
    data: qData,
    loading: qLoading,
    error: qError,
  } = useQuery(GET_LAYOUT_DATA, {
    variables: { website: process.env.NEXT_PUBLIC_WEBSITE },
  })

  const { data, loading, error, executeFetch }: any = useFetch(
    'api/settings',
    'GET',
    {},
    false
  )

  useEffect(() => {
    setSettings({ ...data?.description?.data, ...qData })
  }, [data, qData])

  useEffect(() => {
    executeFetch()
  }, [])

  // useLayoutEffect(() => {}, [])

  return (
    <div>
      <Navbar data={data?.description?.data} />
      <main style={{ marginTop: -102 }}>{props.children}</main>

      {open && <MobileNavbar open={open} toggleNavbar={toggleNavbar} />}

      {/* <Footer /> */}
    </div>
  )
}

export default MainLayout
