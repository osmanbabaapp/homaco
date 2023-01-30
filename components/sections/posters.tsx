import Image from "next/image";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "../container";
import { motion } from "framer-motion";

const data = [
  "/imgs/poster.jpeg",
  "/imgs/poster.jpeg",
  "/imgs/poster.jpeg",
  "/imgs/poster.jpeg",
];

const Posters: FC<{}> = () => {
  return (
    <div className="py-10 bg-white">
      <Container>
        <div>
          <Swiper spaceBetween={30} className="py-10 px-5" slidesPerView="auto">
            {data.map((item, index) => (
              <SwiperSlide className="w-[250px]" key={index}>
                <motion.div
                  style={{ position: "relative" }}
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
                  <Image src={item} alt="Poster" width={250} height={250} />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </div>
  );
};
export default Posters;
