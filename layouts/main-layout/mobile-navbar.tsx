import Link from "next/link";
import { FC } from "react";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { MNavbType } from "../../context/mobile-nav-context";

const animate = {
	hidden: { y: -20 },
	show: {
		y: 0,
		transition: {
			duration: 1,
		},
	},
};

const MobileNavbar: FC<MNavbType> = ({ open, toggleNavbar }) => {
	return (
		<div className='fixed z-[1000] inset-0 bg-black/90 text-white flex justify-center items-center'>
			<a
				href='#'
				onClick={(e) => {
					e.preventDefault();
					toggleNavbar(e);
				}}
				className='text-5xl fixed z-40 left-[10px] top-[20px]'
			>
				<AiOutlineClose />
			</a>
			<motion.div variants={animate} initial='show' animate='hidden'>
				<ul className='flex flex-col gap-4'>
					<li>
						<motion.div
							initial={{ x: -20, opacity: 0 }}
							animate={{ x: 0, opacity: 1, transition: { duration: 0.2 } }}
						>
							<Link className='text-5xl' href='/' onClick={toggleNavbar}>
								الرئيسية
							</Link>
						</motion.div>
					</li>
					<li>
						<motion.div
							initial={{ x: -20, opacity: 0 }}
							animate={{
								x: 0,
								opacity: 1,
								transition: { delay: 0.2, duration: 0.2 },
							}}
						>
							<Link
								className='text-5xl'
								href='#about-us'
								onClick={toggleNavbar}
							>
								من نحن
							</Link>
						</motion.div>
					</li>
					<li>
						<motion.div
							initial={{ x: -20, opacity: 0 }}
							animate={{
								x: 0,
								opacity: 1,
								transition: { delay: 0.4, duration: 0.2 },
							}}
						>
							<Link
								className='text-5xl'
								href='#products'
								onClick={toggleNavbar}
							>
								منتجاتنا
							</Link>
						</motion.div>
					</li>
					<li>
						<motion.div
							initial={{ x: -20, opacity: 0 }}
							animate={{
								x: 0,
								opacity: 1,
								transition: { delay: 0.6, duration: 0.2 },
							}}
						>
							<Link className='text-5xl' href='#contact' onClick={toggleNavbar}>
								اتصل بنا
							</Link>
						</motion.div>
					</li>
				</ul>
			</motion.div>
		</div>
	);
};

export default MobileNavbar;
