import React, { FC, ReactNode, useContext, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
// components
import Container from '../../components/container'
import NavSwitch from '../../components/nav-switch'
import { MobileNavContext } from '../../context/mobile-nav-context'
import MobileNavbar from './mobile-navbar'
import { FaFacebook, FaInstagram, FaLanguage, FaWhatsapp } from 'react-icons/fa'
import { MdLanguage } from 'react-icons/md'

const LinkItem: FC<{
  href: string
  text: string
}> = (props) => {
  return (
    <Link
      href={props.href}
      className="text-lg md:text-2xl hover:text-primYellowHover"
    >
      {props.text}
    </Link>
  )
}

const Navbar: FC<{ data: any }> = ({ data }) => {
  const { open, toggleNavbar } = useContext(MobileNavContext)
  const [menuActive, setMenuActive] = useState(false)

  console.log('layout data')
  console.log(data)

  let menuClasses = menuActive ? '' : 'hidden'
  return (
    <nav className="drop-shadow-sm w-[100%]  relative z-50 text-primYellow">
      <Container>
        <header className="flex justify-between items-center">
          <div>
            <Image
              alt="Homaco Logo"
              src={'/imgs/logo.png'}
              width={240}
              height={80}
              className={'w-[180px] md:w-[380px]'}
            />
          </div>

          <div className="flex gap-5 items-center">
            <div className="hidden sm:flex space-x-10 items-center">
              <ul className="flex gap-5">
                <li>
                  <LinkItem href="/" text="الرئيسية" />
                </li>
                <li>
                  <LinkItem href="#about-us" text="من نحن" />
                </li>
                <li>
                  <LinkItem href="#products" text="منتجاتنا" />
                </li>
                <li>
                  <LinkItem href="/#contact" text="اتصل بنا" />
                </li>
              </ul>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <div>
                  <a
                    href="#"
                    onClick={() => setMenuActive(!menuActive)}
                    className="flex justify-center text-white items-center w-8 h-8 rounded-full bg-primYellow hover:bg-primYellowHover"
                  >
                    <MdLanguage />
                  </a>
                </div>
                <div
                  className={
                    'absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ' +
                    menuClasses
                  }
                  tabIndex={-1}
                >
                  <div className="py-1" role="none">
                    <a
                      href="#"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-0"
                    >
                      العربية
                    </a>
                    <a
                      href="#"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-1"
                    >
                      Türkçe
                    </a>
                  </div>
                </div>
              </div>
              {data?.facebook && data?.facebook !== 'undefined' && (
                <a
                  href={data?.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center text-white items-center w-8 h-8 rounded-full bg-primYellow hover:bg-primYellowHover"
                >
                  <FaFacebook />
                </a>
              )}
              {data?.whatsapp && data?.whatsapp !== 'undefined' && (
                <a
                  href={'https://wa.me/9' + data?.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center text-white items-center w-8 h-8 rounded-full bg-primYellow hover:bg-primYellowHover"
                >
                  <FaWhatsapp />
                </a>
              )}
              {data?.instagram && data?.instagram !== 'undefined' && (
                <a
                  href={data?.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center text-white items-center w-8 h-8 rounded-full bg-primYellow hover:bg-primYellowHover"
                >
                  <FaInstagram />
                </a>
              )}
              <a
                href="https://new-osb.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex overflow-hidden justify-center text-white items-center w-8 h-8 rounded-full bg-primYellow hover:bg-primYellowHover"
              >
                <img src="/oslogo.png" alt="osmanbaba" />
              </a>
            </div>
            <div className="block sm:hidden">
              <NavSwitch open={open} toggleNavbar={toggleNavbar} />
            </div>
          </div>
        </header>
      </Container>
    </nav>
  )
}

export default Navbar
