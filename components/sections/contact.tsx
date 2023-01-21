"use client";

import { FC } from "react";
import Container from "../container";
import Button from "../elements/Button";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Contact: FC<{}> = () => {
  return (
    <div className="py-10 bg-slate-800 text-white">
      <Container>
        <h2 className="text-4xl font-bold">Contact Us</h2>
        <p>Our friendly team would love to hear from you!</p>
        <div className="grid grid-cols-3 gap-4 mt-10">
          <div className="order-1 sm:order-1 col-span-3 md:col-span-1">
            <div className="w-full">
              <iframe
                width="100%"
                height="400"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Address+(Homaco%20Company)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              ></iframe>
            </div>
          </div>
          <div className="order-3 sm:order-2 col-span-3 md:col-span-1 text-center flex justify-center flex-col">
            {/* <h4 className="text-2xl text-center mb-10">You can also</h4>
            <div className="w-full grid grid-cols-4 gap-5">
              <div className="col-span-2 md:col-span-2  p-2 rounded-md transition-colors border-[1px] duration-150 cursor-pointer hover:bg-white">
                <a
                  href="https://www.google.com/maps/place/osmanbaba+%D8%B9%D8%AB%D9%85%D8%A7%D9%86+%D8%A8%D8%A7%D8%A8%D8%A7%E2%80%AD/@37.1552581,38.8163964,15z/data=!4m5!3m4!1s0x0:0xd8dd756907c64a7e!8m2!3d37.1552581!4d38.8163964"
                  target={"_blank"}
                  rel="noopener noreferrer"
                >
                  <div>
                    <span className="w-8 h-8 rounded-md bg-red-600 flex justify-center items-center text-white">
                      <BiMapAlt />
                    </span>
                  </div>
                  <h4>Visit Us</h4>
                </a>
              </div>
              <div className="col-span-2 md:col-span-2 p-2 rounded-md transition-colors border-[1px] duration-150 cursor-pointer hover:bg-white">
                <a href="tel:123-456-7890">
                  <div>
                    <span className="w-8 h-8 rounded-md bg-red-600 flex justify-center items-center text-white">
                      <BiPhoneCall />
                    </span>
                  </div>
                  <h4>Call Us</h4>
                </a>
              </div>
            </div> */}
            <h2 className="text-2xl font-bold text-red-600">Homaco Company</h2>
            <p>Some description if you want</p>
            <ul className="flex flex-row gap-3 justify-center my-2">
              <li>
                <a href="#">
                  <span className="flex justify-center items-center w-8 h-8 rounded-full text-white bg-red-600 hover:text-white hover:bg-red-700">
                    <FaFacebook />
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="flex justify-center items-center w-8 h-8 rounded-full text-white bg-red-600 hover:text-white hover:bg-red-700">
                    <FaTwitter />
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="flex justify-center items-center w-8 h-8 rounded-full text-white bg-red-600 hover:text-white hover:bg-red-700">
                    <FaInstagram />
                  </span>
                </a>
              </li>
            </ul>
            <a href="mailto:example@test.com">example@test.com</a>
            <a href="mailto:example@test.com">+905440000000</a>
            <hr className="my-5" />
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
            </div>
          </div>
          <div className="order-2 sm:order-3 col-span-3 md:col-span-1">
            <form>
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-1">
                  <div className="mb-6">
                    <label
                      htmlFor="firstName"
                      className="block mb-2 text-sm font-medium text-white "
                    >
                      First Name
                    </label>
                    <input
                      type="firstName"
                      id="firstName"
                      className="bg-gray-50 border border-slate-500 text-gray-900 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-1.5 "
                      placeholder="John"
                      required
                    />
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="mb-6">
                    <label
                      htmlFor="lastName"
                      className="block mb-2 text-sm font-medium text-white "
                    >
                      Last Name
                    </label>
                    <input
                      type="lastName"
                      id="lastName"
                      className="bg-gray-50 border border-slate-500 text-gray-900 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-1.5 "
                      placeholder="John"
                      required
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-white "
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="bg-gray-50 border border-slate-500 text-gray-900 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-1.5 "
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-white "
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="bg-gray-50 border border-slate-500 text-gray-900 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-1.5 "
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                </div>
              </div>
              <Button className="w-full border-none text-lg" type="fill">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
