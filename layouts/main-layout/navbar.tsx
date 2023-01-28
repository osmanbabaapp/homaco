import React, { FC, ReactNode, useContext } from "react";
import Image from "next/image";
import Container from "../../components/container";
import Link from "next/link";
import Button from "../../components/elements/Button";
import NavSwitch from "../../components/nav-switch";
import { MobileNavContext } from "../../context/mobile-nav-context";
import MobileNavbar from "./mobile-navbar";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const LinkItem: FC<{
  href: string;
  text: string;
}> = (props) => {
  return (
    <Link href={props.href} className="text-2xl hover:text-primYellowHover">
      {props.text}
    </Link>
  );
};

const Navbar = () => {
  const { open, toggleNavbar } = useContext(MobileNavContext);

  return (
    <nav className="border-b-[1px] drop-shadow-sm fixed w-full z-50 text-primYellow">
      <Container>
        <header className="flex justify-between items-center flex-row-reverse">
          <div>
            <Image
              alt="Srio Logo"
              src={"/imgs/logo.jpeg"}
              width={80}
              height={80}
            />
          </div>
          <div className="flex gap-5">
            <div className="flex gap-2">
              <a
                href="#"
                className="flex overflow-hidden justify-center text-white items-center w-8 h-8 rounded-full bg-primYellow hover:bg-primYellowHover"
              >
                <img src="oslogo.png" alt="osmanbaba" />
              </a>
              <a
                href="#"
                className="flex justify-center text-white items-center w-8 h-8 rounded-full bg-primYellow hover:bg-primYellowHover"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="flex justify-center text-white items-center w-8 h-8 rounded-full bg-primYellow hover:bg-primYellowHover"
              >
                <FaWhatsapp />
              </a>
              <a
                href="#"
                className="flex justify-center text-white items-center w-8 h-8 rounded-full bg-primYellow hover:bg-primYellowHover"
              >
                <FaInstagram />
              </a>
            </div>
            <div className="hidden sm:flex space-x-10 items-center">
              <ul className="flex gap-5 flex-row-reverse">
                <li>
                  <LinkItem href="/" text="الرئيسية" />
                </li>
                <li>
                  <LinkItem href="/" text="من نحن" />
                </li>
                <li>
                  <LinkItem href="/" text="منتجاتنا" />
                </li>
                <li>
                  <LinkItem href="/" text="اتصل بنا" />
                </li>
              </ul>
            </div>
          </div>
          <div className="block sm:hidden">
            <NavSwitch open={open} toggleNavbar={toggleNavbar} />
          </div>
        </header>
      </Container>
    </nav>
  );
};

export default Navbar;
