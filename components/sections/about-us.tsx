import { FC, useContext } from "react";
import Container from "../container";
import Image from "next/image";
import { motion } from "framer-motion";
import { LayoutContext } from "@/context/layout.context";
import useTranslation from "next-translate/useTranslation";

const AboutUs: FC = () => {
	const { settings } = useContext(LayoutContext);
	const { t } = useTranslation("common");
	return (
		<div
			className="py-28 flex text-white bg-[url('/imgs/bg-section-about.png')] bg-no-repeat bg-contain"
			style={{ direction: "rtl" }}
			id='about-us'
		>
			<Container>
				<div className='md:w-[50%] sm:w-[70%] w-[80%] mt-[30vh] mr-[3vh] sm:mt-[0vh] sm:mr-[0vh]'>
					<motion.div
						style={{ position: "relative" }}
						whileInView={{
							opacity: 1,
							right: 0,
							transition: {
								delay: 0,
								duration: 0.8,
							},
						}}
						initial={{
							opacity: 0,
							right: -100,
						}}
					>
						<Image
							alt='Homaco Logo'
							src={settings?.logo || "/imgs/logo.png"}
							width={240}
							height={80}
							className={"w-[180px] md:w-[380px] mb-6"}
						/>
					</motion.div>

					<motion.div
						style={{ position: "relative" }}
						whileInView={{
							opacity: 1,
							right: 0,
							transition: {
								delay: 0.4,
								duration: 0.8,
							},
						}}
						initial={{
							opacity: 0,
							right: -100,
						}}
					>
						<p className='text-xl'>{t("sections.about.line1")}</p>
						<p className='text-xl'>{t("sections.about.line2")}</p>
						<p className='text-xl'>{t("sections.about.line3")}</p>
					</motion.div>
				</div>
			</Container>
		</div>
	);
};

export default AboutUs;
