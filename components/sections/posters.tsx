import Image from 'next/image'
import { FC, useCallback, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Container from '../container'
import { motion } from 'framer-motion'
import { MdClose } from 'react-icons/md'

const data = [
  '/imgs/poster.jpeg',
  '/imgs/poster.jpeg',
  '/imgs/poster.jpeg',
  '/imgs/poster.jpeg',
]

const modalVariants = {
  show: {
    opacity: 1,
    top: 0,
    transition: {
      duration: 0.4,
    },
  },
  hidden: {
    opacity: 0,
    top: -40,
  },
}

const Posters: FC<{}> = () => {
  const [open, setOpen] = useState<boolean>(false)

  // toggle modal
  const toggleModal = useCallback((open: boolean) => {
    console.log('toggle modal !')
    console.log(open)
    setOpen(!open)
  }, [])
  return (
    <div className="py-10 bg-white">
      <Container>
        <div>
          <Swiper spaceBetween={30} className="py-10 px-5" slidesPerView="auto">
            {data.map((item, index) => (
              <SwiperSlide className="w-[250px]" key={index}>
                <motion.div
                  style={{ position: 'relative' }}
                  whileInView={{
                    opacity: 1,
                    top: 0,
                    transition: {
                      delay: 0.2 * index,
                      duration: 0.8,
                    },
                  }}
                  initial={{
                    top: -50,
                    opacity: 0,
                  }}
                >
                  <Image
                    onClick={() => toggleModal(open)}
                    src={item}
                    alt="Poster"
                    width={250}
                    height={250}
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
      {open && (
        <motion.div
          initial="hidden"
          animate="show"
          variants={modalVariants}
          className="bg-black/75 flex flex-col fixed inset-0 z-30 justify-center items-center w-full h-full"
        >
          <div className="relative max-w-6xl">
            <a
              href="#"
              className="text-4xl text-white absolute right-2 md:-right-8 -top-8"
              onClick={(e) => {
                e.preventDefault()
                toggleModal(open)
              }}
            >
              <MdClose />
            </a>
            <video src="/video.mp4" autoPlay={true} controls></video>
          </div>
        </motion.div>
      )}
    </div>
  )
}
export default Posters
