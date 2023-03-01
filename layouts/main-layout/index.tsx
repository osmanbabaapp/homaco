import { useContext } from 'react'
import { MobileNavContext } from '../../context/mobile-nav-context'
import type { LayoutProps } from '../page-with-layout'
import Footer from './footer'
import MobileNavbar from './mobile-navbar'
import Navbar from './navbar'

const MainLayout: LayoutProps = (props) => {
  const { open, toggleNavbar } = useContext(MobileNavContext)

  console.log('open :>> ', open)
  return (
    <div>
      <Navbar />
      <main style={{ marginTop: -102 }}>{props.children}</main>

      {open && <MobileNavbar open={open} toggleNavbar={toggleNavbar} />}

      {/* <Footer /> */}
    </div>
  )
}

export default MainLayout
