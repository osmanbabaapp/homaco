import { FC } from "react";
import Container from "../container";
import { motion } from "framer-motion";

const MachineSection1: FC<{}> = () => {
  return (
    <div className="py-28 flex bg-white bg-[url('/imgs/mach-1.png')] bg-no-repeat bg-contain relative">
      <Container>
        <h2 className="absolute z-10 text-2xl md:text-4xl   left-[20vw] top-[4vh] font-bold text-black flex-wrap w-[200px] ">
          آلة طحن السمسم وانتاج الطحينة
        </h2>
        <motion.div
          style={{ position: "relative" }}
          className="ml-[30vw] "
          whileInView={{
            opacity: 1,
            scale: 1,
            transition: {
              delay: 0,
              duration: 0.8,
            },
          }}
          initial={{
            opacity: 0,
            scale: 0.5,
          }}
        >
          <div className="md:w-[40%] min-w-[50%] sm:w-[70%] w-[80%] bg-white drop-shadow-lg p-5 ">
            {/* <div className="block"> */}
            <section className="text-xl">لطحن السمسم و إنتاج أفضل أنواع الطحينية ,</section>

            <section className="text-xl">
              <section className="text-red-600 inline-block"> الستانلس </section>
              تم تصميم هذه الآلة التي تعد من أهم الآلات التي قمنا بصناعتها , حيث استخدمنا في صناعتها أجود أنواع
            </section>

            <p className="text-xl">
              ستيل 304L بتحكم آلي بالكامل .. تمتاز هذه الآلة بطاقتها الإنتاجية العالية لاحتوائها على أحدث أنواع أنظمة
            </p>

            <p className="text-xl">
              التحكم الالكتروني PLC برؤوس تنعيم للسمسم المطحون للحصول على أجود أنواع الطحينة باللزوجة المثالية
            </p>
            {/* </div> */}
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default MachineSection1;
