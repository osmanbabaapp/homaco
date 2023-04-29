import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
// components
import { Col, Row } from "antd";
import FlexDiv from "./utils/flex-div";
import ImageContainer from "./utils/image-container";
import { PlayCircleFilled } from "@ant-design/icons";

// import { palette2 } from "@/constants/colors";

const cstyle1 = `
border-radius: 20px;
border: 2px solid ${"red"};
overflow: hidden;
margin: 2px;
height: 80px;
width: 80px;
position: relative;
 img,  video {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover;
}

@media (max-width: 450px) {
  border-radius: 20px;
  border: 1px solid ${"red"};
  overflow: hidden;
}
`;

export const SlideBreadImage = ({ image, alt, isVideo }) => {
	return (
		<div>
			<ImageContainer width={100} cstyle={cstyle1}>
				{isVideo ? (
					<>
						<video
							poster={image}
							// controls={true}
							autoPlay={false}
							muted={true}
							style={{ width: "100%", minHeight: "70px", maxHeight: "100%" }}
							preload='metadata'
						>
							<source src={`${image}#t=0.5`} />
						</video>
						<span className='absolute text-red-600 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-3xl w-10 h-10 rounded-full flex items-center justify-center'>
							<PlayCircleFilled />
						</span>
					</>
				) : (
					<Image
						src={image}
						alt={alt}
						layout='responsive'
						width={140}
						height={140}
					/>
				)}
			</ImageContainer>
		</div>
	);
};

// styles
const SlideShower = styled.div`
	background-color: white;
	width: 100%;
	max-width: 500px;
	max-height: 600px;
	border-radius: 20px;
	border: 2px solid ${"red"};
	overflow: hidden;
	img,
	video {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
`;

export default function AdSlide({ data, companyName, productName }) {
	// states
	/* 
    This state just contain active image url => to show it to user
  */
	const [activeImage, setActiveImage] = useState("");
	const [isVideo, toggleIsVideo] = useState(false);

	//** handleChangeSlider => to change activeImage state based on clicked image
	//** in BreadSliderImage component
	const handleChangeSlide = useCallback((imageUrl) => {
		if (!imageUrl) return;
		setActiveImage(imageUrl);
	}, []);

	const isImageExtended = (item) => {
		return (
			item?.includes(".jpeg") ||
			item?.includes(".png") ||
			item?.includes(".jpg") ||
			item?.includes(".webp")
		);
	};

	// setup image slider
	//****  Just when page is mounted
	useEffect(() => {
		// check if there is primary image to show it first
		if (data?.primaryImage && data?.primaryImage !== "{}") {
			setActiveImage(`${data?.primaryImage}`);
		}
	}, [data?.primaryImage]);

	return (
		<Row gutter={[0, 12]} className='pt-10'>
			<Col span={24}>
				<FlexDiv justifyContent='center'>
					<SlideShower>
						{activeImage &&
							activeImage !== "" &&
							(isVideo ? (
								<video
									poster={activeImage}
									controls={true}
									autoPlay={true}
									muted={false}
									style={{ width: "100%", height: "100%" }}
									alt={`${productName} - ${companyName} - Osmanbaba`}
								>
									<source src={activeImage} />
								</video>
							) : (
								<Image
									src={activeImage}
									alt={`${productName} - ${companyName} - Osmanbaba`}
									layout='responsive'
									height={100}
									width={100}
									itemProp='image'
								/>
							))}
					</SlideShower>
				</FlexDiv>
			</Col>
			<Col span={24}>
				<Row justify='center' gutter={12}>
					{isImageExtended(data?.primaryImage) && (
						<Col>
							<a
								href='#'
								onClick={(e) => {
									e.preventDefault();
									handleChangeSlide(data?.primaryImage);
									toggleIsVideo(false);
								}}
							>
								<SlideBreadImage
									isVideo={false}
									image={data?.primaryImage}
									alt={`${productName} - ${companyName} - Osmanbaba`}
								/>
							</a>
						</Col>
					)}
					{isImageExtended(data?.image1) && (
						<Col>
							<a
								href='#'
								onClick={(e) => {
									e.preventDefault();
									handleChangeSlide(data?.image1?.split('"')[0]);
									toggleIsVideo(false);
								}}
							>
								<SlideBreadImage
									isVideo={false}
									image={data?.image1}
									alt={`${productName} - ${companyName} - Osmanbaba`}
								/>
							</a>
						</Col>
					)}
					{isImageExtended(data?.image2) && (
						<Col>
							<a
								href='#'
								onClick={(e) => {
									e.preventDefault();
									handleChangeSlide(data?.image2?.split('"')[0]);
									toggleIsVideo(false);
								}}
							>
								<SlideBreadImage
									isVideo={false}
									image={data?.image2}
									alt={`${productName} - ${companyName} - Osmanbaba`}
								/>
							</a>
						</Col>
					)}
					{isImageExtended(data?.image3) && (
						<Col>
							<a
								href='#'
								onClick={(e) => {
									e.preventDefault();
									handleChangeSlide(data?.image3?.split('"')[0]);
									toggleIsVideo(false);
								}}
							>
								<SlideBreadImage
									isVideo={false}
									image={data?.image3}
									alt={`${productName} - ${companyName} - Osmanbaba`}
								/>
							</a>
						</Col>
					)}
					{data?.video && (
						<Col>
							<a
								href='#'
								onClick={(e) => {
									e.preventDefault();
									handleChangeSlide(data?.video?.split('"')[0]);
									toggleIsVideo(true);
								}}
							>
								<SlideBreadImage
									isVideo={true}
									image={data?.primaryImage}
									alt={`${productName} - ${companyName} - Osmanbaba`}
								/>
							</a>
						</Col>
					)}
				</Row>
			</Col>
		</Row>
	);
}
