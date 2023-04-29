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

	return (
		<Row gutter={[24, 24]}>
			<Col span={24}>
				<Text as='h1' size={25} bold='bold'>
					Analytics
				</Text>
			</Col>
		</Row>
	);
}
