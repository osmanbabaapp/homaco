import { useState, useCallback, useEffect } from "react";
import FlexDiv from "../../../components/utils/flex-div";
// import { Col, Row, Form, Input, Upload, Button } from "antd";
import Text from "../../../components/utils/text";

import {
  axiosInstance,
  httpsAgent,
  configHeader,
} from "../../../helpers/constants";

import Image from "next/image";
import styled, { css } from "styled-components";
// components
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Tooltip,
  Upload,
} from "antd";
// modules
import {
  DeleteOutlined,
  LoadingOutlined,
  MinusCircleFilled,
  MinusOutlined,
  PlusCircleFilled,
  PlusOutlined,
} from "@ant-design/icons";
import axios from "axios";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
// styles
const FormContainer = styled.div`
  background-color: #fff;
  padding: 10px;
`;

const UploadPrimary = styled(Upload)`
  display: block;
  padding: 0 20px;

  > div {
    width: 100%;
  }
`;

const PrimaryImageOuter = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #ddd;
  cursor: pointer;
  position: relative;
  ${(props) => {
    if (!props.noBorder)
      return `
        &:hover {
            border-width: 3px;
        }
      `;
    else
      return `
    
    `;
  }}
  ${(props) => {
    if (props.error)
      return `
        border: 3px dashed ${props.theme.colors.danger};
      `;
  }}
`;
const PrimaryImagePreview = styled.div`
  width: 100%;
  height: auto;
  max-height: 470px;
`;

const RemoveButton = styled(Button)`
  position: absolute;
  right: 20px;
  bottom: 20px;
`;

const ProcessingImage = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// styles
const StyledUploadImage = styled(FlexDiv)`
  border: 1px dashed ${(props) => props.theme.colors.secondary};
  position: relative;
  &:hover {
    border-width: 2px;
  }
`;

const StyledUploadComponent = styled(Upload)`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 400px;
  cursor: pointer;
  ${(props) => {
    if (props?.small)
      return `
      width: 150px;
      height: 150px;
    `;
  }}
  > div {
    width: 100%;
  }
`;

function CategoryPageContent({ id = null }) {
  const [form] = Form.useForm();
  const router = useRouter();

  let reqUrl;
  if (id) {
    reqUrl =
      process.env.NEXT_PUBLIC_HOST + process.env.NEXT_PUBLIC_UPDATE_CATEGORY;
  } else {
    reqUrl =
      process.env.NEXT_PUBLIC_HOST + process.env.NEXT_PUBLIC_ADD_NEW_CATEGORY;
    // reqUrl = "/api/add-ad";
  }

  const { t } = useTranslation(["common", "addad"]);
  // states
  const [primaryFile, setPrimaryFile] = useState({
    prev: null,
    file: null,
    ready: null,
    validate: false,
  });

  // category list
  const [listCategory, setListCategory] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [prevModalVisible, setPrevModalVisible] = useState({
    visible: false,
    target: null,
    file: null,
    ready: null,
  });
  // lines state

  // loadings
  const [loading, setLoading] = useState(null);
  const [loadings, setLoadings] = useState(null);
  const [formError, setFormError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // functions
  const handleFormFinish = useCallback(
    async (values) => {
      // if (!cookies) message.warning("Please login to complete this operation");
      // setFormLoading(true);

      let formData = new FormData();

      formData.append("name_ar", values.name_ar);
      formData.append("name_tr", values.name_tr);
      formData.append("name_en", values.name_en);
      formData.append("googleCode", values.googleCode);

      if (!!values.parentId) {
        formData.append("parentId", values.parentId);
      }
      formData.append("image", primaryFile.file);

      // start send data
      if (id) {
        formData.append("id", id);

        const { data: res } = await axios.post(
          reqUrl,
          formData,
          {
            httpsAgent: httpsAgent,
            headers: {
              websiteHostName: process.env.NEXT_PUBLIC_WEBSITE_HOST_NAME,
            },
          },
          configHeader
        );

        if (res.status === true) {
          if (res.status === true) {
            message.success(t("common:messages.editCategory"));
            router.push("/admin/categories");
          } else {
            setFormError("Something went wrong! Please try again.");
          }
        }
      } else {
        const { data: res } = await axios.post(
          reqUrl,
          formData,
          {
            httpsAgent: httpsAgent,
            headers: {
              websiteHostName: process.env.NEXT_PUBLIC_WEBSITE_HOST_NAME,
            },
          },
          configHeader
        );

        if (res.status === true) {
          if (res.status === true) {
            message.success(t("common:messages.addCategory"));
            router.push("/categories");
          }
        } else {
          setFormError("Something went wrong! Please try again.");
        }
      }

      setFormLoading(false);
    },

    [primaryFile.file, id, reqUrl, t, router]
  );

  const getListCategory = useCallback(async () => {
    if (listCategory.length !== 0) return false;

    setLoadings("categoryList");
    const { data: res } = await axios.get(
      process.env.NEXT_PUBLIC_HOST + process.env.NEXT_PUBLIC_ALL_CATEGORIES,
      {
        headers: {
          websiteHostName: process.env.NEXT_PUBLIC_WEBSITE_HOST_NAME,
        },
      }
    );

    setLoadings(null);

    console.log("res categoryList :>> ", res);

    if (res.status === true) {
      setListCategory(res.description.filter((x) => x.id != id));
    } else {
      message.error("Something went wrong! Please try again.");
    }
  }, [id, listCategory.length]);

  const imageValidate = useCallback((file) => {
    // const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    // if (!isJpgOrPng) {
    //   message.error("You can only upload JPG/PNG files !");
    //   return false;
    // }
    // return true;
    return true;
  }, []);

  // useEffects
  useEffect(() => {
    if (id) {
      const getAdDetails = async () => {
        setLoading(true);
        const reqUrl =
          process.env.NEXT_PUBLIC_HOST + process.env.NEXT_PUBLIC_GET_CATEGORY;

        console.log("id :>> ", id);

        const { data: res } = await axios.post(
          reqUrl,
          { id },
          {
            headers: {
              websiteHostName: process.env.NEXT_PUBLIC_WEBSITE_HOST_NAME,
            },
          }
        );

        console.log("res :>> ", res);

        const myData = res.description.result;

        if (res.status === true) {
          await getListCategory();
          let categories =
            res.category?.map((item, i) => item?.categoryID) ?? [];

          form.setFieldsValue({
            name_tr: myData?.name_tr,
            name_en: myData?.name_en,
            name_ar: myData?.name_ar,
            googleCode: ["623"],
            parentId: myData?.parentId,
          });

          if (myData?.image !== "{}") {
            setPrimaryFile({
              prev: process.env.NEXT_PUBLIC_HOST + myData?.image,
              file: true,
              validate: false,
            });
          }
        } else {
          alert("Something went wrong! Please try again.");
        }
        setLoading(false);
      };
      getAdDetails();
    }
  }, [form, getListCategory, id]);

  // primary image props
  const primaryFileProps = {
    // accept: "image/png, image/jpeg",
    showUploadList: false,
    disabled: primaryFile.file ?? false,
    onRemove: (file) => {
      setPrimaryFile((prevF) => {
        let newObj = prevF;
        newObj.file = null;
        newObj.prev = null;
        newObj.validate = false;
        return { ...newObj };
      });
    },
    beforeUpload: (file) => {
      // check file size
      if (file.size >= 1048576 * 5) {
        message.error("File size must be less than 1Mb");
        return false;
      }

      setPrimaryFile((prev) => {
        // check image file..
        const validate = imageValidate(file);
        if (!validate) return prev;
        // set image
        let newObj = prev;
        newObj.file = file;
        newObj.prev = URL.createObjectURL(file);
        newObj.validate = false;
        return { ...newObj };
      });
      setPrevModalVisible({
        visible: true,
        target: "primary",
        file: primaryFile,
        ready: null,
      });
      return false;
    },
    primaryFile,
  };

  const clearSelected = useCallback(() => {
    form.setFieldsValue({
      parentId: "",
    });
  }, [form]);

  return (
    <FormContainer>
      <Form form={form} layout="vertical" onFinish={handleFormFinish}>
        <Row>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <Tooltip title={t("addad:tooltips.primary_photo")}>
                  <UploadPrimary name="PrimaryImage" {...primaryFileProps}>
                    <PrimaryImageOuter error={primaryFile.validate !== false}>
                      {primaryFile.prev ? (
                        <>
                          <PrimaryImagePreview>
                            <Image
                              alt="primary image"
                              src={
                                primaryFile?.ready
                                  ? primaryFile?.ready
                                  : primaryFile.prev
                              }
                              layout="fill"
                              objectFit="contain"
                            />
                          </PrimaryImagePreview>
                          <RemoveButton
                            danger
                            color="#ff0000"
                            onClick={() =>
                              setPrimaryFile({
                                prev: null,
                                file: null,
                                validate: false,
                                ready: null,
                              })
                            }
                          >
                            {t("common:actions.delete", {
                              name:
                                router.locale === "ar"
                                  ? "ملف"
                                  : router.locale === "en"
                                  ? "Photo"
                                  : "Fotoğrafı",
                            })}
                          </RemoveButton>
                          {processing === "primary" && (
                            <ProcessingImage>
                              <LoadingOutlined
                                spin
                                style={{ color: "orange", fontSize: 42 }}
                              />
                              <Text as="h1" type="primary">
                                Processing Image
                              </Text>
                            </ProcessingImage>
                          )}
                        </>
                      ) : (
                        <h2>
                          {primaryFile.validate === false
                            ? t("addad:tooltips.primary_photo_title")
                            : primaryFile.validate}
                        </h2>
                      )}
                    </PrimaryImageOuter>
                  </UploadPrimary>
                </Tooltip>
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  name="name_tr"
                  label={t("addad:categoryTr")}
                  rules={[
                    {
                      required: true,
                      message: t("common:form.validation.required.message", {
                        name: t("addad:categoryTr"),
                      }),
                    },
                  ]}
                  tooltip={t("addad:categoryTr")}
                >
                  <Input placeholder={t("addad:categoryTr")} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="name_ar"
                  tooltip={t("addad:categoryAr")}
                  label={t("addad:categoryAr")}
                  rules={[
                    {
                      required: false,
                      message: t("common:form.validation.required.message", {
                        name: t("addad:categoryAr"),
                      }),
                    },
                  ]}
                >
                  <Input placeholder={t("addad:categoryAr")} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="name_en"
                  label={t("addad:categoryEn")}
                  tooltip={t("addad:categoryEn")}
                  rules={[
                    {
                      required: false,
                      message: t("common:form.validation.required.message", {
                        name: t("addad:categoryEn"),
                      }),
                    },
                  ]}
                >
                  <Input placeholder={t("addad:categoryEn")} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="googleCode"
                  label={t("addad:googleCode")}
                  tooltip={t("addad:googleCode")}
                  rules={[
                    {
                      required: false,
                      message: t("common:form.validation.required.message", {
                        name: t("addad:googleCode"),
                      }),
                    },
                  ]}
                >
                  <Input placeholder={t("addad:googleCode")} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="parentId"
                  label={t("addad:parentCategory")}
                  rules={[
                    {
                      required: false,
                      message: t("common:form.validation.required.message", {
                        name: t("addad:parentCategory"),
                      }),
                    },
                  ]}
                  tooltip={{
                    title: t("addad:tooltips.kategori"),
                    placement: router.locale === "ar" ? "left" : "right",
                  }}
                >
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder={t("addad:parentCategory")}
                    optionFilterProp="children"
                    // onChange={() => console.log("on change")}
                    onFocus={getListCategory}
                    loading={loadings === "categoryList"}
                    // mode="multiple"
                    // onSearch={(value) => countryListSearch(value)}
                    filterOption={(input, option) => {
                      return option.children
                        .toLowerCase()
                        .includes(input.toLowerCase());
                    }}
                  >
                    {listCategory.map((item, i) => {
                      return (
                        <Select.Option key={item.id} value={item.id}>
                          {item[`name_${router.locale}`]}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Button onClick={() => clearSelected()}>
                  Clear Selected category
                </Button>
              </Col>
            </Row>
          </Col>

          <Col span={24} style={{ margin: 60 }}>
            <Space>
              <Button
                htmlType="submit"
                type="dashed"
                // onClick={handleValidateFiles}
                loading={formLoading}
              >
                {id ? t("common:form.edit") : t("common:form.confirm")}
              </Button>
              <Button
                onClick={() => router.back()}
                type="dashed"
                danger
                disabled={formLoading}
              >
                {t("common:form.cancel")}
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
}

export default CategoryPageContent;
