import Link from "next/link";
import { FC } from "react";
import Container from "../../components/container";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Image from "next/image";

const Footer: FC<{}> = () => {
  return (
    <footer className="pt-20 pb-5 bg-slate-800 text-white">
      <Container>
        <div className="grid grid-cols-3">
          <div className="grid-col-3 md:grid-col-1">
            <h2 className="text-2xl font-bold text-red-600">
              <Image
                alt="Homaco Logo"
                src={"/imgs/logo.png"}
                width={240}
                height={80}
              />
            </h2>
            <p>Some description if you want</p>
          </div>
          <div className="grid-col-3 md:grid-col-1">
            <h5 className="mb-3 text-xl">Links</h5>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/">Products</Link>
              </li>
              <li>
                <Link href="/">About Us</Link>
              </li>
              <li>
                <Link href="/">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="grid-col-3 md:grid-col-1">
            <ul className="flex flex-row gap-3">
              <li>
                <a href="#">
                  <span className="flex justify-center items-center w-8 h-8 rounded-full bg-red-600 hover:text-white hover:bg-red-700">
                    <FaFacebook />
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="flex justify-center items-center w-8 h-8 rounded-full bg-red-600 hover:text-white hover:bg-red-700">
                    <FaTwitter />
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="flex justify-center items-center w-8 h-8 rounded-full bg-red-600 hover:text-white hover:bg-red-700">
                    <FaInstagram />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="py-2 text-center">
          <h6>
            {"\u00A9\uFE0F"} {new Date().getFullYear()} Made by{" "}
            <a
              href="https://osmanbaba.net"
              className="text-red-600"
              target={"_blank"}
              rel=""
            >
              Osmanbaba
            </a>
          </h6>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
