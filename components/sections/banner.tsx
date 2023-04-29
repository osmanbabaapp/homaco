import React, { FC, useEffect, useState } from "react";
import Container from "../container";
import { motion } from "framer-motion";

const data = [
	{
		title: "Where engineering and technology meet agriculture",
		image:
			"https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
	},
	{
		title: "Where engineering and technology meet agriculture",
		image:
			"https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2129&q=80",
	},
];

const bigContainer = {
	hidden: { y: -20, scale: 0.9 },
	show: {
		y: 0,
		scale: 1,
		transition: {
			duration: 0.8,
		},
	},
};
const container = {
	hidden: { opacity: 0, y: -20 },
	show: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
		},
	},
};

const itemsAni = {
	hidden: { opacity: 0 },
	show: { opacity: 1 },
};

let curActive = 0;
const Banner: FC<{
	banners:
		| [
				{
					id: string;
					title_ar: string;
					title_tr: string;
					title_en: string;
					desc_ar: string;
					desc_tr: string;
					desc_en: string;
					website: any;
					type: "text" | "image" | "banner";
					image: string;
					active: boolean;
					file_type: "video" | "image";
				}
		  ]
		| [];
	cookies: any;
	locale: string;
}> = ({ banners, cookies, locale }) => {
	let __type = banners?.[0]?.file_type;

	let timer: any;
	const [active, setActive] = useState<number>(0);

	useEffect(() => {
		if (__type === "image" && window) {
			timer = window?.setInterval(() => {
				if (curActive + 1 === data.length) {
					curActive = 0;
					setActive(0);
				} else {
					curActive++;
					setActive((prev) => prev + 1);
				}
			}, 4000);
		}
		return () => window?.clearInterval(timer);
	}, []);

	return (
		<section className='pb-2 relative'>
			{banners?.map((item, index) => {
				if (index === active)
					return (
						<motion.div
							key={item?.id}
							variants={bigContainer}
							initial='hidden'
							animate='show'
						>
							{__type === "image" ? (
								<div
									style={{
										backgroundImage: "url('" + item.image + "')",
									}}
									className={`relative bg-no-repeat bg-contain lg:bg-cover h-[90vh] after:content-[''] after:absolute after:inset-0 after:bg-black/50 after:-z-1`}
								>
									<div className='relative h-[70vh] sm:h-[100vh] md:h-[96vh] z-[1000]'>
										<Container>
											<motion.div
												variants={container}
												initial='hidden'
												animate='show'
											>
												<h2 className='absolute z-10 text-2xl md:text-4xl right-[10vw] top-20 md:right-[8vw] md:top-[18vh] max-w-[300px] text-center font-bold text-white mb-10'>
													{item[`desc_${locale as "tr" | "ar" | "en"}`]}
												</h2>
											</motion.div>
										</Container>
									</div>
								</div>
							) : (
								<div
									style={{
										backgroundImage: "url('" + item.image + "')",
									}}
									className={`relative bg-no-repeat bg-contain lg:bg-cover h-[50vh] md:h-screen after:content-[''] after:absolute after:inset-0 after:bg-black/40 after:-z-1`}
								>
									<Container>
										<motion.div
											variants={container}
											initial='hidden'
											animate='show'
											style={{ zIndex: 1000, position: "absolute" }}
										>
											<h2 className='absolute z-10 text-2xl md:text-4xl right-[10vw] top-20 md:right-[8vw] md:top-[18vh] max-w-[300px] text-center font-bold text-white mb-10'>
												{item[`desc_${locale as "tr" | "ar" | "en"}`]}
											</h2>
										</motion.div>
									</Container>
									<video
										src={banners[0]?.image}
										controls={false}
										autoPlay
										loop
										muted
										className='h-[50vh] md:h-screen w-full object-cover'
									></video>
								</div>
							)}
						</motion.div>
					);
			})}
		</section>
	);
};

export default Banner;
