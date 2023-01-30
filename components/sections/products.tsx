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
    image: "/imgs/prod2.png",
    title: "خلاط بودرة",
    description:
      "خلاط مخروطي يقوم بتعبئة السوائل الكيميائية السائلة منها و اللزجة وايضا بعض من نصوص تجربة نص طويل",
  },
  {
    id: 1,
    image: "/imgs/prod3.png",
    title: "آلة طحن السمسم ميني",
    description:
      "خلاط مخروطي يقوم بتعبئة السوائل الكيميائية السائلة منها و اللزجة وايضا بعض من نصوص تجربة نص طويل",
  },
  {
    id: 2,
    image: "/imgs/prod.png",
    title: "آلة تعبئة السوائل",
    description:
      "خلاط مخروطي يقوم بتعبئة السوائل الكيميائية السائلة منها و اللزجة وايضا بعض من نصوص تجربة نص طويل",
  },
];

const ProductItem: FC<{
  id?: number;
  image: string;
  title: string;
  description?: string;
}> = (props) => {
  return (
    <div className="group  drop-shadow-lg p-3 m-auto w-[300px] relative overflow-hidden">
      <div className="absolute transition-all opacity-0 bg-black/60 flex flex-col p-10 text-center justify-center items-center left-0 w-full h-full group-hover:opacity-100">
        <p className="absolute text-lg -left-[50%] top-[40%] w-[90%] text-white opacity-0 transition-all delay-200 group-hover:opacity-100 group-hover:left-[50%] -translate-x-1/2">
          {props.description}
        </p>
        <Button
          type="fill"
          color="primary"
          className="absolute -left-[100%] top-[65%] border-red-600 opacity-0 delay-[350] group-hover:opacity-100 group-hover:left-[50%] -translate-x-1/2"
        >
          التفاصيل <HiArrowNarrowRight style={{ display: "inline" }} />
        </Button>
      </div>
      <Image
        src={props.image}
        alt={props.title}
        width={250}
        height={150}
        className="object-cover h-[300px]"
      />
      <h3 className="font-bold text-xl">{props.title}</h3>
      <p className="font-bold text-md line-clamp-2">{props.description}</p>
    </div>
  );
};

const Products: FC<{}> = () => {
  return (
    <div className="py-10 bg-white" id="products">
      <Container>
        <Image
          alt="Homaco Logo"
          src={"/imgs/logo.png"}
          className="m-auto"
          width={260}
          height={80}
        />
        {/* <h2 className="font-bold text-4xl mb-10">Products</h2> */}
        <p className="font-bold text-2xl text-center w-[80%] m-auto">
          شركة هوماكو للصناعات الهندسية وخطوط الانتاج نقوم بتصنيع الآت طحن
          السمسم و انتاج الطحينة والآت التعبئة الكيميائية والطبية وخطوط انتاج
          المارشميلو
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <div key={item.id}>
              <ProductItem {...item} />
            </div>
          ))}
          {/* <Swiper spaceBetween={20} className="py-10 px-5" slidesPerView="auto">
            {data.map((item) => (
              <SwiperSlide className="w-[300px]" key={item.id}>
                <ProductItem {...item} />
              </SwiperSlide>
            ))}
          </Swiper> */}
        </div>
      </Container>
    </div>
  );
};

export default Products;
