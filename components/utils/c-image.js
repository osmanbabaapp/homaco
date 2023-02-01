import Image from "next/image";
import ImageContainer from "./image-container";

export default function CustomImage({
  width,
  height,
  radius,
  margin,
  cstyle,
  src,
  alt,
  layout = "responsive",
  imgWidth,
  imgHeight,
  priority = false,
  objectFit,
  objectPosition,
  placeholder = "blur",
  loading = "lazy",
  relative = false,
  onLoadingComplete = () => false,
}) {
  return (
    <ImageContainer
      width={width}
      height={height}
      radius={radius}
      margin={margin}
      cstyle={cstyle}
      relative={relative}
    >
      <Image
        src={src}
        alt={alt}
        layout={layout}
        width={imgWidth}
        height={imgHeight}
        // loader={}
        blurDataURL={src}
        priority={priority}
        objectFit={objectFit}
        objectPosition={objectPosition}
        placeholder={placeholder}
        loading={loading}
        onLoadingComplete={onLoadingComplete}
      />
    </ImageContainer>
  );
}
