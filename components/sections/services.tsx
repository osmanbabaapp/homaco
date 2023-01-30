import { FC } from "react";
import Container from "../container";
import { TbBuildingFactory } from "react-icons/tb";
import Image from "next/image";
import { motion } from "framer-motion";

// const Services: FC<{}> = () => {
//   return (
//     <div className="py-10">
//       <Container>
//         <div className="grid grid-cols-2 gap-2">
//           <div className="col-span-2 md:col-span-1">
//             <div className="flex items-center p-5 transition-all space-x-3 hover:bg-white hover:drop-shadow-2xl">
//               <div className="icon">
//                 <span className="w-16 h-16 text-white bg-red-600 rounded-full flex justify-center items-center">
//                   <TbBuildingFactory />
//                 </span>
//               </div>
//               <div>
//                 <h4>Website Design</h4>
//                 <p>75 projects</p>
//               </div>
//             </div>
//             <div className="flex items-center p-5 transition-all space-x-3 hover:bg-white hover:drop-shadow-2xl">
//               <div className="icon">
//                 <span className="w-16 h-16 text-white bg-yellow-600 rounded-full flex justify-center items-center">
//                   <TbBuildingFactory />
//                 </span>
//               </div>
//               <div>
//                 <h4>Website Design</h4>
//                 <p>75 projects</p>
//               </div>
//             </div>
//             <div className="flex items-center p-5 transition-all space-x-3 hover:bg-white hover:drop-shadow-2xl">
//               <div className="icon">
//                 <span className="w-16 h-16 text-white bg-green-600 rounded-full flex justify-center items-center">
//                   <TbBuildingFactory />
//                 </span>
//               </div>
//               <div>
//                 <h4>Website Design</h4>
//                 <p>75 projects</p>
//               </div>
//             </div>
//           </div>
//           <div className="col-span-2 md:col-span-1">
//             <h2 className="font-bold text-2xl mb-5">Our Services</h2>
//             <p className="mb-2 text-slate-700">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
//               consectetur quam id cursus faucibus. Aliquam vulputate eros nec
//               vulputate mollis. Aliquam rhoncus.
//             </p>
//             <p className="mb-2 text-slate-700">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
//               consectetur quam id cursus faucibus. Aliquam vulputate eros nec
//               vulputate mollis. Aliquam rhoncus.
//             </p>
//             <div className="flex justify-around space-x-2 mt-5">
//               <div className="p-1">
//                 <h5 className="text-4xl font-bold">285+</h5>
//                 <p>Project Completed</p>
//               </div>
//               <div className="p-1">
//                 <h5 className="text-4xl font-bold">285+</h5>
//                 <p>Project Completed</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// };
const Services: FC<{}> = () => {
  return (
    <div className="relative py-10 group text-white h-[500px] md:h-[500px] lg:h-[600px]">
      <motion.div
        className="absolute bottom-0 left-0 w-full max-h-[500px]"
        whileInView={{
          opacity: 1,
          transition: {
            delay: 0.2,
            duration: 0.8,
          },
        }}
        initial={{
          opacity: 0,
        }}
      >
        <img
          src="/imgs/bg-mach-2.png"
          className="grayscale group-hover:grayscale-0 transition-all duration-300"
          alt="homaco machine"
        />
      </motion.div>
      <Container>
        <div className="grid grid-cols-4">
          <motion.div
            style={{ position: "relative" }}
            whileInView={{
              opacity: 1,
              top: 0,
              transition: {
                delay: 0,
                duration: 0.8,
              },
            }}
            initial={{
              top: -50,
              opacity: 0,
            }}
          >
            <h2 className="col-span-4 md:col-span-1 text-3xl">
              <Image
                alt="Homaco Logo"
                src={"/imgs/logo.png"}
                width={240}
                height={80}
              />
            </h2>
          </motion.div>
          <div className="col-span-4 md:col-span-3">
            <motion.div
              style={{ position: "relative", width: "100%" }}
              whileInView={{
                opacity: 1,
                top: 0,
                transition: {
                  delay: 0.4,
                  duration: 0.8,
                },
              }}
              initial={{
                top: -50,
                opacity: 0,
              }}
            >
              <p className="text-2xl">
                يتم من خلال الآلة الطحن السمسم وانتاج الطحينة هذه الالة مصنوعة
                من معدن الستانلس ستيل ٣٠٤ بالكامل وتعمل بنظام اتوماتيكي يتم طحن
                السمسم علي مرحلتين وتحوي الالة روؤس تنعيم السمسم المطحون
              </p>
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Services;
