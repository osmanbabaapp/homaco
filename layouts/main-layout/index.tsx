import { useContext, useEffect } from 'react'
import { MobileNavContext } from '../../context/mobile-nav-context'
import type { LayoutProps } from '../page-with-layout'
import Footer from './footer'
import MobileNavbar from './mobile-navbar'
import Navbar from './navbar'
import useFetch from '../../hooks/useFetch'
import { LayoutContext } from '../../context/layout.context'

const MainLayout: LayoutProps = (props) => {
  const { open, toggleNavbar } = useContext(MobileNavContext)
  const { setSettings } = useContext(LayoutContext)

  const { data, loading, error, executeFetch }: any = useFetch(
    'api/settings',
    'GET',
    {},
    false
  )

  useEffect(() => {
    setSettings(data?.description?.data)
  }, [data])

  useEffect(() => {
    executeFetch()
  }, [])

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
