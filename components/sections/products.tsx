import Image from "next/image";
import { FC, useContext } from "react";
import Container from "../container";
import Button from "../elements/Button";
import { HiArrowNarrowRight } from "react-icons/hi";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { LayoutContext } from "@/context/layout.context";
import useTranslation from "next-translate/useTranslation";

const ProductItem: FC<any> = (props) => {
	return (
		<Link href={`/product/${props.slug}`}>
			<div className='group  drop-shadow-lg  m-auto w-[260px] relative overflow-hidden'>
				<div className='absolute transition-all opacity-0 bg-black/60 flex flex-col p-10 text-center justify-center items-center left-0 w-full h-full group-hover:opacity-100'>
					<p className='absolute text-lg -left-[50%] top-[40%] w-[90%] text-white opacity-0 transition-all delay-200 group-hover:opacity-100 group-hover:left-[50%] -translate-x-1/2'>
						{props[`description_${props.locale}`]}
					</p>
					<Button
						type='fill'
						color='primary'
						className='absolute -left-[100%] top-[65%] border-red-600 opacity-0 delay-[350] group-hover:opacity-100 group-hover:left-[50%] -translate-x-1/2'
					>
						التفاصيل <HiArrowNarrowRight style={{ display: "inline" }} />
					</Button>
				</div>
				<Image
					src={props.primary_image}
					alt={props[`title_${props?.locale}`]}
					width={250}
					height={150}
					className='object-cover h-[300px] w-full'
				/>
				<h3 className='font-bold text-xl my-2 self-center px-[50px] text-red-600 text-center line-clamp-2'>
					{props[`title_${props?.locale}`]}
				</h3>
				<p className='font-bold text-md line-clamp-2'>
					{props[`desc_${props?.locale}`]}
				</p>
			</div>
		</Link>
	);
};

const Products: FC<{ products: any }> = ({ products }) => {
	const { settings } = useContext(LayoutContext);

	const locale = useRouter().locale;
	const { t } = useTranslation("common");

	return (
		<div className='py-10 bg-white' id='products'>
			<Container>
				<Image
					alt='Homaco Logo'
					src={settings?.logo || "/imgs/logo.png"}
					className='m-auto w-[180px] md:w-[380px]'
					width={280}
					height={80}
				/>
				<p className='font-bold text-2xl text-center w-[80%] m-auto md:mt-[4vh]'>
					{t("sections.products.title")}
				</p>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 md:my-[4vh]'>
					{products?.map((item: any, index: number) => {
						return (
							<motion.div
								style={{ position: "relative" }}
								whileInView={{
									opacity: 1,
									msTransition: "linear",
									top: 0,
									transition: {
										duration: 0.8,
										delay: 0.2 * index,
									},
								}}
								initial={{ opacity: 0, top: -100 }}
								key={item.id}
							>
								<ProductItem
									{...item}
									slug={item?.[`slug_${locale}`]}
									locale={locale}
								/>
							</motion.div>
						);
					})}
				</div>
			</Container>
		</div>
	);
};

export default Products;
