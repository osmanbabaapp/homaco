import { LayoutContext } from "context/layout.context";
import Link from "next/link";
import { useContext } from "react";
import styled from "styled-components";
import { activeBackground, activeLink } from "./utils-styles";

// styles
const StyledMenuGroup = styled.div`
  margin-bottom: 30px;
`;

export const MenuGroup = ({ title, children }) => {
  const { sideOpen } = useContext(LayoutContext);
  return (
    <StyledMenuGroup>
      {sideOpen && (
        <h5 className="uppercase font-bold m-0 mb-[10px]">{title}</h5>
      )}
      <div>{children}</div>
    </StyledMenuGroup>
  );
};

// styles

const StyledMenuItemLink = styled(Link)`
  display: block;
  margin-bottom: 5px;
  ${(props) => {
    if (props.active === true) return activeLink;
  }}
`;

const StyledMenuItem = styled.div`
  display: flex;
  transition: background-color 0.4s;
  border-radius: 10px;
  gap: 10px;
  align-items: center;
  padding: 10px;
  justify-content: ${(props) => props.justifyContent};
  &:hover {
    ${activeBackground}
  }
  ${(props) => {
    if (props.active === true) {
      return activeBackground;
    }
  }}
`;
export const MenuItem = ({ href, title, icon, active = false }) => {
  const { sideOpen } = useContext(LayoutContext);

  return (
    <StyledMenuItemLink href={href} active={active}>
      <StyledMenuItem
        justifyContent={sideOpen ? null : "center"}
        active={active}
      >
        <span
          className={
            !sideOpen
              ? "text-[24px] transition-all flex"
              : "transition-all flex"
          }
        >
          {icon}
        </span>
        {sideOpen && <span>{title}</span>}
      </StyledMenuItem>
    </StyledMenuItemLink>
  );
};
