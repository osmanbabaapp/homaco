import Image from "next/image";
import { useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "../container";
import { motion } from "framer-motion";
import { MdClose, MdPlayArrow } from "react-icons/md";

type Props = {
	data: any;
};

const modalVariants = {
	show: {
		opacity: 1,
		top: 0,
		transition: {
			duration: 0.4,
		},
	},
	hidden: {
		opacity: 0,
		top: -40,
	},
};

export default function posters({ data }: Props) {
	const [open, setOpen] = useState<boolean>(false);
	const [video, setVideo] = useState<string | null>(null);

	// toggle modal
	const toggleModal = useCallback((open: boolean, video: string | null) => {
		setOpen(!open);
		setVideo(video);
	}, []);

	return (
		<div className='py-10 bg-white bg-white-background'>
			<Container>
				<div>
					<Swiper spaceBetween={30} className='py-10 px-5' slidesPerView='auto'>
						{data?.length > 0 &&
							data.map((item: any, index: number) => (
								<SwiperSlide className='w-[250px]' key={index}>
									<motion.div
										style={{ position: "relative", cursor: "pointer" }}
										whileInView={{
											opacity: 1,
											top: 0,
											transition: {
												delay: 0.2 * index,
												duration: 0.8,
											},
										}}
										initial={{
											top: -50,
											opacity: 0,
										}}
									>
										<div className='relative'>
											{item?.video && (
												<span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-primYellow rounded-full flex items-center justify-center text-4xl animate-pulse'>
													<MdPlayArrow />
												</span>
											)}
											<div className='w-full p-2 absolute bottom-0 left-0 line-clamp-1 bg-primYellowHover/60 font-bold'>
												{item?.title}
											</div>
											<Image
												onClick={() => toggleModal(open, item?.video)}
												src={item?.image}
												alt='Poster'
												width={250}
												height={100}
												className={"h-[300px] object-cover"}
											/>
										</div>
									</motion.div>
								</SwiperSlide>
							))}
					</Swiper>
				</div>
			</Container>
			{open && video && (
				<motion.div
					initial='hidden'
					animate='show'
					variants={modalVariants}
					className='bg-black/75 flex flex-col fixed inset-0 z-30 justify-center items-center w-full h-full'
				>
					<div className='relative max-w-6xl'>
						<a
							href='#'
							className='text-4xl text-white absolute right-2 md:-right-8 -top-8'
							onClick={(e) => {
								e.preventDefault();
								toggleModal(open, null);
							}}
						>
							<MdClose />
						</a>
						<video
							src={video}
							autoPlay={true}
							controls
							style={{ maxHeight: "80vh" }}
						></video>
					</div>
				</motion.div>
			)}
		</div>
	);
}
