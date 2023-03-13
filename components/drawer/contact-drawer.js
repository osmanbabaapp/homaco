import { useCallback, useState, useEffect } from "react";
// import { AuthContext } from "context/auth-context/auth-context";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row, Space, Form, Input, message } from "antd";
import useTranslation from "next-translate/useTranslation";
// import { palette2 } from "../constants/colors";

// context
// import { AuthContext } from "context/auth-context/auth-context";
import axios from "axios";

export default function ContactDrawer({ open, onClose, payload, locale }) {
  const [form] = Form.useForm();
  //   const { id } = queryString.parse(window.location.search);
  const { t } = useTranslation("common");
  const { t: Taddad } = useTranslation("addad");

  const [descriptions, setDescriptions] = useState([
    {
      id: "",
      type: 1,
      values: [1],
    },
  ]);

  const [minValueInput, setMinValueInput] = useState(0);

  const [listDescriptions, setListDescriptions] = useState([]);

  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadings, setLoadings] = useState(null);

  const [error, setError] = useState(null);

  const getListDescriptions = useCallback(async () => {
    if (listDescriptions.length !== 0) return false;

    setLoadings("listDescriptions");
    const { data: res } = await axios.get(process.env.NEXT_PUBLIC_HOST + process.env.NEXT_PUBLIC_GET_ALL_DESCRIPTIONS, {
      headers: { websiteHostName: process.env.NEXT_PUBLIC_WEBSITE_HOST_NAME },
    });

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

      const reqUrlEmail = process.env.NEXT_PUBLIC_HOST + process.env.NEXT_PUBLIC_ADD_EMAIL;

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
          // Authorization: `Bearer ${user?.token}`,
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

  const onCheckbox = useCallback(
    ({ checkedValues, id }) => {
      const itemIndex = descriptions?.findIndex((x) => x.id === id);

      if (itemIndex === -1) {
        setDescriptions((prev) => {
          return [
            ...prev,
            {
              id: id,
              type: 3,
              values: checkedValues,
            },
          ];
        });
      } else {
        setDescriptions((prev) => {
          const oldArray = prev?.filter((y) => y.id !== id) ?? [];

          const myItem = { id: id, type: 3, values: checkedValues };

          if (checkedValues.length === 0) {
            return [...oldArray];
          } else {
            return [...oldArray, myItem];
          }
        });
      }
    },
    [descriptions]
  );

  const onChangeInput = useCallback(
    ({ checkedValues, id }) => {
      const itemIndex = descriptions?.findIndex((x) => x.id === id);

      if (checkedValues < minValueInput) {
        message.error(`You cannot order less than ${minValueInput}`);
      }

      if (itemIndex === -1) {
        setDescriptions((prev) => {
          return [
            ...prev,
            {
              id: id,
              type: 4,
              values: [checkedValues],
            },
          ];
        });
      } else {
        setDescriptions((prev) => {
          const oldArray = prev?.filter((y) => y.id !== id) ?? [];

          const lol = { id: id, type: 4, values: [checkedValues] };

          return [...oldArray, lol];
        });
      }
    },
    [descriptions, minValueInput]
  );

  const onCheckRadio = useCallback(
    ({ checkedValues, id }) => {
      const itemIndex = descriptions?.findIndex((x) => x.id === id);

      if (itemIndex === -1) {
        setDescriptions((prev) => {
          return [
            ...prev,
            {
              id: id,
              type: 2,
              values: [checkedValues],
            },
          ];
        });
      } else {
        setDescriptions((prev) => {
          const oldArray = prev?.filter((y) => y.id !== id) ?? [];

          const lol = { id: id, type: 2, values: [checkedValues] };

          return [...oldArray, lol];
        });
      }
    },
    [descriptions]
  );

  const onChangeSelect = useCallback(
    ({ value, id }) => {
      const itemIndex = descriptions?.findIndex((x) => x.id === id);

      if (itemIndex === -1) {
        setDescriptions((prev) => {
          return [
            ...prev,
            {
              id: id,
              type: 0,
              values: [value],
            },
          ];
        });
      } else {
        setDescriptions((prev) => {
          const oldArray = prev?.filter((y) => y.id !== id) ?? [];

          const lol = { id: id, type: 0, values: [value] };

          return [...oldArray, lol];
        });
      }
    },
    [descriptions]
  );
  const onChangeSelectMulti = useCallback(
    ({ value, id }) => {
      const itemIndex = descriptions?.findIndex((x) => x.id === id);

      if (itemIndex === -1) {
        setDescriptions((prev) => {
          return [
            ...prev,
            {
              id: id,
              type: 1,
              values: value,
            },
          ];
        });
      } else {
        setDescriptions((prev) => {
          const oldArray = prev?.filter((y) => y.id !== id) ?? [];

          const myItem = { id: id, type: 1, values: value };

          if (value.length === 0) {
            return [...oldArray];
          } else {
            return [...oldArray, myItem];
          }
        });
      }
    },
    [descriptions]
  );

  useEffect(() => {
    getListDescriptions();
    // form.setFieldsValue({
    //   fullName: "user?.fullName",
    //   email: "user?.email",
    // });

    const myDescriptions = payload?.productData?.descriptionsId?.map((x) => {
      const lolType = listDescriptions.find((y) => y.id === x.descriptionId)?.propertyDescType;

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

    // form.setFieldsValue({
    //   username: user?.userName,
    //   email: user?.email,
    // });
    let obj = {};
    for (let i = 0; i < payload?.adjs.length; i++) {
      // eslint-disable-next-line no-unused-expressions
      obj[
        `${
          payload?.adjs[i].result[`${locale === "ar" ? "adjactiveAR" : locale === "tr" ? "adjctiveTR" : "adjactiveEN"}`]
        }`
      ] = payload?.adjs[i].result["value"][0];
    }
    form.setFieldsValue(obj);
  }, [form, getListDescriptions, listDescriptions, locale, open, payload?.adjs, payload.productData?.descriptionsId]);

  return (
    <div>
      <Form
        layout="vertical"
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
                name="fullName"
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
                name="email"
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
                  inputMode="email"
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
                name="phoneNumber"
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
                  inputMode="tel"
                  placeholder={t("form.labels.phoneNumber")}
                />
              </Form.Item>

              <Form.Item
                name="countryName"
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
                  inputMode="text"
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
                {locale === "ar" ? "  الخصائص   " : locale === "tr" ? "   Özelikler" : " Features"}
              </label>
              <Row gutter={[24]}>
                {payload?.adjs2?.map((adj) => (
                  <Col key={adj.title} span={24}>
                    <Form.Item
                      name={
                        // adj.result[
                        //   `${
                        //     locale === 'ar'
                        //       ? 'adjactiveAR'
                        //       : locale === 'tr'
                        //       ? 'adjctiveTR'
                        //       : 'adjactiveEN'
                        //   }`
                        // ]
                        adj.title
                      }
                      label={
                        // adj.result[
                        //   `${
                        //     locale === 'ar'
                        //       ? 'adjactiveAR'
                        //       : locale === 'tr'
                        //       ? 'adjctiveTR'
                        //       : 'adjactiveEN'
                        //   }`
                        // ]
                        adj.title
                      }
                    >
                      <Input
                        placeholder={
                          // adj.result[
                          //   `${
                          //     locale === 'ar'
                          //       ? 'adjactiveAR'
                          //       : locale === 'tr'
                          //       ? 'adjctiveTR'
                          //       : 'adjactiveEN'
                          //   }`
                          // ]
                          adj.title
                        }
                        value={adj?.values?.[0] ?? '10'}
                        className={`hover:border-[#ffa352]`}
                      />
                    </Form.Item>
                  </Col>
                ))}
              </Row>
            </Col>
            {/* <Col span={24}>
              <Row
                gutter={[24]}
                style={{
                  direction: locale === "ar" ? "rtl" : "ltr",
                  flexDirection: "row",
                  display: "flex",
                  flexWrap: "wrap",
                  width: "100%",
                }}
              >
                <h2
                  style={{
                    color: 'red',
                    alignSelf: "center",
                    justifySelf: "center",
                    textAlign: "center",
                    padding: 4,
                    alignSelf: "center",
                    width: "100%",
                  }}
                >
                  {t("form.pleaseSpecifyTheSpecificationForWhichYouWouldLikeToRequestAQuote")}
                </h2>
                <Col
                  span={24}
                  style={{
                    direction: locale === "ar" ? "rtl" : "ltr",
                    flexDirection: "row",
                    display: "flex",
                    flexWrap: "wrap",
                    width: "100%",
                  }}
                >
                  {listDescriptions
                    .filter((z, y) => y !== 1 && y !== 0)
                    .map((item, i) => {
                      return (
                        <Col key={i} xs={24} sm={24} md={24} xl={24} xxl={24} span={12}>
                          <Row gutter={12}>
                            <Col span={24} style={{ color: 'red', fontSize: 18, marginTop: 12 }}>
                              {item.propertyDescType === 4 ? t("form.labels.orderCount") : item[`name_${locale}`]}
                            </Col>

                            <div style={{ margin: 4, flexDirection: "column", width: "100%" }}>
                              {item.propertyDescType === 0 && (
                                <Select
                                  showSearch
                                  placeholder={item[`name_${locale}`]}
                                  defaultValue={descriptions?.find((x) => x.id === item.id)?.values?.[0]}
                                  value={descriptions?.find((x) => x.id === item.id)?.values?.[0]}
                                  onChange={(e) => onChangeSelect({ value: e, id: item.id })}
                                  options={item.arrayPropertyValue.map((x) => {
                                    return { label: x[`name_${locale}`], value: x.id };
                                  })}
                                  bordered={false}
                                  style={{
                                    width: "100%",
                                    minWidth: 100,
                                    color: 'red',
                                    border: `1px solid ${'red'}`,
                                    borderRadius: 4,
                                    backgroundColor: "transparent",
                                    boxShadow: "5px 5px #E7E7E7",
                                  }}
                                />
                              )}

                              {item.propertyDescType === 1 && (
                                <Select
                                  style={{
                                    minWidth: 80,
                                    color: 'red',
                                    border: `1px solid ${'red'}`,
                                    borderRadius: 4,
                                    backgroundColor: "transparent",
                                    boxShadow: "5px 5px #E7E7E7",
                                  }}
                                  bordered={false}
                                  placeholder={item[`name_${locale}`]}
                                  optionFilterProp="children"
                                  onChange={(e) => onChangeSelectMulti({ value: e, id: item.id })}
                                  mode="multiple"
                                  defaultValue={descriptions?.find((x) => x.id === item.id)?.values}
                                  value={descriptions?.find((x) => x.id === item.id)?.values}
                                  options={item.arrayPropertyValue.map((x) => {
                                    return { label: x[`name_${locale}`], value: x.id };
                                  })}
                                  dropdownStyle={{ color: "green" }}
                                ></Select>
                              )}

                              {item.propertyDescType === 2 && (
                                <div>
                                  <Radio.Group
                                    style={{
                                      width: "100%",
                                      color: 'red',
                                    }}
                                    onChange={(e) => onCheckRadio({ checkedValues: e.target.value, id: item.id })}
                                    defaultValue={descriptions?.find((x) => x.id === item.id)?.values?.[0]}
                                    value={descriptions?.find((x) => x.id === item.id)?.values?.[0]}
                                    options={item.arrayPropertyValue.map((x) => {
                                      return { label: x[`name_${locale}`], value: x.id };
                                    })}
                                    buttonStyle="solid"
                                  ></Radio.Group>
                                </div>
                              )}

                              {item.propertyDescType === 3 && (
                                <div>
                                  <Checkbox.Group
                                    style={{
                                      width: "100%",
                                      color: 'red',
                                    }}
                                    onChange={(e) => onCheckbox({ checkedValues: e, id: item.id })}
                                    defaultValue={descriptions?.find((x) => x.id === item.id)?.values?.[0]}
                                    value={descriptions?.find((x) => x.id === item.id)?.values?.[0]}
                                    options={item.arrayPropertyValue.map((x) => {
                                      return { label: x[`name_${locale}`], value: x.id };
                                    })}
                                  ></Checkbox.Group>
                                </div>
                              )}

                              {item.propertyDescType === 4 && (
                                <div>
                                  <input
                                    min={minValueInput}
                                    type="number"
                                    onChange={(e) => onChangeInput({ checkedValues: e.target.value, id: item.id })}
                                    value={descriptions?.find((x) => x.id === item.id)?.values?.[0]}
                                    style={{
                                      color: 'red',
                                      border: `1px solid ${'red'}`,
                                      boxShadow: "5px 6px #E7E7E7",
                                      borderRadius: 4,
                                      backgroundColor: "#fff",
                                      padding: 2,
                                    }}
                                  ></input>
                                </div>
                              )}
                            </div>
                          </Row>
                        </Col>
                      );
                    })}
                </Col>
                <Col span={24}>
                  <h4
                    style={{
                      color: 'red',
                      direction: locale === "ar" ? "rtl" : "ltr",
                      marginTop: 12,
                      marginBottom: 12,
                    }}
                  >
                    {Taddad("priceForOneItem")} :{" "}
                    <text
                      style={{
                        backgroundColor: 'red',
                        color: "white",
                        borderRadius: 1,
                        paddingRight: 12,
                        paddingLeft: 12,
                      }}
                    >
                      {payload?.productData?.price} $
                    </text>
                  </h4>
                </Col>
              </Row>
            </Col> */}
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
              htmlType="submit"
              type="primary"
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
