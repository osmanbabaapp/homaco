import { useState, useCallback, useEffect } from "react";
import FlexDiv from "components/utils/flex-div";
import Text from "components/utils/text";
import Loading from "components/utils/loading";

import { axiosInstance, httpsAgent, configHeader } from "helpers/constants";

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
  Switch,
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
const RemoveButtonLink = styled.a`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 18px;
  bottom: 70px;
  background-color: #fff;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  ${(props) =>
    props.second &&
    css`
      right: 60px;
    `}
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

function BannerPageContent({ id = null }) {
  const [form] = Form.useForm();
  const router = useRouter();

  let reqUrl;
  if (id) {
    reqUrl =
      process.env.NEXT_PUBLIC_HOST + process.env.NEXT_PUBLIC_UPDATE_BANNER;
  } else {
    reqUrl =
      process.env.NEXT_PUBLIC_HOST + process.env.NEXT_PUBLIC_ADD_NEW_BANNER;
  }

  const { t } = useTranslation(["common", "addad"]);

  // states
  const [primaryFile, setPrimaryFile] = useState({
    prev: null,
    file: null,
    ready: null,
    validate: false,
  });
  const [videoFile, setVideoFile] = useState({
    prev: null,
    file: null,
    validate: false,
  });

  // category list
  const [processing, setProcessing] = useState(false);
  const [prevModalVisible, setPrevModalVisible] = useState({
    visible: false,
    target: null,
    file: null,
    ready: null,
  });

  // loadings
  const [loading, setLoading] = useState(null);
  const [formError, setFormError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [isVideo, toggleIsVideo] = useState(false);
  const [isActive, toggleIsActive] = useState(false);
  const [loadingSubmit, toggleLoadingSubmit] = useState(false);

  const [myDataState, setMyDataState] = useState(undefined);

  // functions
  const handleFormFinish = useCallback(
    async (values) => {
      // if (!cookies) message.warning("Please login to complete this operation");
      // setFormLoading(true);

      let formData = new FormData();

      formData.append("activeStatus", isActive);

      formData.append("text_en", myDataState?.text_en);
      formData.append("text_ar", myDataState?.text_ar);
      formData.append("text_tr", myDataState?.text_tr);

      if (isVideo) {
        formData.append("typeBanner", 1);
        formData.append("file", videoFile.file);
      } else {
        formData.append("typeBanner", 0);
        formData.append("file", primaryFile.file);
      }

      toggleLoadingSubmit(true);
      if (id) {
        formData.append("id", id);

        console.log("[...formData] :>> ", [...formData]);

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
          toggleLoadingSubmit(false);

          message.success(
            t("common:messages.add", {
              name:
                router.locale === "ar"
                  ? "منتج"
                  : router.locale === "en"
                  ? "product"
                  : "ürün",
            })
          );
          router.push("/banners");
        } else {
          toggleLoadingSubmit(false);
          setFormError("Something went wrong! Please try again.");
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
          // const { data } = await axios.post("/api/add-ad", {
          //   data: {
          //     ...res.description,
          //     googleCodes: googleCodesFiltered,
          //     adjects: adjects,
          //   },
          // });
          if (res.status === true) {
            toggleLoadingSubmit(false);
            message.success(
              t("common:messages.add", {
                name:
                  router.locale === "ar"
                    ? "منتج"
                    : router.locale === "en"
                    ? "product"
                    : "ürün",
              })
            );
            router.push("/banners");
          }
        } else {
          toggleLoadingSubmit(false);
          setFormError("Something went wrong! Please try again.");
        }
      }
    },

    [
      isActive,
      myDataState?.text_en,
      myDataState?.text_ar,
      myDataState?.text_tr,
      isVideo,
      id,
      videoFile.file,
      primaryFile.file,
      reqUrl,
      t,
      router,
    ]
  );

  const imageValidate = useCallback((file) => {
    // const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    // if (!isJpgOrPng) {
    //   message.error("You can only upload JPG/PNG files !");
    //   return false;
    // }
    // return true;
    return true;
  }, []);

  const videoValidate = useCallback((file) => {
    const isVideo = file.type.includes("video/");
    if (!isVideo) {
      message.error("You can only upload VIDEO files !");
      return false;
    }
    return true;
  }, []);

  // check if file exist or not
  // const handleValidateFiles = () => {
  //   if (!primaryFile.file) {
  //     setPrimaryFile({
  //       file: null,
  //       prev: null,
  //       validate: t("primary.validate.req"),
  //     });
  //   }
  //   if (!image1.file) {
  //     setImage1({
  //       file: null,
  //       prev: null,
  //       validate: t("req"),
  //     });
  //   }
  //   if (!image2.file) {
  //     setImage2({
  //       file: null,
  //       prev: null,
  //       validate: t("req"),
  //     });
  //   }
  //   if (!image3.file) {
  //     setImage3({
  //       file: null,
  //       prev: null,
  //       validate: t("req"),
  //     });
  //   }
  //   if (!productImage.file) {
  //     setProductImage({
  //       file: null,
  //       prev: null,
  //       validate: t("req"),
  //     });
  //   }
  // };

  // validate line before add new line
  // validate line
  const validateLineBeforeAdd = (i, justOne, goal, type) => {
    let validate = true;

    if (goal) {
      if (!(form.getFieldInstance(goal) && form.getFieldValue(goal))) {
        form.setFields([
          {
            name: goal,
            //   value: values.user,
            errors: [String("Lütfen Ürün Özeliklerini Giriniz")],
          },
        ]);
        validate = false;
      } else {
        form.setFields([
          {
            name: goal,
            //   value: values.user,
            errors: [],
          },
        ]);
      }
    } else {
      if (
        !(
          form.getFieldInstance(`adjtr_${i}`) &&
          form.getFieldValue(`adjtr_${i}`)
        )
      ) {
        form.setFields([
          {
            name: `adjtr_${i}`,
            errors: [String("Lütfen Ürün Özeliklerini Giriniz")],
          },
        ]);
        validate = false;
        if (justOne) return validate;
      } else {
        form.setFields([
          {
            name: `adjtr_${i}`,
            errors: [],
          },
        ]);
      }
      if (
        !(
          form.getFieldInstance(`adjar_${i}`) &&
          form.getFieldValue(`adjar_${i}`)
        )
      ) {
        form.setFields([
          {
            name: `adjar_${i}`,
            errors: [String("Lütfen Ürün Özeliklerini Giriniz")],
          },
        ]);
        validate = false;
        if (justOne) return validate;
      } else {
        form.setFields([
          {
            name: `adjar_${i}`,
            errors: [],
          },
        ]);
      }
      if (
        !(
          form.getFieldInstance(`adjen_${i}`) &&
          form.getFieldValue(`adjen_${i}`)
        )
      ) {
        form.setFields([
          {
            name: `adjen_${i}`,
            errors: [String("Lütfen Ürün Özeliklerini Giriniz")],
          },
        ]);
        validate = false;
        if (justOne) return validate;
      } else {
        form.setFields([
          {
            name: `adjen_${i}`,
            errors: [],
          },
        ]);
      }
      if (adjects[i].type === 1) {
        if (
          !(
            form.getFieldInstance(`adjvalue_${i}`) &&
            form.getFieldValue(`adjvalue_${i}`)
          )
        ) {
          form.setFields([
            {
              name: `adjvalue_${i}`,
              errors: [String("Lütfen değer giriniz")],
            },
          ]);
          validate = false;
          if (justOne) return validate;
        } else {
          form.setFields([
            {
              name: `adjvalue_${i}`,
              errors: [],
            },
          ]);
        }
      }
      if (adjects[i].type === 2) {
        if (
          !(
            form.getFieldInstance(`adjMenvalue_${i}`) &&
            form.getFieldValue(`adjMenvalue_${i}`)
          )
        ) {
          form.setFields([
            {
              name: `adjMenvalue_${i}`,
              errors: [String("Lütfen değer1 giriniz")],
            },
          ]);
          validate = false;
          if (justOne) return validate;
        } else {
          form.setFields([
            {
              name: `adjMenvalue_${i}`,
              errors: [],
            },
          ]);
        }
        if (
          !(
            form.getFieldInstance(`adjMtrvalue_${i}`) &&
            form.getFieldValue(`adjMtrvalue_${i}`)
          )
        ) {
          form.setFields([
            {
              name: `adjMtrvalue_${i}`,
              errors: [String("Lütfen değer2 giriniz")],
            },
          ]);
          validate = false;
          if (justOne) return validate;
        } else {
          form.setFields([
            {
              name: `adjMtrvalue_${i}`,
              errors: [],
            },
          ]);
        }
        if (
          !(
            form.getFieldInstance(`adjMarvalue_${i}`) &&
            form.getFieldValue(`adjMarvalue_${i}`)
          )
        ) {
          form.setFields([
            {
              name: `adjMarvalue_${i}`,
              errors: [String("Lütfen değer3 giriniz")],
            },
          ]);
          validate = false;
          if (justOne) return validate;
        } else {
          form.setFields([
            {
              name: `adjMarvalue_${i}`,
              errors: [],
            },
          ]);
        }
      }
    }
    return validate;
  };

  // useEffects
  useEffect(() => {
    if (id) {
      const getAdDetails = async () => {
        setLoading(true);
        const reqUrl =
          process.env.NEXT_PUBLIC_HOST + process.env.NEXT_PUBLIC_GET_BANNER;

        const { data: res } = await axios.post(
          reqUrl,
          { id },
          {
            headers: {
              websiteHostName: process.env.NEXT_PUBLIC_WEBSITE_HOST_NAME,
            },
          }
        );

        const myData = res.description.result;

        if (res.status === true) {
          form.setFieldsValue({});

          toggleIsActive(myData.activeStatus);

          setMyDataState(myData);

          if (myData.typeBanner === 1) {
            toggleIsVideo(true);
            setVideoFile({
              prev: process.env.NEXT_PUBLIC_HOST + "" + myData.pathOfFile,
              file: true,
              validate: false,
            });
          } else {
            toggleIsVideo(false);
            setPrimaryFile({
              prev: process.env.NEXT_PUBLIC_HOST + "" + myData.pathOfFile,
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
  }, [form, id]);

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

  const videoProps = {
    accept: "video/mp4,video/x-m4v,video/*",
    showUploadList: false,
    disabled: videoFile.file ?? false,
    onRemove: (file) => {
      setVideoFile({ file: null, prev: null, validate: false });
    },
    beforeUpload: (file) => {
      if (file.size >= 1048576 * 50) {
        message.error("Video size must be less than 50Mb");
        return false;
      }
      setVideoFile((prev) => {
        // check
        const validate = videoValidate(file);
        if (!validate) return prev;
        // set video
        let newObj = prev;
        newObj.file = file;
        newObj.prev = "have file";
        newObj.validate = false;
        return {
          ...newObj,
        };
      });

      return false;
    },
  };

  const onChangeFileType = useCallback(() => {
    toggleIsVideo(!isVideo);
  }, [isVideo]);

  const onChangeActiveStatus = useCallback(() => {
    toggleIsActive(!isActive);
  }, [isActive]);

  if (loadingSubmit) {
    return (
      <Loading tip="Loading" message="Uploading" description="please wait" />
    );
  }

  return (
    <FormContainer>
      <Form form={form} layout="vertical" onFinish={handleFormFinish}>
        <Row>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Row gutter={[24, 24]}>
              {isVideo ? (
                <Col span={24}>
                  <Tooltip title={t("addad:tooltips.primary_photo")}>
                    <UploadPrimary name="Video" {...videoProps}>
                      <PrimaryImageOuter error={videoFile.validate !== false}>
                        {videoFile.prev ? (
                          <>
                            <PrimaryImagePreview>
                              <video
                                poster={videoFile.prev}
                                controls={true}
                                autoPlay={false}
                                muted={false}
                                style={{ width: "100%" }}
                                preload="metadata"
                              >
                                <source src={`${videoFile.prev}#t=0.5`} />
                              </video>
                            </PrimaryImagePreview>
                            <RemoveButtonLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setVideoFile({
                                  file: null,
                                  prev: null,
                                  validate: false,
                                });
                              }}
                            >
                              <DeleteOutlined />
                            </RemoveButtonLink>
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
                            {videoFile.validate === false
                              ? t("addad:tooltips.uploadVideo")
                              : videoFile.validate}
                          </h2>
                        )}
                      </PrimaryImageOuter>
                    </UploadPrimary>
                  </Tooltip>
                </Col>
              ) : (
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
              )}
            </Row>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Row gutter={24}>
              <div style={{ margin: 12 }}>{myDataState?.text_en}</div>
            </Row>
            <Row gutter={24}>
              <div style={{ margin: 12 }}>
                <Switch
                  style={{ backgroundColor: isVideo ? "green" : "orange" }}
                  checkedChildren={t("addad:tooltips.videoSwitch")}
                  unCheckedChildren={t("addad:tooltips.photoSwitch")}
                  checked={isVideo}
                  onChange={() => onChangeFileType()}
                />
              </div>
            </Row>

            <Row gutter={24}>
              <div style={{ margin: 12 }}>
                <Switch
                  style={{ backgroundColor: isActive ? "blue" : "GrayText" }}
                  checkedChildren={t("addad:tooltips.active")}
                  unCheckedChildren={t("addad:tooltips.notActive")}
                  checked={isActive}
                  onChange={() => onChangeActiveStatus()}
                />
              </div>
            </Row>
          </Col>

          <Col span={24} style={{ margin: 60 }}>
            <Space>
              <Button
                htmlType="submit"
                type="primary"
                // onClick={handleValidateFiles}
                loading={formLoading}
              >
                {id ? t("common:form.edit") : t("common:form.confirm")}
              </Button>
              <Button type="primary" danger disabled={formLoading}>
                {t("common:form.cancel")}
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
}

export default BannerPageContent;
