import Image from "next/image";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "../container";

const data = [
  "/imgs/poster.jpeg",
  "/imgs/poster.jpeg",
  "/imgs/poster.jpeg",
  "/imgs/poster.jpeg",
];

const Posters: FC<{}> = () => {
  return (
    <div className="py-10">
      <Container>
        <div>
          <Swiper spaceBetween={30} className="py-10 px-5" slidesPerView="auto">
            {data.map((item, index) => (
              <SwiperSlide className="w-[250px]" key={index}>
                <Image src={item} alt="Poster" width={250} height={250} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </div>
  );
};
export default Posters;
