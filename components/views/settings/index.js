import { Col, Row, Select, Tag, message } from "antd";
import FlexDiv from "components/utils/flex-div";
import Text from "components/utils/text";
import { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

import { axiosInstance, configHeader, httpsAgent } from "helpers/constants";

const reqUrl =
	process.env.NEXT_PUBLIC_HOST + process.env.NEXT_PUBLIC_ALL_UPDATE_SETTINGS;

const fontFamilyArr = [
	{
		id: 0,
		fontFamily: "unset",
	},
	{
		id: 1,
		fontFamily: "cursive",
	},
	{
		id: 2,
		fontFamily: "fantasy",
	},
	{
		id: 3,
		fontFamily: "inherit",
	},
	{
		id: 4,
		fontFamily: "initial",
	},
	{
		id: 5,
		fontFamily: "monospace",
	},
	{
		id: 6,
		fontFamily: "revert",
	},
	{
		id: 7,
		fontFamily: "revert-layer",
	},
	{
		id: 8,
		fontFamily: "sans-serif",
	},
	{
		id: 9,
		fontFamily: "serif",
	},
];

const tagRender = (props) => {
	const { label, value, closable, onClose } = props;
	const onPreventMouseDown = (event) => {
		event.preventDefault();
		event.stopPropagation();
	};
	return (
		<Tag
			color={label}
			onMouseDown={onPreventMouseDown}
			closable={closable}
			onClose={onClose}
			style={{
				marginRight: 3,
				fontFamily: "cursive",
			}}
		>
			{label}
		</Tag>
	);
};

export default function SettingsPageContent(props) {
	const { data } = props;

	const { t } = useTranslation(["common"]);

	const router = useRouter();

	const [colorHeadingState, setColorHeadingState] = useState("#eb4034");
	const [colorTextState, setColorTextState] = useState("#eb4034");

	const [fontHeadingState, setFontHeadingState] = useState("serif");
	const [fontTextState, setFontTextState] = useState("serif");

	const exampleHeadingSentence = () => {
		if (router.locale === "en") {
			return "Sample sentence for the font to see for Heading";
		}
		if (router.locale === "ar") {
			return "جملة رىيسية عينة للخط لرؤية";
		}
		return "Ana yazı tipinin görmesi için örnek cümle";
	};

	const exampleTextSentence = () => {
		if (router.locale === "en") {
			return "Sample sentence for the font to see for Text";
		}
		if (router.locale === "ar") {
			return "جملة عادية عينة للخط لرؤية";
		}
		return "Normal yazı tipinin görmesi için örnek cümle";
	};

	// console.log("data :>> ", data);

	const fontColor = data?.filter((x) => x.departmentName == "fontColor")[0];
	const fontFamily = data?.filter((x) => x.departmentName == "fontFamily")[0];

	console.log("fontColor :>> ", fontColor);
	console.log("fontFamily :>> ", fontFamily);

	const onChangeHeadingSelect = ({ value, id }) => {
		setFontHeadingState(fontFamilyArr.find((x) => x.id === value).fontFamily);
	};
	const onChangeTextSelect = ({ value, id }) => {
		setFontTextState(fontFamilyArr.find((x) => x.id === value).fontFamily);
	};

	const onSelectHeadingColor = useCallback(({ e, id }) => {
		setColorHeadingState(e.target.value);
	}, []);

	const onSelectTextColor = useCallback(({ e, id }) => {
		setColorTextState(e.target.value);
	}, []);

	const submitColor = useCallback(async () => {
		console.log("submitColor :>> ");

		// if (!cookies) message.warning("Please login to complete this operation");
		// setFormLoading(true);

		let formData = new FormData();

		console.log("fontColor :>> ", fontColor);
		console.log("colorState :>> ", colorTextState);

		formData.append("id", fontColor?.id);
		formData.append("departmentName", fontColor?.departmentName);
		formData.append("key", fontColor?.key);
		formData.append("value", fontColor?.value);
		formData.append("image", fontColor?.image);
		formData.append("file", fontColor?.file);
		formData.append("video", fontColor?.video);
		formData.append("valueType", fontColor?.valueType);
		formData.append("text_tr", fontColor?.text_tr);
		formData.append("heading_tr", fontColor?.heading_tr);
		formData.append("text_ar", fontColor?.text_ar);
		formData.append("heading_ar", fontColor?.heading_ar);
		formData.append("websiteId", "00000000-0000-0000-0000-000000000000");

		formData.append("heading_en", colorHeadingState);
		formData.append("text_en", colorTextState);

		// start send data
		if (fontColor?.id) {
			try {
				const { data: res } = await axiosInstance.post(
					reqUrl,
					formData,
					{ httpsAgent: httpsAgent },
					configHeader
				);

				console.log("res :>> ", res);
				if (res.status === true) {
					message.success(
						t("common:messages.add", {
							name:
								router.locale === "ar"
									? "Item"
									: router.locale === "en"
									? "Item"
									: "Item",
						})
					);
				}
			} catch (error) {
				console.log("error :>> ", error);
			}
		} else {
			setFormError("Something went wrong! Please try again.");
		}
	}, [colorHeadingState, colorTextState, fontColor, router.locale, t]);

	const submitFontFamily = useCallback(async () => {
		// if (!cookies) message.warning("Please login to complete this operation");
		// setFormLoading(true);

		let formData = new FormData();

		console.log("fontFamily :>> ", fontFamily);
		console.log("fontState :>> ", fontTextState);

		formData.append("id", fontFamily?.id);
		formData.append("departmentName", fontFamily?.departmentName);
		formData.append("key", fontFamily?.key);
		formData.append("value", fontFamily?.value);
		formData.append("image", fontFamily?.image);
		formData.append("file", fontFamily?.file);
		formData.append("video", fontFamily?.video);
		formData.append("valueType", fontFamily?.valueType);
		formData.append("heading_en", fontFamily?.heading_en);
		formData.append("text_tr", fontFamily?.text_tr);
		formData.append("heading_tr", fontFamily?.heading_tr);
		formData.append("text_ar", fontFamily?.text_ar);
		formData.append("heading_ar", fontFamily?.heading_ar);
		formData.append("websiteId", "00000000-0000-0000-0000-000000000000");

		formData.append("heading_en", fontHeadingState);
		formData.append("text_en", fontTextState);

		// start send data
		if (fontFamily?.id) {
			try {
				const { data: res } = await axiosInstance.post(
					reqUrl,
					formData,
					{ httpsAgent: httpsAgent },
					configHeader
				);

				console.log("res :>> ", res);
				if (res.status === true) {
					message.success(
						t("common:messages.add", {
							name:
								router.locale === "ar"
									? "Item"
									: router.locale === "en"
									? "Item"
									: "Item",
						})
					);
				}
			} catch (error) {
				console.log("error :>> ", error);
			}
		} else {
			setFormError("Something went wrong! Please try again.");
		}
	}, [fontFamily, fontHeadingState, fontTextState, router.locale, t]);

	useEffect(() => {
		if (fontColor) {
			setColorHeadingState(fontColor.heading_en);
			setColorTextState(fontColor.text_en);
			console.log("fontColor.text_en :>> ", fontColor.text_en);
		} else {
			console.log("item :>> ", "undefined");
		}

		if (fontFamily) {
			console.log("fontFamily.text_en :>> ", fontFamily.text_en);
			setFontTextState(fontFamily.text_en);
		} else {
			console.log("item :>> ", "undefined");
		}
	}, [fontColor, fontFamily]);
	return (
		<Row
			gutter={[24, 24]}
			style={{
				alignItems: "center",
				justifyContent: "center",
				display: "flex",
			}}
		>
			<Col span={24}>
				<FlexDiv alignItems='center'>
					<FlexDiv>
						<Text as='h1'>Settings</Text>
					</FlexDiv>
				</FlexDiv>
			</Col>

			<Col span={24}>
				<div style={{ display: "flex", flexDirection: "row" }}>
					{<Text as='h1'>Settings</Text> !== 0 && (
						<Select
							style={{ minWidth: 90, margin: 6 }}
							showSearch
							placeholder={"choose color"}
							defaultValue={fontFamilyArr[0]}
							onChange={(e) =>
								onChangeHeadingSelect({ value: e, id: fontFamilyArr[0].id })
							}
							options={fontFamilyArr.map((x) => {
								return { label: x.fontFamily, value: x.id };
							})}
							tagRender={tagRender}
						></Select>
					)}

					<Text as='h3' style={{ fontFamily: fontHeadingState, margin: 6 }}>
						{exampleHeadingSentence()}
					</Text>

					<button
						style={{ width: 160, height: 30, margin: 6 }}
						onClick={() => submitFontFamily()}
					>
						submit Text font
					</button>
				</div>
			</Col>
			<Col span={24}>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text style={{ margin: 6 }} as='h3'>
						Font Heading Color{" "}
					</Text>
					<input
						style={{ margin: 6 }}
						type='color'
						id='favcolor'
						name='favcolor'
						onChange={(e) => onSelectHeadingColor({ e, id: "id" })}
						value={colorHeadingState}
					/>

					<button
						style={{ width: 120, height: 30, margin: 6 }}
						onClick={() => submitColor()}
					>
						submit color
					</button>
				</div>
			</Col>

			<Col span={24}>
				<div style={{ display: "flex", flexDirection: "row" }}>
					{<Text as='h1'>Settings</Text> !== 0 && (
						<Select
							style={{ minWidth: 90, margin: 6 }}
							showSearch
							placeholder={"choose color"}
							defaultValue={fontFamilyArr[0]}
							onChange={(e) =>
								onChangeTextSelect({ value: e, id: fontFamilyArr[0].id })
							}
							options={fontFamilyArr.map((x) => {
								return { label: x.fontFamily, value: x.id };
							})}
							tagRender={tagRender}
						></Select>
					)}

					<Text as='h3' style={{ fontFamily: fontTextState, margin: 6 }}>
						{exampleTextSentence()}
					</Text>

					<button
						style={{ width: 160, height: 30, margin: 6 }}
						onClick={() => submitFontFamily()}
					>
						submit Text font
					</button>
				</div>
			</Col>

			<Col span={24}>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text style={{ margin: 6 }} as='h3'>
						Font Text Color{" "}
					</Text>
					<input
						style={{ margin: 6 }}
						type='color'
						id='favcolor'
						name='favcolor'
						onChange={(e) => onSelectTextColor({ e, id: "id" })}
						value={colorTextState}
					/>

					<button
						style={{ width: 120, height: 30, margin: 6 }}
						onClick={() => submitColor()}
					>
						submit color
					</button>
				</div>
			</Col>
		</Row>
	);
}
