// import CustomImage from "components/utils/c-image";
import styled from "styled-components";
// components
// styles
const LogoContainer = styled.div`
  padding: ${(props) => props.theme.layout.con_padding};
`;

export default function Logo({ src, title, sideOpen }) {
  return (
    <LogoContainer>
      <div
        className={
          "flex gap-[10px] items-center " + !sideOpen ? "justify-center" : ""
        }
      >
        {/* {src && (
          <CustomImage src={src} width={58} imgWidth={100} imgHeight={58} />
        )} */}
        LOGO
        {sideOpen && title && <h1 className="m-0 line-clamp-1">{title}</h1>}
      </div>
    </LogoContainer>
  );
}
