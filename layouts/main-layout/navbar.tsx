import React, { FC, ReactNode } from "react";
import Image from "next/image";
import Container from "../../components/container";
import Link from "next/link";
import Button from "../../components/elements/Button";

const LinkItem: FC<{
  href: string;
  text: string;
}> = (props) => {
  return (
    <Link href={props.href} className="hover:text-red-500">
      {props.text}
    </Link>
  );
};

const Navbar = () => {
  return (
    <nav className="border-b-2 drop-shadow-sm">
      <Container>
        <header className="flex justify-between ">
          <div>
            <Image
              alt="Srio Logo"
              src={"/imgs/logo.jpeg"}
              width={80}
              height={80}
            />
          </div>
          <div className="flex space-x-10 items-center">
            <ul className="flex space-x-5">
              <li>
                <LinkItem href="/" text="Home" />
              </li>
              <li>
                <LinkItem href="/" text="Products" />
              </li>
              <li>
                <LinkItem href="/" text="About Us" />
              </li>
              <li>
                <LinkItem href="/" text="Contact" />
              </li>
            </ul>
            <Button color="primary">Hello</Button>
          </div>
        </header>
      </Container>
    </nav>
  );
};

export default Navbar;
