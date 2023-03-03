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
import { Dropdown, Menu } from 'antd'
import { useRouter } from 'next/router'

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
  const router = useRouter()

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link href={router.asPath} locale={'tr'}>
          Türkçe
        </Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link href={router.asPath} locale={'ar'}>
          العربية
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link href={router.asPath} locale={'en'}>
          English
        </Link>
      </Menu.Item>
    </Menu>
  )

  return (
    <nav className="drop-shadow-sm w-[100%]  relative z-50 text-primYellow">
      <Container>
        <header className="flex justify-between items-center">
          <div>
            <Link href={'/'}>
              <Image
                alt="Homaco Logo"
                src={data?.logo || '/imgs/logo.png'}
                width={240}
                height={80}
                className={'w-[180px] md:w-[380px]'}
              />
            </Link>
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
              <Dropdown
                overlay={menu}
                placement="bottomRight"
                trigger={['click']}
              >
                <a
                  href="#"
                  className="flex justify-center text-white items-center w-8 h-8 rounded-full bg-primYellow hover:bg-primYellowHover"
                >
                  <MdLanguage />
                </a>
              </Dropdown>

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
              {data?.osmanbaba && data?.osmanbaba !== 'undefined' && (
                <a
                  href={data?.osmanbaba}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex overflow-hidden justify-center text-white items-center w-8 h-8 rounded-full bg-primYellow hover:bg-primYellowHover"
                >
                  <img src="/oslogo.png" alt="osmanbaba" />
                </a>
              )}
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
