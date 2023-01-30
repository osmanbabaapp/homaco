"use client";

import { FC } from "react";
import Container from "../container";
import Button from "../elements/Button";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

const Contact: FC<{}> = () => {
  return (
    <>
      <div className="py-10 bg-slate-800 text-white">
        <Container>
          <div className="grid grid-cols-3 gap-4 mt-10">
            <div className="order-3 xs:order-1 col-span-3 md:col-span-1">
              <div className="relative w-full h-[250px] rounded-lg">
                <div className="w-[100px] h-[100px] bg-primYellow absolute -top-[8px] -left-[8px] z-10"></div>
                <div className="w-[100px] h-[100px] bg-primYellow absolute -bottom-[8px] -right-[8px] z-10"></div>
                <iframe
                  className="absolute w-full h-full left-0 top-0 z-20"
                  width="100%"
                  height="250"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Address+(Homaco%20Company)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                ></iframe>
              </div>
            </div>
            <div className="order-1 xs:order-2 col-span-3 md:col-span-1 text-center">
              <h2 className="text-2xl font-bold text-yellow-400">
                <Image
                  alt="Homaco Logo"
                  src={"/imgs/logo.png"}
                  className="m-auto"
                  width={240}
                  height={80}
                />
              </h2>
              <ul className="flex flex-row gap-3 justify-center my-2">
                <a
                  href="#"
                  className="flex overflow-hidden justify-center text-white items-center w-8 h-8 rounded-full bg-primYellow hover:bg-primYellowHover"
                >
                  <img src="oslogo.png" alt="osmanbaba" />
                </a>
                <li>
                  <a href="#">
                    <span className="flex justify-center items-center w-8 h-8 rounded-full text-white bg-yellow-500 hover:text-white hover:bg-yellow-600">
                      <FaFacebook />
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="flex justify-center items-center w-8 h-8 rounded-full text-white bg-yellow-500 hover:text-white hover:bg-yellow-600">
                      <FaWhatsapp />
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="flex justify-center items-center w-8 h-8 rounded-full text-white bg-yellow-500 hover:text-white hover:bg-yellow-600">
                      <FaInstagram />
                    </span>
                  </a>
                </li>
              </ul>
              <ul className="w-fit m-auto" dir="ltr">
                <li className="text-start before:content-[''] before:inline-block before:w-3 before:h-3 before:rounded-full w-full relative before:absolute before:-left-5 before:top-2 before:bg-yellow-400 before:text-lg">
                  <a href="mailto:example@test.com" className="text-lg">
                    Phone: +905440000000
                  </a>
                </li>
                <li className="text-start before:content-[''] before:inline-block before:w-3 before:h-3 before:rounded-full w-full relative before:absolute before:-left-5 before:top-2 before:bg-yellow-400 before:text-lg">
                  <a href="mailto:example@test.com" className="text-lg">
                    Email: example@test.com
                  </a>
                </li>
                <li className="text-start before:content-[''] before:inline-block before:w-3 before:h-3 before:rounded-full w-full relative before:absolute before:-left-5 before:top-2 before:bg-yellow-400 before:text-lg">
                  <a href="mailto:example@test.com" className="text-lg">
                    Address will be here
                  </a>
                </li>
              </ul>
            </div>
            <div className="order-2 xs:order-3 col-span-3 md:col-span-1">
              <form>
                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-1">
                    <div className="mb-6">
                      <input
                        type="firstName"
                        id="firstName"
                        className="bg-gray-50 border border-slate-500 text-gray-900 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-1.5 "
                        placeholder="الاسم"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <div className="mb-6">
                      <input
                        type="lastName"
                        id="lastName"
                        className="bg-gray-50 border border-slate-500 text-gray-900 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-1.5 "
                        placeholder="الدولة"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="mb-6">
                      <input
                        type="email"
                        id="email"
                        className="bg-gray-50 border border-slate-500 text-gray-900 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-1.5 "
                        placeholder="البريد الالكتروني"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="mb-6">
                      <textarea
                        id="message"
                        className="bg-gray-50 border border-slate-500 text-gray-900 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-1.5 "
                        placeholder="الرسالة"
                        required
                      />
                    </div>
                  </div>
                </div>
                <Button
                  className="w-[100px] block m-auto border-none text-md"
                  color="secondary"
                  type="fill"
                >
                  إرسال
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </div>
      <div className="py-2 text-center">
        <h6>
          Made by{" "}
          <a
            href="https://osmanbaba.net"
            target={"_blank"}
            rel="noopener noreferrer"
          >
            Osmanbaba
          </a>
        </h6>
      </div>
    </>
  );
};

export default Contact;

{
  /* <hr className="my-5" />
            <div className="text-center">
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
            </div> */
}
