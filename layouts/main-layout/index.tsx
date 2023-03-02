import { useContext } from 'react'
import { MobileNavContext } from '../../context/mobile-nav-context'
import type { LayoutProps } from '../page-with-layout'
import Footer from './footer'
import MobileNavbar from './mobile-navbar'
import Navbar from './navbar'
import useFetch from '../../hooks/useFetch'

const MainLayout: LayoutProps = (props) => {
  const { open, toggleNavbar } = useContext(MobileNavContext)

  const { data }: { data: any } = useFetch('api/settings', 'GET', {}, true)

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
