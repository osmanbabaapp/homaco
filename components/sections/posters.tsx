import Image from 'next/image'
import { FC, useCallback, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Container from '../container'
import { motion } from 'framer-motion'
import { MdClose } from 'react-icons/md'

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

const Posters: FC<{ data: any }> = ({ data }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [video, setVideo] = useState<string | null>(null)

  // toggle modal
  const toggleModal = useCallback((open: boolean, video: string | null) => {
    setOpen(!open)
    setVideo(video)
  }, [])

  return (
    <div className="py-10 bg-white">
      <Container>
        <div>
          <Swiper spaceBetween={30} className="py-10 px-5" slidesPerView="auto">
            {data?.length > 0 &&
              data.map((item: any, index: number) => (
                <SwiperSlide className="w-[250px]" key={index}>
                  <motion.div
                    style={{ position: 'relative', cursor: 'pointer' }}
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
                      onClick={() => toggleModal(open, item?.video)}
                      src={item?.image}
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
      {open && video && (
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
                toggleModal(open, null)
              }}
            >
              <MdClose />
            </a>
            <video
              src={video}
              autoPlay={true}
              controls
              style={{ maxHeight: '80vh' }}
            ></video>
          </div>
        </motion.div>
      )}
    </div>
  )
}
export default Posters
