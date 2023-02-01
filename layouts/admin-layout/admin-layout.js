import { LayoutContext } from "../../context/layout.context";
import { useContext } from "react";
import styled from "styled-components";
// components
import Navbar from "./components/navbar";
import SideMenu from "./components/side-menu";
import { layoutTransitionWidth } from "./components/utils-styles";

import LanguageSwitcher from "./components/language-switcher";
import Theme from "../../config/theme";

// styles
const Layout = styled.div`
  position: relative;
`;

const MainContent = styled.div`
  position: relative;
  margin-left: auto;
  ${layoutTransitionWidth}
  ${(props) => {
    if (props.sideOpen === true)
      return `
      width: calc(100% - ${props.theme.layout.side_uncollapsed_width});
    `;
    else
      return `
      width: calc(100% - ${props.theme.layout.side_collapsed_width});
    `;
  }}
`;

const Main = styled.main`
  padding: ${(props) => props.theme.layout.con_padding};
`;

export default function AdminLayout(props) {
  const { sideOpen } = useContext(LayoutContext);
  return (
    <Theme>
      <Layout>
        <SideMenu />
        <MainContent sideOpen={sideOpen}>
          <Navbar />
          <Main>{props.children}</Main>
        </MainContent>
      </Layout>
    </Theme>
  );
}
