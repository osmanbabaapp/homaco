import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { FC } from "react";
import Container from "../container";

const data: any = {
	tr: [
		{
			name: "Abdulwahid gap alhasan",
			role: "Genel Müdür",
			phone: "+90 534 872 80 00",
			plink: "00905348728000",
		},
		{
			name: "Muhammed Ahmet Fellaha",
			role: "Teknik Direktör",
			phone: "+90 538 548 86 66",
			plink: "00905385488666", //
		},
	],
	en: [
		{
			name: "Abdulwahid gap alhasan",
			role: "General Director",
			phone: "+90 534 872 80 00",
			plink: "00905348728000",
		},
		{
			name: "Muhammed Ahmet Fellaha",
			role: "Technical Director",
			phone: "+90 534 872 80 00",
			plink: "00905385488666",
		},
	],
	ar: [
		{
			name: "عبد الواحد غاب الحسن",
			role: "المدير العام",
			phone: "+90 534 872 80 00",
			plink: "00905348728000",
		},
		{
			name: "محمد أحمد فلاحة",
			role: "المدير الفني",
			phone: "+90 534 872 80 00",
			plink: "00905385488666",
		},
	],
};

const FounderItem: FC<{ item: any }> = ({ item }) => {
	return (
		<div className='w-[300px] relative group overflow-hidden'>
			<div className='absolute text-center top-[calc(100%_-_100px)] md:top-full transition-all left-0 w-full p-2 border-[1px] border-primYellowHover bg-primYellowHover/30 backdrop-blur-sm md:group-hover:top-[calc(100%_-_100px)]'>
				<h2 className='font-bold text-2xl'>{item?.name}</h2>
				<p>{item?.role}</p>
				<a
					className='block ltr'
					style={{ direction: "ltr" }}
					href={`tel:${item?.phone}`}
				>
					{item.phone}
				</a>
			</div>
			<Image
				src={
					item?.image ||
					"https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
				}
				alt={"founder"}
				className={"w-full"}
				width={300}
				height={100}
			/>
		</div>
	);
};
const Founders: FC<{ data: any }> = ({ data }) => {
	const { t } = useTranslation("common");

	return (
		<div className='py-24 text-white'>
			<Container>
				<h2 className='text-center text-4xl mb-5'>
					{t("sections.founders.title")}
				</h2>
				<div className='grid grid-cols-1 sm:grid-cols-2'>
					{data?.length > 0 &&
						data?.map((item: any, index: number) => (
							<div key={index} className='flex justify-center my-2'>
								<FounderItem item={item} />
							</div>
						))}
				</div>
			</Container>
		</div>
	);
};

export default Founders;
