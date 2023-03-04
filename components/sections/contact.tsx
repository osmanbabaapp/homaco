'use client'

import { FC, useContext } from 'react'
import Container from '../container'
import Button from '../elements/Button'
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { LayoutContext } from '@/context/layout.context'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

const Contact: FC<{}> = () => {
  const { settings } = useContext(LayoutContext)
  const router = useRouter()
  const { t } = useTranslation('common')

  return (
    <>
      <div className="py-10  text-white" id="contact">
        <Container>
          <h2 className="text-2xl text-center mb-5">
            {t('sections.partners.title')}
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 items-center justify-center gap-2 my-10">
            {settings?.clients?.length > 0 &&
              settings?.clients?.map((item: any) => (
                <motion.div
                  key={item?.id}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      delay: 0,
                      duration: 0.8,
                    },
                  }}
                  initial={{
                    scale: 0.7,
                    opacity: 0,
                  }}
                >
                  <div className="transition duration-[.8s]  hover:scale-[1.2]">
                    <Image
                      src={item?.image}
                      alt={item?.[`name_${router.locale}`]}
                      width={100}
                      height={100}
                    />
                  </div>
                </motion.div>
              ))}
          </div>
          <div className="grid grid-cols-3 gap-4 mt-20">
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
                  src={settings?.logo || '/imgs/logo.png'}
                  className="m-auto"
                  width={300}
                  height={80}
                />
              </h2>
              <ul className="flex flex-row gap-3 justify-center my-2">
                {settings?.osmanbaba && settings?.osmanbaba !== 'undefined' && (
                  <a
                    href={settings?.osmanbaba}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex overflow-hidden justify-center text-white items-center w-10 h-10 rounded-full bg-primYellow hover:bg-primYellowHover"
                  >
                    <img src="/oslogo.png" alt="osmanbaba" />
                  </a>
                )}

                {settings?.facebook && settings?.facebook !== 'undefined' && (
                  <li>
                    <a
                      href={settings?.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="flex justify-center items-center text-xl w-10 h-10 rounded-full text-white bg-primYellow hover:text-white hover:bg-primYellowHover">
                        <FaFacebook />
                      </span>
                    </a>
                  </li>
                )}
                {settings?.whatsapp && settings?.whatsapp !== 'undefined' && (
                  <li>
                    <a
                      href={'https://wa.me/9' + settings?.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="flex justify-center items-center text-xl w-10 h-10 rounded-full text-white bg-primYellow hover:text-white hover:bg-primYellowHover">
                        <FaWhatsapp />
                      </span>
                    </a>
                  </li>
                )}
                {settings?.instagram && settings?.instagram !== 'undefined' && (
                  <li>
                    <a
                      href={settings?.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="flex justify-center items-center text-xl w-10 h-10 rounded-full text-white bg-primYellow hover:text-white hover:bg-primYellowHover">
                        <FaInstagram />
                      </span>
                    </a>
                  </li>
                )}
              </ul>
              <ul className="w-fit m-auto" dir="ltr">
                {settings?.phones && settings.phones?.[0] !== 'undefined' && (
                  <li className="font-sans text-start before:content-[''] before:inline-block before:w-3 before:h-3 before:rounded-full w-full relative before:absolute before:-left-5 before:top-2 before:bg-yellow-400 before:text-md">
                    <a href={'tel:' + settings.phones?.[0]} className="text-md">
                      {settings.phones?.[0]}
                    </a>
                  </li>
                )}
                {settings?.email && (
                  <li className="font-sans text-start before:content-[''] before:inline-block before:w-3 before:h-3 before:rounded-full w-full relative before:absolute before:-left-5 before:top-2 before:bg-yellow-400 before:text-md">
                    <a href={'mailto:' + settings.email} className="text-md">
                      {settings.email}
                    </a>
                  </li>
                )}
                {settings?.address && settings.address !== 'undefined' && (
                  <li className="font-sans text-start before:content-[''] before:inline-block before:w-3 before:h-3 before:rounded-full w-full relative before:absolute before:-left-5 before:top-2 before:bg-yellow-400 before:text-md">
                    <a href="#" className="text-md">
                      {settings?.address}
                    </a>
                  </li>
                )}
              </ul>
            </div>
            <div className="order-2 xs:order-3 col-span-3 md:col-span-1">
              <form>
                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-1">
                    <motion.div
                      style={{ position: 'relative' }}
                      whileInView={{
                        opacity: 1,
                        top: 0,
                        transition: {
                          delay: 0,
                          duration: 0.8,
                        },
                      }}
                      initial={{
                        top: -10,
                        opacity: 0,
                      }}
                    >
                      <div className="mb-6">
                        <input
                          type="firstName"
                          id="firstName"
                          className="bg-gray-50 border border-slate-500 text-gray-900 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-1.5 "
                          placeholder={t('name')}
                          required
                        />
                      </div>
                    </motion.div>
                  </div>
                  <div className="col-span-1">
                    <motion.div
                      style={{ position: 'relative' }}
                      whileInView={{
                        opacity: 1,
                        top: 0,
                        transition: {
                          delay: 0.4,
                          duration: 0.8,
                        },
                      }}
                      initial={{
                        top: -10,
                        opacity: 0,
                      }}
                    >
                      <div className="mb-6">
                        <input
                          type="lastName"
                          id="lastName"
                          className="bg-gray-50 border border-slate-500 text-gray-900 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-1.5 "
                          placeholder={t('country')}
                          required
                        />
                      </div>
                    </motion.div>
                  </div>
                  <div className="col-span-2">
                    <motion.div
                      style={{ position: 'relative' }}
                      whileInView={{
                        opacity: 1,
                        top: 0,
                        transition: {
                          delay: 0.8,
                          duration: 0.8,
                        },
                      }}
                      initial={{
                        top: -10,
                        opacity: 0,
                      }}
                    >
                      <div className="mb-6">
                        <input
                          type="email"
                          id="email"
                          className="bg-gray-50 border border-slate-500 text-gray-900 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-1.5 "
                          placeholder={t('email')}
                          required
                        />
                      </div>
                    </motion.div>
                  </div>
                  <div className="col-span-2">
                    <motion.div
                      style={{ position: 'relative' }}
                      whileInView={{
                        opacity: 1,
                        top: 0,
                        transition: {
                          delay: 1.2,
                          duration: 0.8,
                        },
                      }}
                      initial={{
                        top: -10,
                        opacity: 0,
                      }}
                    >
                      <div className="mb-6">
                        <textarea
                          id="message"
                          className="bg-gray-50 border border-slate-500 text-gray-900 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-1.5 "
                          placeholder={t('message')}
                          required
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
                <motion.div
                  style={{ position: 'relative' }}
                  whileInView={{
                    opacity: 1,
                    top: 0,
                    transition: {
                      delay: 1.6,
                      duration: 0.8,
                    },
                  }}
                  initial={{
                    top: -10,
                    opacity: 0,
                  }}
                >
                  <Button
                    className="w-[100px] block m-auto border-none text-md"
                    color="secondary"
                    type="fill"
                  >
                    {t('send')}
                  </Button>
                </motion.div>
              </form>
            </div>
          </div>
        </Container>
      </div>
      <div className="py-2 text-center bg-white">
        <h6>
          Made by{' '}
          <a
            href="https://osmanbaba.net"
            target={'_blank'}
            rel="noopener noreferrer"
          >
            Osmanbaba
          </a>
        </h6>
      </div>
    </>
  )
}

export default Contact

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
