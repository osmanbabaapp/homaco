import type { LayoutProps } from "../page-with-layout";
import Footer from "./footer";
import Navbar from "./navbar";

const MainLayout: LayoutProps = (props) => {
  return (
    <div>
      <Navbar />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
