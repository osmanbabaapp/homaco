import { FC } from "react";
import Container from "../container";
import Button from "../elements/Button";
import { FaShippingFast } from "react-icons/fa";
import Shape from "../shape";
import Image from "next/image";

// const AboutUs: FC = () => {
//   return (
//     <Container>
//       <div className="py-10 relative">
//         <Shape className="absolute right-0 top-0" />
//         <div className="grid grid-cols-2">
//           <div className="col-span-2 md:col-span-1">
//             <h2 className="font-bold text-5xl max-w-[70%] mb-2">
//               <span className="text-red-600">300</span> Machines Every Year
//             </h2>
//             <p className="text-slate-500 text-lg">More than 37 countries</p>
//             <div className="space-x-2 py-5">
//               <Button className="text-sm shadow-xl md:text-xl">
//                 Become a client
//               </Button>
//               <Button className="text-sm shadow-xl md:text-xl">
//                 Become a client
//               </Button>
//             </div>
//           </div>
//           <div className="col-span-2 md:col-span-1">
//             <h3 className="text-xl font-bold mb-10">
//               <span className="mr-2 text-red-600">
//                 <FaShippingFast style={{ display: "inline" }} />
//               </span>{" "}
//               Sales
//             </h3>
//             <div className="mb-5">
//               <h5 className="text-red-600 font-bold text-lg">
//                 25% home market
//               </h5>
//               <ul className="list-disc">
//                 <li>Turkey and Germany</li>
//               </ul>
//             </div>
//             <div className="mb-5">
//               <h5 className="text-red-600 font-bold text-lg">75% export</h5>
//               <ul className="list-disc">
//                 <li>37% neighboring countries</li>
//                 <li>19% China - Russia</li>
//                 <li>15% Central and Eastern Europe</li>
//                 <li>5% other countries</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// };
const AboutUs: FC = () => {
  return (
    <div
      className="py-28 flex text-white bg-[url('/imgs/bg-section-about.png')] bg-no-repeat bg-contain"
      id="about-us"
    >
      <Container>
        <div className="md:w-[50%] sm:w-[70%] w-[80%]">
          <Image
            alt="Homaco Logo"
            src={"/imgs/logo.png"}
            width={240}
            height={80}
          />
          <p className="text-xl">اسم تثقون به</p>
          <p className="text-xl">صناعات هندسية وخطوط الإنتاج</p>
          <p className="text-xl">
            تصاميم فريدة، احترافية عالية، بايدي الخبراء نعتمد اعلى معايير الدقة
            والحرفية في التصميم خيرات متوارثة في التصميم والصناعة لأكثر من ٣٠
            عاماٍ سماكة الطحينة السائلة دليل خبرتنا ونجاحنا اجود انواع الستانلس
            ستيل
          </p>
        </div>
      </Container>
    </div>
  );
};

export default AboutUs;
