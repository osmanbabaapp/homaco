import { FC } from "react";
import Container from "../container";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

const MachineSection1: FC<{}> = () => {
  const router = useRouter();
  const { t } = useTranslation("common");

  return (
    <div
      className="py-28 flex bg-white bg-white-background relative"
      style={{ direction: "rtl" }}
    >
      <Container>
        <h2 className="absolute z-10 text-2xl md:text-4xl right-[10vw] top-[4vh] font-bold text-red-600 flex-wrap w-[26%] text-center self-center mb-12">
          {t("sections.susam.line3")}
        </h2>
        <motion.div
          style={{ position: "relative" }}
          className="ml-[30vw] mt-[100px] "
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
          <div className="md:w-[40%] min-w-[50%] sm:w-[70%] w-[100%] bg-white drop-shadow-lg p-5 mt-[30vh] sm:mt-[0vh]  ">
            {/* <div className="block"> */}
            <p className="text-xl">{t("sections.susam.line1")}</p>
            <p className="text-xl">{t("sections.susam.line2")}</p>

            {/* </div> */}
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default MachineSection1;
