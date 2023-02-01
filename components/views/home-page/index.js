"use client";
// import { Area, Pie } from "@ant-design/plots";
import { Col, Row } from "antd";
import Text from "../../utils/text";

const data1 = [];
const data2 = [];

export default function HomePageContent({ data, products, locale }) {
  const facts = data?.filter((x) => x.departmentName == "facts");
  facts?.forEach((element) => {
    let type = element.heading_en;
    let value = Number(element.text_en);
    if (locale === "ar") {
      type = element.heading_ar;
      value = Number(element.text_ar);
    } else if (locale === "tr") {
      type = element.heading_tr;
      value = Number(element.text_tr);
    }
    data2.push({
      type: type,
      value: value,
    });
  });
  products?.forEach((element) => {
    let timePeriod = element.title_en;
    let watched = Math.random() * 10;
    if (locale === "ar") {
      timePeriod = element.title_ar;
    } else if (locale === "tr") {
      timePeriod = element.title_tr;
    }
    data1.push({
      timePeriod: timePeriod,
      watched: watched,
    });
  });
  const config1 = {
    data: data1,
    xField: "timePeriod",
    yField: "watched",
    xAxis: {
      range: [0, 1],
    },
  };

  const config2 = {
    appendPadding: 10,
    data: data2,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      //   content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Text as="h1" size={25} bold="bold">
          Analytics
        </Text>
      </Col>
      {/* <Col span={16}>
        <Area {...config1} />
      </Col>
      <Col span={8}>
        <Pie {...config2} />
      </Col> */}
    </Row>
  );
}
