import { FC } from "react";
import Container from "../container";
import { TbBuildingFactory } from "react-icons/tb";

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
    <div className="relative py-10 bg-slate-900 text-white before:content-[''] before:absolute before:top-0 hover:before:grayscale-0 before:transition-all before:duration-300 before:left-0 before:w-full before:h-full before:grayscale before:bg-[url('/imgs/bg-mach-2.png')] before:bg-no-repeat before:bg-contain h-[600px] before:bg-left-bottom">
      <Container>
        <div className="grid grid-cols-2">
          <h2 className="col-span-3 md:col-span-1 text-3xl">Logo</h2>
          <p className="col-span-3 md:col-span-1 text-2xl">
            يتم من خلال الآلة الطحن السمسم وانتاج الطحينة هذه الالة مصنوعة من
            معدن الستانلس ستيل ٣٠٤ بالكامل وتعمل بنظام اتوماتيكي يتم طحن السمسم
            علي مرحلتين وتحوي الالة روؤس تنعيم السمسم المطحون
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Services;
