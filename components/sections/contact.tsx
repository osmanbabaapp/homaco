import { FC } from "react";
import Container from "../container";
import Button from "../elements/Button";
import { BiMapAlt, BiPhoneCall } from "react-icons/bi";

const Contact: FC<{}> = () => {
  return (
    <div className="py-10">
      <Container>
        <h2 className="text-4xl font-bold">Contact Us</h2>
        <p>Our friendly team would love to hear from you!</p>
        <div className="grid grid-cols-2 gap-4 mt-10">
          <div className="col-span-2 md:col-span-1 border-t-[1px] pt-10">
            <form>
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-1">
                  <div className="mb-6">
                    <label
                      htmlFor="firstName"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      First Name
                    </label>
                    <input
                      type="firstName"
                      id="firstName"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder="John"
                      required
                    />
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="mb-6">
                    <label
                      htmlFor="lastName"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Last Name
                    </label>
                    <input
                      type="lastName"
                      id="lastName"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder="John"
                      required
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                </div>
              </div>
              <Button className="w-full text-xl" type="fill">
                Submit
              </Button>
            </form>
          </div>
          <div className="col-span-2 md:col-span-1 flex justify-center flex-col">
            <h4 className="text-2xl text-center mb-10">You can also</h4>
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
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
