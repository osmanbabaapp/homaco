import Image from "next/image";
import { FC } from "react";
import Container from "../container";
import Button from "../elements/Button";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";

const data = [
  {
    id: 0,
    image:
      "https://images.unsplash.com/photo-1624880403473-4244deee045a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    title: "Machine For Industry",
    description: "Some description about this machine etc ...",
  },
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1624880403473-4244deee045a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    title: "Machine For Industry",
    description: "Some description about this machine etc ...",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1606337321936-02d1b1a4d5ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    title: "Machine For Industry",
    description: "Some description about this machine etc ...",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1611117775350-ac3950990985?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    title: "Machine For Industry",
    description: "Some description about this machine etc ...",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1611117775350-ac3950990985?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    title: "Machine For Industry",
    description: "Some description about this machine etc ...",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1611117775350-ac3950990985?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    title: "Machine For Industry",
    description: "Some description about this machine etc ...",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1611117775350-ac3950990985?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    title: "Machine For Industry",
    description: "Some description about this machine etc ...",
  },
];

const ProductItem: FC<{
  id?: number;
  image: string;
  title: string;
  description?: string;
}> = (props) => {
  return (
    <div className="group  bg-white drop-shadow-lg p-3 w-[250px] relative overflow-hidden">
      <div className="absolute transition-all opacity-0 -top-[100%] bg-black/60 flex flex-col p-10 text-center justify-center items-center left-0 w-full h-full group-hover:opacity-100 group-hover:top-0">
        <p className="text-white opacity-0 transition delay-200 group-hover:opacity-100">
          {props.description}
        </p>
        <Button
          type="fill"
          color="primary"
          className="border-red-600 opacity-0 transition delay-200 group-hover:opacity-100"
        >
          Show Details <HiArrowNarrowRight style={{ display: "inline" }} />
        </Button>
      </div>
      <h3 className="font-bold">{props.title}</h3>
      <Image
        src={props.image}
        alt={props.title}
        width={250}
        height={150}
        className="object-cover h-[250px]"
      />
    </div>
  );
};

const Products: FC<{}> = () => {
  return (
    <div className="py-10">
      <Container>
        <h2 className="font-bold text-4xl mb-10">Products</h2>
        <div>
          <Swiper spaceBetween={20} className="py-10 px-5" slidesPerView="auto">
            {data.map((item) => (
              <SwiperSlide className="w-[250px]" key={item.id}>
                <ProductItem {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </div>
  );
};

export default Products;
