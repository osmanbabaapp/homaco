import { useCallback, useState, useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row, Space, Form, Input, message } from "antd";
import useTranslation from "next-translate/useTranslation";

// context
import axios from "axios";

export default function ContactDrawer({ open, onClose, payload, locale }) {
	const [form] = Form.useForm();
	const { t } = useTranslation("common");

	const [descriptions, setDescriptions] = useState([
		{
			id: "",
			type: 1,
			values: [1],
		},
	]);

	const [minValueInput, setMinValueInput] = useState(0);

	const [listDescriptions, setListDescriptions] = useState([]);

	const [loading, setLoading] = useState(false);
	const [loadings, setLoadings] = useState(null);

	const [error, setError] = useState(null);

	const getListDescriptions = useCallback(async () => {
		if (listDescriptions.length !== 0) return false;

		setLoadings("listDescriptions");
		const { data: res } = await axios.get(
			process.env.NEXT_PUBLIC_HOST +
				process.env.NEXT_PUBLIC_GET_ALL_DESCRIPTIONS,
			{
				headers: { websiteHostName: process.env.NEXT_PUBLIC_WEBSITE_HOST_NAME },
			}
		);

		setLoadings(null);

		if (res.status === true) {
			setListDescriptions(res.description);
		} else {
			message.error("Something went wrong! Please try again.");
		}
	}, [listDescriptions]);

	const handleSubmitForm = useCallback(
		async (values) => {
			// send email
			let messageJson = "";

			descriptions &&
				descriptions.forEach((item) => {
					const lol = listDescriptions.find((x) => x.id === item.id);
					if (item.type == 4) {
						const desName = t("form.labels.orderCount");

						const desValues = item.values[0];

						messageJson += desName + ": " + desValues + ", ";
					} else {
						const desName = lol?.[`name_${locale}`];

						const desValues = lol?.arrayPropertyValue
							?.filter((x) => item.values.find((y) => y === x.id))
							.map((x) => x[`name_${locale}`]);

						messageJson += desName + ": " + desValues + ", ";
					}
				});

			setLoading(true);

			const reqUrlEmail =
				process.env.NEXT_PUBLIC_HOST + process.env.NEXT_PUBLIC_ADD_EMAIL;

			const reqBody = {
				Title: payload?.productData[`title_${locale}`],
				Message: JSON.stringify(messageJson),
				Read: false,
				fullName: values.fullName,
				ProductId: payload?.productData?.id,
				SenderEmail: values.email,
				SenderPhone: values.phoneNumber,
				CountryName: values.countryName,
				MessageID: null,
				Lang: locale,
			};

			console.log("reqBody :>> ", reqBody);

			const { data: responseEmail } = await axios.post(reqUrlEmail, reqBody, {
				headers: {
					locale: locale,
					websiteHostName: process.env.NEXT_PUBLIC_WEBSITE_HOST_NAME,
				},
			});

			setLoading(false);

			if (responseEmail.status === true) {
				message.success(
					locale === "ar"
						? "تم إرسال الرسالة بنجاح"
						: locale === "tr"
						? "Mesaj başarıyla gönderildi"
						: "Message has been sended successfully"
				);
				onClose();
			} else {
				setError(responseEmail.description);
			}
		},
		[descriptions, listDescriptions, locale, onClose, payload?.productData, t]
	);

	useEffect(() => {
		const myDescriptions = payload?.productData?.descriptionsId?.map((x) => {
			const lolType = listDescriptions.find(
				(y) => y.id === x.descriptionId
			)?.propertyDescType;

			if (lolType === 4) {
				setMinValueInput(x.optionsId.map((z) => Number(z))[0]);
			}

			return {
				id: x.descriptionId,
				type: lolType,
				values: x.optionsId.map((z) => Number(z)),
			};
		});

		setDescriptions(myDescriptions);

		let obj = {};
		for (let i = 0; i < payload?.adjs2.length; i++) {
			obj[`${payload?.adjs2[i].title}`] = payload?.adjs2[i]["values"][0];
		}
		form.setFieldsValue(obj);
	}, [
		form,
		getListDescriptions,
		listDescriptions,
		locale,
		open,
		payload?.adjs2,
		payload.productData?.descriptionsId,
	]);

	return (
		<div>
			<Form
				layout='vertical'
				hideRequiredMark
				form={form}
				onFinish={handleSubmitForm}
				okText={t("form.confirm")}
				cancelText={t("form.cancel")}
			>
				<Row gutter={16}>
					<div
						style={{
							width: "100%",
							borderRadius: 14,
							border: `0.5px solid ${"red"}`,
						}}
					>
						<h2
							style={{
								color: "red",
								alignSelf: "center",
								justifySelf: "center",
								textAlign: "center",
								padding: 4,
							}}
						>
							{t("form.pleaseEnterYourDataToRespondToYourRequest")}
						</h2>
						<Col span={24} style={{ display: "flex", flexDirection: "row" }}>
							<Form.Item
								name='fullName'
								label={t("form.labels.fullName")}
								rules={[
									{
										required: true,
										message: t("form.validation.required.message", {
											name: t("form.labels.fullName"),
										}),
									},
								]}
								style={{ width: "50%", padding: 4 }}
							>
								<Input
									style={{
										backgroundColor: "#E7F0FE",
										borderRadius: 4,
										color: "black",
										border: `0.5px solid ${"red"}`,
										boxShadow: "5px 10px #E7E7E7",
									}}
									placeholder={t("form.labels.fullName")}
								/>
							</Form.Item>

							<Form.Item
								name='email'
								label={t("form.labels.email")}
								rules={[
									{
										required: true,
										message: t("form.validation.required.message", {
											name: t("form.labels.email"),
										}),
									},
								]}
								style={{ width: "50%", padding: 4 }}
							>
								<Input
									inputMode='email'
									style={{
										backgroundColor: "#E7F0FE",
										borderRadius: 4,
										color: "black",
										border: `0.5px solid ${"red"}`,
										boxShadow: "5px 10px #E7E7E7",
									}}
									placeholder={t("form.labels.email")}
								/>
							</Form.Item>
						</Col>
						<Col span={24} style={{ display: "flex", flexDirection: "row" }}>
							<Form.Item
								name='phoneNumber'
								label={t("form.labels.phoneNumber")}
								rules={[
									{
										required: true,
										message: t("form.validation.required.message", {
											name: t("form.labels.phoneNumber"),
										}),
									},
								]}
								style={{ width: "50%", padding: 4 }}
							>
								<Input
									style={{
										backgroundColor: "#E7F0FE",
										borderRadius: 4,
										color: "black",
										border: `0.5px solid ${"red"}`,
										boxShadow: "5px 10px #E7E7E7",
									}}
									inputMode='tel'
									placeholder={t("form.labels.phoneNumber")}
								/>
							</Form.Item>

							<Form.Item
								name='countryName'
								label={t("form.labels.countryName")}
								rules={[
									{
										required: true,
										message: t("form.validation.required.message", {
											name: t("form.labels.countryName"),
										}),
									},
								]}
								style={{ width: "50%", padding: 4 }}
							>
								<Input
									style={{
										backgroundColor: "#E7F0FE",
										borderRadius: 4,
										color: "black",
										border: `0.5px solid ${"red"}`,
										boxShadow: "5px 10px #E7E7E7",
									}}
									inputMode='text'
									placeholder={t("form.labels.countryName")}
								/>
							</Form.Item>
						</Col>
					</div>

					<div
						style={{
							width: "100%",
							borderRadius: 14,
							border: `0.5px solid ${"red"}`,
							padding: 6,
							marginTop: 6,
						}}
					>
						<Col span={24}>
							<label
								style={{
									display: "block",
									color: "red",
									alignSelf: "center",
									justifySelf: "center",
									textAlign: "center",
									padding: 4,
									alignSelf: "center",
									width: "100%",
								}}
							>
								{" "}
								{locale === "ar"
									? "  الخصائص   "
									: locale === "tr"
									? "   Özelikler"
									: " Features"}
							</label>
							<Row gutter={[24]}>
								{payload?.adjs2?.map((adj) => (
									<Col key={adj.title} span={24}>
										<Form.Item name={adj.title} label={adj.title}>
											<Input
												placeholder={adj.title}
												value={adj?.values?.[0] ?? "10"}
												className={`hover:border-[#ffa352]`}
											/>
										</Form.Item>
									</Col>
								))}
							</Row>
						</Col>
					</div>
				</Row>
				<Divider />
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						bottom: 20,
						position: "absolute",
						backgroundColor: "white",
					}}
				>
					<div>
						<CloseOutlined onClick={onClose} />
						<span style={{ margin: "0px 10px ", fontSize: "18px" }}>
							{locale === "ar"
								? "  قم بإرسال ايميل للبائع"
								: locale === "tr"
								? "     Satıcıyla mail attın"
								: " Send Email To Company"}
						</span>
					</div>
					<Space>
						<Button
							onClick={onClose}
							style={{
								backgroundColor: "#707070",
								border: "0px",
								width: 80,
								color: "white",
								borderRadius: 4,
								height: 30,
							}}
						>
							{t("form.cancel")}
						</Button>
						<Button
							htmlType='submit'
							type='primary'
							loading={loading}
							style={{
								backgroundColor: "red",
								border: "0px",
								minWidth: 80,
								borderRadius: 4,
								height: 30,
							}}
						>
							{t("form.send")}
						</Button>
					</Space>
				</div>
			</Form>
		</div>
	);
}
