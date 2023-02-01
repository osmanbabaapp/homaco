import styled from "styled-components";
// components

import { DropboxOutlined, PrinterOutlined } from "@ant-design/icons";
import { Checkbox, Col, Row } from "antd";
import Navbar from "../edit-website/navbar";
import HomeVideo from "../edit-website/sections/home-video";
import FlexDiv from "../utils/flex-div";
import Text from "../utils/text";
import CommonPrintSection from "../edit-website/common/info-section";
import Container from "../utils/container";
import ProductListSection from "../edit-website/sections/product-list";
import StatisticsSection from "../edit-website/sections/statistics";
import ServicesSection from "../edit-website/sections/services";
import FooterSection from "../edit-website/sections/footer-section";
import LetsTalkSection from "../edit-website/sections/contact";
import Header from "../header/index";

function isEven(n) {
  n = Number(n);
  return n === 0 || !!(n && !(n % 2));
}

function isOdd(n) {
  return isEven(Number(n) + 1);
}

const Styles = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap");

  position: relative;
  max-height: 85vh;
  overflow-y: auto;

  font-family: "Source Sans Pro", sans-serif;
  background-color: ${(props) => props.theme.edit.colors.dark1};
  color: #fff;
  overflow-x: hidden;
  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      color: ${(props) => props.theme.edit.colors.gold1};
    }
  }

  * {
    box-sizing: border-box;
  }

  *::selection {
    background-color: ${(props) => props.theme.edit.colors.primary};
  }

  input,
  label,
  textarea {
    color: #fff !important;
  }

  ul {
    padding: 0;
    list-style: none;
    margin: 0;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #fff;
    margin: 0;
  }
`;

export default function EditWebsitePageContent(props) {
  const { data, products, locale } = props;

  const printingAmbalaj = data?.filter((x) => x.departmentName == "printigAmbalage");
  const beautifulPackages = data?.filter((x) => x.departmentName == "beautifulPackages").splice(0, 1);
  const headers = data?.filter((x) => x.departmentName == "header");
  const textSliders = data?.filter((x) => x.departmentName == "textSlider");
  const facts = data?.filter((x) => x.departmentName == "facts");
  const services = data?.filter((x) => x.departmentName == "services");
  const contacts = data?.filter((x) => x.departmentName == "contact");
  const contactImage = data?.filter((x) => x.departmentName == "contactImage");
  const getInTouches = data?.filter((x) => x.departmentName == "getInTouch");

  console.log("contactImage index:>> ", contactImage);

  return (
    <>
      <Row>
        <Col span={24}>
          {/* <Text as="h1">Facts</Text> */}
        </Col>
      </Row>

      <Styles>
        <iframe className="w-[100%] h-[900px]" src="https://sayaf-master.vercel.app/"></iframe>
        {/* <Header />
        <Navbar headers={headers} locale={locale} />

        <HomeVideo textSliders={textSliders} locale={locale} />

        <StatisticsSection facts={facts} locale={locale} />
        <ServicesSection services={services} locale={locale} />
        <LetsTalkSection contacts={contacts} contactImage={contactImage} locale={locale} /> */}
      </Styles>
    </>
  );
}
