import { FC } from "react";
import Container from "../container";
import { motion } from "framer-motion";

const MachineSection1: FC<{}> = () => {
  return (
    <div className="py-28 flex bg-white bg-[url('/imgs/mach-1.png')] bg-no-repeat bg-contain">
      <Container>
        <motion.div
          style={{ position: "relative" }}
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
          <div className="md:w-[40%] sm:w-[70%] w-[80%] bg-white drop-shadow-lg p-5">
            <p className="text-xl">
              لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت
              دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا .
              يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو
              لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات . ديواس أيوتي
              أريري دولار إن ريبريهينديرأيت فوليوبتاتي فيلايت أيسسي كايلليوم
              دولار أيو فيجايت نيولا باراياتيور. أيكسسيبتيور ساينت أوككايكات
              كيوبايداتات نون بروايدينت ,سيونت ان كيولبا كيو أوفيسيا
              ديسيريونتموليت انيم أيدي ايست بروايدينت ,سيونت ان كيولبا كيو
              أوفيسيا ديسيريونتموليت انيم أيدي ايست بروايدينت ,سيونت ان كيولبا
              كيو أوفيسيا ديسيريونتموليت انيم أيدي ايست بروايدينت ,سيونت ان
              كيولبا كيو أوفيسيا ديسيريونتموليت انيم أيدي ايست لابوريوم
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default MachineSection1;
