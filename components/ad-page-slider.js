import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
// components
import { Col, Row } from "antd";
import FlexDiv from "./utils/flex-div";
import ImageContainer from "./utils/image-container";

// import { palette2 } from "@/constants/colors";

// styles
const Host_url = process.env.NEXT_PUBLIC_HOST;

const cstyle1 = `
border-radius: 20px;
border: 2px solid ${"red"};
overflow: hidden;
// height: 80px;
margin: 2px;


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
          <video
            poster={image}
            // controls={true}
            autoPlay={false}
            muted={true}
            style={{ width: "100%", minHeight: "70px" }}
            preload="metadata"
          >
            <source src={`${image}#t=0.5`} />
          </video>
        ) : (
          <Image
            src={image}
            alt={alt}
            layout="responsive"
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
  border-radius: 20px;
  border: 2px solid ${"red"};
  overflow: hidden;
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
    setActiveImage(Host_url + imageUrl);
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
      setActiveImage(`${Host_url}${data?.primaryImage}`);
    }
  }, [data?.primaryImage]);

  return (
    <Row gutter={[0, 12]} className="pt-10">
      <Col span={24}>
        <FlexDiv justifyContent="center">
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
                  layout="responsive"
                  height={100}
                  width={100}
                  itemProp="image"
                />
              ))}
          </SlideShower>
        </FlexDiv>
      </Col>
      <Col span={24}>
        <Row justify="center" gutter={12}>
          {data?.primaryImage &&
            data?.primaryImage !== "{}" &&
            isImageExtended(data?.primaryImage) && (
              <Col>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleChangeSlide(data?.primaryImage);
                    toggleIsVideo(false);
                  }}
                >
                  <SlideBreadImage
                    isVideo={false}
                    image={Host_url + data?.primaryImage}
                    alt={`${productName} - ${companyName} - Osmanbaba`}
                  />
                </a>
              </Col>
            )}
          {data?.image1 &&
            data?.image1 !== "{}" &&
            isImageExtended(data?.image1) && (
              <Col>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleChangeSlide(data?.image1?.split('"')[0]);
                    toggleIsVideo(false);
                  }}
                >
                  <SlideBreadImage
                    isVideo={false}
                    image={Host_url + data?.image1}
                    alt={`${productName} - ${companyName} - Osmanbaba`}
                  />
                </a>
              </Col>
            )}
          {data?.image2 &&
            data?.image2 !== "{}" &&
            isImageExtended(data?.image2) && (
              <Col>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleChangeSlide(data?.image2?.split('"')[0]);
                    toggleIsVideo(false);
                  }}
                >
                  <SlideBreadImage
                    isVideo={false}
                    image={Host_url + data?.image2}
                    alt={`${productName} - ${companyName} - Osmanbaba`}
                  />
                </a>
              </Col>
            )}
          {data?.image3 &&
            data?.image3 !== "{}" &&
            isImageExtended(data?.image3) && (
              <Col>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleChangeSlide(data?.image3?.split('"')[0]);
                    toggleIsVideo(false);
                  }}
                >
                  <SlideBreadImage
                    isVideo={false}
                    image={Host_url + data?.image3}
                    alt={`${productName} - ${companyName} - Osmanbaba`}
                  />
                </a>
              </Col>
            )}
          {data?.video &&
            data?.video !== "{}" &&
            data?.video?.includes(".mp4") && (
              <Col>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleChangeSlide(data?.video?.split('"')[0]);
                    toggleIsVideo(true);
                  }}
                >
                  <SlideBreadImage
                    isVideo={true}
                    image={Host_url + data?.video}
                    alt={`${productName} - ${companyName} - Osmanbaba`}
                  />
                </a>
              </Col>
            )}
          {/* <Col>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleChangeSlide(data?.productImage?.split('"')[0]);
                toggleIsVideo(false);
              }}
            >
              {data?.productImage && data?.productImage !== "{}" && (
                <SlideBreadImage
                  isVideo={false}
                  image={'/media/nur-pack/i2.jpg'}
                  alt={`${productName} - ${companyName} - Osmanbaba`}
                />
              )}
            </a>
          </Col> */}
        </Row>
      </Col>
    </Row>
  );
}
