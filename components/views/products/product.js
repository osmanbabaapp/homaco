import FlexDiv from "../../utils/flex-div";
import { useCallback, useEffect, useState } from "react";
// import { Col, Row, Form, Input, Upload, Button } from "antd";
import CustomImage from "../../utils/c-image";
import Text from "../../utils/text";

import { configHeader, httpsAgent } from "../../../helpers/constants";

import Image from "next/image";
import styled, { css } from "styled-components";
// components
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Radio,
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
  PlusCircleFilled,
  PlusOutlined,
  MinusOutlined,
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
const UploadSmall = styled(Upload)`
  display: block;
  width: 120px;
  height: 100px;

  > div {
    width: 120px;
    height: 100px;
    border: 1px dashed #ddd;
  }
  > div > div {
    display: block;
    padding: 10px;
    width: 120px;
    height: 100px;
    cursor: pointer;
    position: relative;
  }
  > div > div > div {
    width: 120px;
    height: 100px;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
  }
  ${(props) => {
    if (!props.noBorder) {
      return `
      > div:hover {
          border-width: 3px;
      }
    `;
    }
  }}
  ${(props) => {
    if (props.error) {
      return `
            > div {
                border: 3px dashed ${props.theme.colors.dnager};
                text-align: center;
            }
          `;
    }
  }}
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
  right: 20px;
  bottom: 20px;
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

const RoundedLink = styled.a`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: #fff;
  ${(props) =>
    props.type && `background-color: ${props.theme?.colors?.[props.type]};`}
  &:hover {
    color: #fff;
  }
`;

const RemoveBackgroundButton = styled(Button)`
  position: absolute;
  right: 20px;
  bottom: 60px;
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

function UploadImage({ imageFile, setImageFile, small, title }) {
  const fileProps = {
    accept: "image/png, image/jpeg",
    showUploadList: false,
    disabled: imageFile.file ?? false,
    onRemove: (file) => {
      setImageFile({ file: null, prev: null, validate: false });
    },
    beforeUpload: (file) => {
      setImageFile((prev) => {
        // set File
        let newObj = prev;
        newObj.file = file;
        newObj.prev = URL.createObjectURL(file);
        return {
          ...newObj,
        };
      });
      return false;
    },
    imageFile,
  };
  return (
    <StyledUploadComponent {...fileProps} small={small}>
      <StyledUploadImage
        height="100%"
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        {imageFile?.prev ? (
          <>
            <CustomImage
              src={imageFile?.prev}
              width="80%"
              height="100%"
              layout="fill"
              relative={true}
              alt="asd"
            />
            <FlexDiv
              cstyle={`
              position: absolute;
              bottom: 10px;
              right: 10px;
            `}
            >
              <Button
                danger
                shape="circle"
                onClick={() =>
                  setImageFile({ file: null, prev: null, validate: false })
                }
              >
                <DeleteOutlined />
              </Button>
            </FlexDiv>
          </>
        ) : (
          <Text as="h2">{title}</Text>
        )}
      </StyledUploadImage>
    </StyledUploadComponent>
  );
}

function ProductPageContent({ id = null }) {
  console.log("id :>> ", id);
  const [form] = Form.useForm();
  const router = useRouter();

  const locale = router.locale;

  let reqUrl;
  if (id) {
    reqUrl =
      process.env.NEXT_PUBLIC_HOST +
      process.env.NEXT_PUBLIC_UPDATE_PRODUCT_WITH_DESCRIPTION;
  } else {
    reqUrl =
      process.env.NEXT_PUBLIC_HOST +
      process.env.NEXT_PUBLIC_ADD_NEW_PRODUCT_WITH_DESCRIPTION;
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
  const [videoFile, setVideoFile] = useState({
    prev: null,
    file: null,
    validate: false,
  });
  const [image1, setImage1] = useState({
    prev: null,
    file: null,
    ready: null,
    validate: false,
  });
  const [image2, setImage2] = useState({
    prev: null,
    file: null,
    ready: null,
    validate: false,
  });
  const [image3, setImage3] = useState({
    prev: null,
    file: null,
    ready: null,
    validate: false,
  });
  const [productImage, setProductImage] = useState({
    prev: null,
    file: null,
    ready: null,
    validate: false,
  });

  const InputSuffix = ({ lineIndex, valueIndex }) => {
    return (
      <Space>
        {adjects[lineIndex].values.length !== 1 && (
          <a
            href="#d"
            onClick={(e) =>
              removeValueFromLineHandler(e, lineIndex, valueIndex)
            }
            style={{ color: "red" }}
          >
            <MinusCircleFilled color="red" />
          </a>
        )}

        {valueIndex + 1 === adjects[lineIndex].values.length && (
          <a
            href="#d"
            onClick={(e) => addNewValueToLineHandler(e, lineIndex, valueIndex)}
            style={{ color: "green" }}
          >
            <PlusCircleFilled color="green" />
          </a>
        )}
      </Space>
    );
  };

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // const onPreview = async (file) => {
  //   let src = file.url;
  //   if (!src) {
  //     src = await new Promise((resolve) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file.originFileObj);
  //       reader.onload = () => resolve(reader.result);
  //     });
  //   }
  //   const image = new Image();
  //   // image.src = src;
  //   const { src: imgSrc } = image;
  //   imgSrc = src
  //   const imgWindow = window.open(src);
  //   imgWindow?.document.write(image.outerHTML);
  // };

  // category list
  const [listCategory, setListCategory] = useState([]);

  // Description list
  const [listDescriptions, setListDescriptions] = useState([]);

  const [processing, setProcessing] = useState(false);
  const [prevModalVisible, setPrevModalVisible] = useState({
    visible: false,
    target: null,
    file: null,
    ready: null,
  });

  // lines state
  const [adjects, setAdjects] = useState([
    {
      adjen: "",
      adjtr: "",
      adjar: "",
      adjvalue: "",
      adjMenvalue: "",
      adjMtrvalue: "",
      adjMarvalue: "",
      type: 1,
      values: [""],
    },
  ]);

  console.log("adjects 11111", adjects);

  const [descriptions, setDescriptions] = useState([
    {
      id: "",
      type: 1,
      values: [1],
    },
  ]);

  // loadings
  const [loading, setLoading] = useState(null);
  const [loadings, setLoadings] = useState(null);
  const [formError, setFormError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // functions
  const handleFormFinish = useCallback(
    async (values) => {
      console.log("adjects 222222", adjects);
      // if (!cookies) message.warning("Please login to complete this operation");
      // setFormLoading(true);

      // const descriptionsSerialized = JSON.stringify(
      //   descriptions
      //     .filter((x) => x.id !== "")
      //     .map((x) => {
      //       return { DescriptionId: x.id, OptionsId: x.values, WebsiteId: "00000000-0000-0000-0000-000000000000" };
      //     })
      // );

      let formData = new FormData();

      values.categoriesIds?.map((item) =>
        formData.append("categoriesId", item?.split("/")[0])
      );

      const googleCategoryCodes = ["623"];

      const googleCodesFiltered = /* listCategory
        ?.filter((x) => values?.ModelID?.find((y) => y == x?.id))
        .map((z) => z?.googleCode) ??  */ googleCategoryCodes;

      console.log("googleCodesFiltered :>> ", googleCodesFiltered);

      formData.append("description_ar", values.Description_ar);
      formData.append("description_tr", values.Description_tr);
      formData.append("description_en", values.Description_en);
      formData.append("title_ar", values.Title_ar);
      formData.append("title_tr", values.Title_tr);
      formData.append("title_en", values.Title_en);
      formData.append("price", values.price);
      formData.append("serialNumber", "serialNumber");
      formData.append("primaryImage", primaryFile.file);
      formData.append("image1", image1.file);
      formData.append("image2", image2.file);
      formData.append("image3", image3.file);
      formData.append("productImage", productImage.file);
      formData.append("video", videoFile.file);
      formData.append("price", "10");
      formData.append("active", true);
      formData.append("user", "");

      if (values.additionalMetaTags1_tr) {
        formData.append(
          "additionalMetaTags1_tr",
          values.additionalMetaTags1_tr
        );
      }
      if (values.additionalMetaTags1_en) {
        formData.append(
          "additionalMetaTags1_en",
          values.additionalMetaTags1_en
        );
      }
      if (values.additionalMetaTags1_ar) {
        formData.append(
          "additionalMetaTags1_ar",
          values.additionalMetaTags1_ar
        );
      }

      if (values.additionalMetaTags2_tr) {
        formData.append(
          "additionalMetaTags2_tr",
          values.additionalMetaTags2_tr
        );
      }
      if (values.additionalMetaTags2_en) {
        formData.append(
          "additionalMetaTags2_en",
          values.additionalMetaTags2_en
        );
      }
      if (values.additionalMetaTags2_ar) {
        formData.append(
          "additionalMetaTags2_ar",
          values.additionalMetaTags2_ar
        );
      }

      if (values.additionalMetaTags3_tr) {
        formData.append(
          "additionalMetaTags3_tr",
          values.additionalMetaTags3_tr
        );
      }
      if (values.additionalMetaTags3_en) {
        formData.append(
          "additionalMetaTags3_en",
          values.additionalMetaTags3_en
        );
      }
      if (values.additionalMetaTags3_ar) {
        formData.append(
          "additionalMetaTags3_ar",
          values.additionalMetaTags3_ar
        );
      }

      if (values.additionalMetaTags4_tr) {
        formData.append(
          "additionalMetaTags4_tr",
          values.additionalMetaTags4_tr
        );
      }
      if (values.additionalMetaTags4_en) {
        formData.append(
          "additionalMetaTags4_en",
          values.additionalMetaTags4_en
        );
      }
      if (values.additionalMetaTags4_ar) {
        formData.append(
          "additionalMetaTags4_ar",
          values.additionalMetaTags4_ar
        );
      }

      formData.append("websiteId", "00000000-0000-0000-0000-000000000000");

      console.log("adjects 3333333:>> ", adjects);

      const newDescriptions = adjects.map((item, i) => {
        console.log("item  :>>>> ", item);
        return {
          Name_tr: item.adjtr,
          Name_ar: item.adjar,
          Name_en: item.adjen,
          values: item.values.map((lineValue, lineValueIndex) => {
            return {
              id: lineValueIndex + 1,
              adjValue: lineValue,
            };
          }),
        };
      });

      const newDescriptionsSerialized = JSON.stringify(newDescriptions);
      console.log("newDescriptions", newDescriptions);
      console.log("newDescriptionsSerialized", newDescriptionsSerialized);

      formData.append("Descriptions", newDescriptionsSerialized);

      // loop on object
      // adjects.map((item, i) => {
      //   formData.append("Descriptions", i + 1); // line flag
      //   formData.append("Name_tr", item.adjtr);
      //   formData.append("Name_ar", item.adjar);
      //   formData.append("Name_en", item.adjen);
      //   item.values.map((lineValue, lineValueIndex) => {
      //     formData.append("id", i + 1); // line value flag
      //     formData.append("adjValue", lineValue);
      //   });
      // });

      // formData.append("DescriptionsId", descriptionsSerialized);

      // start send data
      if (id) {
        formData.append("id", id);

        console.log("[...formData] :>> ", [...formData]);

        console.log("111111 :>> ", 111111);
        console.log("reqUrl :>> ", reqUrl);

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

        console.log("22222 :>> ", 22222);

        if (res.status === true) {
          const { data } = await axios.post("/api/edit-product", {
            data: {
              ...res.description,
              googleCodes: googleCodesFiltered ?? [],
              // adjects: adjects,
            },
          });
          if (data.status === true) {
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
            router.push("/products");
          } else {
            setFormError("Something went wrong! Please try again.");
          }
        }
      } else {
        console.log("222222 :>> ", 222222);
        console.log("reqUrl :>> ", reqUrl);
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
          // console.log("res.description lol:>> ", res.description);
          // const { data } = await axios.post("/api/add-product", {
          //   data: {
          //     ...res.description,
          //     googleCodes: googleCodesFiltered ?? [],
          //     // adjects: adjects,
          //   },
          // });
          // if (data.status === true) {
          //   message.success(
          //     t("common:messages.add", {
          //       name:
          //         router.locale === "ar"
          //           ? "منتج"
          //           : router.locale === "en"
          //           ? "product"
          //           : "ürün",
          //     })
          //   );
          // }
          router.push("/admin/products");
        } else {
          setFormError("Something went wrong! Please try again.");
        }
      }

      setFormLoading(false);
    },

    [
      descriptions,
      listCategory,
      primaryFile.file,
      image1.file,
      image2.file,
      image3.file,
      productImage.file,
      videoFile.file,
      id,
      reqUrl,
      t,
      router,
      adjects,
    ]
  );

  const getListCategory = useCallback(async () => {
    if (listCategory.length !== 0) return false;

    setLoadings("categoryList");
    const { data: res } = await axios.get(
      process.env.NEXT_PUBLIC_HOST + process.env.NEXT_PUBLIC_ALL_CATEGORIES,
      {
        headers: { websiteHostName: process.env.NEXT_PUBLIC_WEBSITE_HOST_NAME },
      }
    );

    setLoadings(null);

    if (res.status === true) {
      setListCategory(res.description);
    } else {
      message.error("Something went wrong! Please try again.");
    }
  }, [listCategory]);

  const getListDescriptions = useCallback(async () => {
    if (listDescriptions.length !== 0) return false;

    setLoadings("listDescriptions");
    const { data: res } = await axios.get(
      process.env.NEXT_PUBLIC_HOST +
        process.env.NEXT_PUBLIC_GET_ALL_DESCRIPTIONS,
      {
        headers: {
          websiteHostName: process.env.NEXT_PUBLIC_WEBSITE_HOST_NAME,
        },
      }
    );

    setLoadings(null);

    if (res.status === true) {
      setListDescriptions(res.description);
    } else {
      message.error("Something went wrong! Please try again.");
    }
  }, [listDescriptions]);

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

      console.log("checkedValues :>> ", checkedValues);

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
    [descriptions]
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

  // add new line
  const addNewLine = (i, type, event) => {
    event.preventDefault();
    // const validateLine = validateLineBeforeAdd(i, null, null, type);
    // if (validateLine) {
    setAdjects((prev) =>
      prev.concat([
        {
          adjen: "",
          adjtr: "",
          adjar: "",
          adjvalue: "",
          adjMenvalue: "",
          adjMarvalue: "",
          adjMtrvalue: "",
          type: type, // 1 => One Value - 2 => Multi Value
          values: [""],
        },
      ])
    );
    // } else {
    //   console.log("Will Not Added");
    // }
  };

  // add new value to line
  const addNewValueToLineHandler = (e, lineIndex, valueIndex) => {
    e.preventDefault();
    if (
      !adjects[lineIndex].values[valueIndex] ||
      !adjects[lineIndex].values[valueIndex].trim() === ""
    ) {
      message.warning("Please enter unfilled values before");
      return false;
    }
    setAdjects((prev) => {
      let newArr = prev;
      for (let i = 0; i < newArr.length; i++) {
        if (i !== lineIndex) continue;
        newArr[i].values.push("");
      }
      return [...newArr];
    });
  };

  // remove a value from line
  const removeValueFromLineHandler = (e, lineIndex, valueIndex) => {
    e.preventDefault();
    setAdjects((prev) => {
      let newArr = prev;
      for (let i = 0; i < newArr.length; i++) {
        if (i !== lineIndex) continue;
        newArr[i].values.splice(valueIndex, 1);
      }
      return [...newArr];
    });
  };

  // set line input values
  const handleLineInputValuesOnChange = (event, lineIndex, inputIndex) => {
    setAdjects((prev) => {
      let newArr = prev;
      newArr[lineIndex].values[inputIndex] = event.target.value;
      return [...newArr];
    });
  };

  // set input value
  const handleInputOnChange = (event, elementIndex, name) => {
    let lineItem = adjects.map((item, i) => {
      if (elementIndex !== i) return item;
      return { ...item, [name]: event.target.value };
    });
    setAdjects(lineItem);
  };

  // remove line
  const removeLine = (elementIndex) => {
    if (adjects.length === 1) {
      setAdjects((prev) => [
        { adjen: "", adjar: "", adjtr: "", adjvalue: "", type: 1 },
      ]);
      form.setFieldsValue({
        [`adjar_${0}`]: "",
        [`adjen_${0}`]: "",
        [`adjtr_${0}`]: "",
        [`adjvalue_${0}`]: "",
      });
    } else {
      setAdjects((prev) => {
        let newObj = prev;
        newObj = newObj.filter((item, i) => elementIndex !== i);
        return [...newObj];
      });
    }
  };
  // useEffects
  useEffect(() => {
    console.log("11111 :>> ", 11111);
    if (id) {
      const getAdDetails = async () => {
        setLoading(true);
        const reqUrl =
          process.env.NEXT_PUBLIC_HOST +
          process.env.NEXT_PUBLIC_GET_PRODUCT_WITH_DESCRIPTION;

        const { data: res } = await axios.post(
          reqUrl,
          { id },
          {
            headers: {
              websiteHostName: process.env.NEXT_PUBLIC_WEBSITE_HOST_NAME,
            },
          }
        );

        console.log("res.description.result :>> ", res);

        const myData = res.description.result;

        console.log("myData :>> ", myData);

        if (res.status === true) {
          await getListCategory();

          form.setFieldsValue({
            categoriesIds: [...myData.categoriesID],
            Title_tr: myData.title_tr,
            Title_en: myData.title_en,
            Title_ar: myData.title_ar,
            Description_ar: myData.description_ar,
            Description_en: myData.description_en,
            Description_tr: myData.description_tr,
            price: myData.price,

            additionalMetaTags1_tr:
              myData.additionalMetaTags1_tr == "null"
                ? ""
                : myData.additionalMetaTags1_tr,
            additionalMetaTags1_en:
              myData.additionalMetaTags1_en == "null"
                ? ""
                : myData.additionalMetaTags1_en,
            additionalMetaTags1_ar:
              myData.additionalMetaTags1_ar == "null"
                ? ""
                : myData.additionalMetaTags1_ar,

            additionalMetaTags2_tr:
              myData.additionalMetaTags2_tr == "null"
                ? ""
                : myData.additionalMetaTags2_tr,
            additionalMetaTags2_en:
              myData.additionalMetaTags2_en == "null"
                ? ""
                : myData.additionalMetaTags2_en,
            additionalMetaTags2_ar:
              myData.additionalMetaTags2_ar == "null"
                ? ""
                : myData.additionalMetaTags2_ar,

            additionalMetaTags3_tr:
              myData.additionalMetaTags3_tr == "null"
                ? ""
                : myData.additionalMetaTags3_tr,
            additionalMetaTags3_en:
              myData.additionalMetaTags3_en == "null"
                ? ""
                : myData.additionalMetaTags3_en,
            additionalMetaTags3_ar:
              myData.additionalMetaTags3_ar == "null"
                ? ""
                : myData.additionalMetaTags3_ar,

            additionalMetaTags4_tr:
              myData.additionalMetaTags4_tr == "null"
                ? ""
                : myData.additionalMetaTags4_tr,
            additionalMetaTags4_en:
              myData.additionalMetaTags4_en == "null"
                ? ""
                : myData.additionalMetaTags4_en,
            additionalMetaTags4_ar:
              myData.additionalMetaTags4_ar == "null"
                ? ""
                : myData.additionalMetaTags4_ar,
          });
          if (myData.video !== "{}") {
            setVideoFile({
              prev: process.env.NEXT_PUBLIC_HOST + myData.video,
              file: true,
              validate: false,
            });
          }
          if (myData.primaryImage !== "{}") {
            setPrimaryFile({
              prev: process.env.NEXT_PUBLIC_HOST + myData.primaryImage,
              file: true,
              validate: false,
            });
          }
          if (myData.image1 !== "{}") {
            setImage1({
              prev: process.env.NEXT_PUBLIC_HOST + myData.image1,
              file: true,
              validate: false,
            });
          }
          if (myData.image2 !== "{}") {
            setImage2({
              prev: process.env.NEXT_PUBLIC_HOST + myData.image2,
              file: true,
              validate: false,
            });
          }
          if (myData.image3 !== "{}") {
            setImage3({
              prev: process.env.NEXT_PUBLIC_HOST + myData.image3,
              file: true,
              validate: false,
            });
          }
          if (myData.productImage !== "{}") {
            setProductImage({
              prev: process.env.NEXT_PUBLIC_HOST + myData.productImage,
              file: true,
              validate: false,
            });
          }

          setAdjects((prev) => {
            console.log("adjects 444444 :>> ", adjects);
            console.log(
              "myData?.descriptions 444444 :>> ",
              myData?.descriptions
            );
            let newAdjects = [];
            if (myData?.descriptions?.length > 0) {
              myData?.descriptions.map((item) => {
                let __item = item;
                newAdjects.push({
                  adjen: __item.name_ar,
                  adjtr: __item.name_tr,
                  adjar: __item.name_en,
                  values:
                    __item.values.length === 0
                      ? [""]
                      : __item.values.map((lol) => lol.adjValue),
                });
                setAdjects([...newAdjects]);
              });
            } else {
              newAdjects.push({
                adjen: "",
                adjtr: "",
                adjar: "",
                values: [""],
              });
            }
            return [...newAdjects];
          });

          console.log("adjects 555555 :>> ", adjects);

          // descriptionsId

          // const myDescriptions = myData.descriptionsId?.map((x) => {
          //   const lolType = listDescriptions.find((y) => y.id === x.descriptionId)?.propertyDescType;

          //   return {
          //     id: x.descriptionId,
          //     type: lolType,
          //     values: x.optionsId.map((z) => Number(z)),
          //   };
          // });

          // setDescriptions(myDescriptions);
        } else {
          alert("Something went wrong! Please try again.");
        }
        setLoading(false);
      };
      getAdDetails();
    }
    // const getAdDetails2 = async () => {
    //   await getListDescriptions();
    // };
    // getAdDetails2();
  }, [id]);

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

  const image1Props = {
    // accept: "image/png, image/jpeg",
    showUploadList: false,
    disabled: image1.file ?? false,
    onRemove: (file) => {
      setImage1({ file: null, prev: null, validate: false });
    },
    beforeUpload: (file) => {
      if (file.size >= 1048576 * 5) {
        message.error("File size must be less than 1Mb");
        return false;
      }
      setImage1((prev) => {
        // validate image
        const validate = imageValidate(file);
        if (!validate) return prev;
        // set File
        let newObj = prev;
        newObj.file = file;
        newObj.prev = URL.createObjectURL(file);
        newObj.validate = false;
        return {
          ...newObj,
        };
      });
      setPrevModalVisible({
        visible: true,
        target: "image1",
        file: image1,
        ready: null,
      });
      return false;
    },
    image1,
  };
  const image2Props = {
    // accept: "image/png, image/jpeg",
    showUploadList: false,
    disabled: image2.file ?? false,
    onRemove: (file) => {
      setImage2({ file: null, prev: null, validate: false });
    },
    beforeUpload: (file) => {
      if (file.size >= 1048576 * 5) {
        message.error("File size must be less than 1Mb");
        return false;
      }
      setImage2((prev) => {
        // validate image
        const validate = imageValidate(file);
        if (!validate) return prev;
        // set File
        let newObj = prev;
        newObj.file = file;
        newObj.prev = URL.createObjectURL(file);
        newObj.validate = false;
        return {
          ...newObj,
        };
      });
      setPrevModalVisible({
        visible: true,
        target: "image2",
        file: image2,
        ready: null,
      });
      return false;
    },
    image2,
  };
  const image3Props = {
    // accept: "image/png, image/jpeg",
    showUploadList: false,
    disabled: image3.file ?? false,
    onRemove: (file) => {
      setImage3({ file: null, prev: null, validate: false });
    },
    beforeUpload: (file) => {
      if (file.size >= 1048576 * 5) {
        message.error("File size must be less than 1Mb");
        return false;
      }
      setImage3((prev) => {
        // validate image
        const validate = imageValidate(file);
        if (!validate) return prev;
        // set File
        let newObj = prev;
        newObj.file = file;
        newObj.prev = URL.createObjectURL(file);
        newObj.validate = false;
        return {
          ...newObj,
        };
      });
      setPrevModalVisible({
        visible: true,
        target: "image3",
        file: image3,
        ready: null,
      });
      return false;
    },
    image3,
  };

  const UploadFileCom = ({ text }) => (
    <div style={{ textAlign: "center" }}>
      <PlusOutlined />
      <div style={{ marginTop: 9 }}>{text}</div>
    </div>
  );

  (function () {
    adjects.map((item, i) => {
      let valuesObj = {};
      valuesObj[`adjar_${i}`] = item.adjar;
      valuesObj[`adjen_${i}`] = item.adjen;
      valuesObj[`adjtr_${i}`] = item.adjtr;
      item.values.map((itemValue, index) => {
        valuesObj[`line_${i}_value_${index}`] = itemValue;
      });
      form.setFieldsValue({
        ...valuesObj,
      });
      valuesObj = {};
    });
  })();

  return (
    <FormContainer>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormFinish}
        onValuesChange={(changedValue, allValues) => {
          // console.log("changedValue.categoriesIds :>> ", changedValue.categoriesIds);

          //  still to be debugged to auto select parent category
          // changedValue.categoriesIds.forEach( x => {
          //   console.log('x :>> ', x);

          //   const myCat = listCategory.find( y => y.id === x )

          //   const alreadyCat = changedValue.categoriesIds.find( z => z == myCat.parentId)

          //   // console.log('myCat :>> ', myCat);
          //   console.log('alreadyCat :>> ', alreadyCat);
          //   console.log('myCat.id :>> ', myCat.id);
          //   console.log('myCat.parentId :>> ', myCat.parentId);

          //   if (alreadyCat == undefined) {
          //     console.log('11111 :>> ', 11111);
          //     if (myCat.parentId) {
          //       console.log('22222 :>> ', 22222);
          //       console.log('myCat.id :>> ', myCat.id);
          //       console.log('myCat.parentId :>> ', myCat.parentId);
          //       form.setFieldValue({ categoriesIds: [...changedValue.categoriesIds, myCat.parentId] })
          //       // form.setFieldsValue({ categoriesIds: [myCat.parentId] })
          //     }
          //   }

          // })

          let keyname;
          let keys = Object.keys(changedValue).some(function (key) {
            keyname = key;
            return /adj/.test(key);
          });
          if (keys) {
            for (let i = 0; i < adjects.length; i++) {
              validateLineBeforeAdd(i, true, keyname);
            }
          }
        }}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              name="categoriesIds"
              label={t("common:form.labels.category")}
              rules={[
                {
                  required: true,
                  message: t("common:form.validation.required.message", {
                    name: t("common:form.labels.category"),
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
                placeholder={t("common:form.labels.category")}
                optionFilterProp="children"
                onChange={(value) => {
                  console.log("on change " + value);
                }}
                onFocus={getListCategory}
                loading={loadings === "categoryList"}
                mode="multiple"
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
          </Col>

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
              <Row
                gutter={24}
                style={{ justifyContent: "center", width: "100%" }}
              >
                {/* <Col>
                  <Tooltip title={t("addad:tooltips.video")}>
                    <UploadSmall
                      // className={`${style.small_upload} ${
                      //   videoFile.validate !== false ? style.err : ""
                      // } ${videoFile.file ? style.no_br : ""}`}
                      {...videoProps}
                    >
                      {videoFile.file ? (
                        <div>
                          <video 
                            poster={videoFile.prev}
                            controls={true} 
                            autoPlay={false} 
                            muted={false} 
                            style={{ width: '500px', height: '500px' }}
                            preload="metadata"
                            >
                              <source src={`${videoFile.prev}#t=0.5`} />
                          </video>
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
                        </div>
                      ) : (
                        <>
                          {videoFile.validate === false ? (
                            <UploadFileCom text={t("addad:tooltips.v_title")} />
                          ) : (
                            <span>{videoFile.validate}</span>
                          )}
                        </>
                      )}
                    </UploadSmall>
                  </Tooltip>
                </Col> */}
                <Col>
                  <Tooltip title={t("addad:tooltips.photo_1")}>
                    <UploadSmall
                      // className={`${style.small_upload} ${
                      //   image1.file ? style.no_br : ""
                      // } ${image1.validate !== false ? style.err : ""}`}
                      {...image1Props}
                      listType="picture"
                      maxCount={1}
                    >
                      {image1.file ? (
                        <div>
                          <Image
                            alt="ad image 1"
                            layout="fill"
                            objectFit="contain"
                            src={image1?.ready ? image1?.ready : image1.prev}
                          />
                          <RemoveButtonLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setImage1({
                                file: null,
                                prev: null,
                                ready: null,
                                validate: false,
                              });
                            }}
                          >
                            <DeleteOutlined />
                          </RemoveButtonLink>

                          {processing === "image1" && (
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
                        </div>
                      ) : (
                        <>
                          {image1.validate === false ? (
                            <UploadFileCom text={t("addad:tooltips.title_1")} />
                          ) : (
                            <div>{image1.validate}</div>
                          )}
                        </>
                      )}
                    </UploadSmall>
                  </Tooltip>
                </Col>
                <Col>
                  <Tooltip title={t("addad:tooltips.photo_1")}>
                    <UploadSmall
                      // className={`${style.small_upload} ${
                      //   image2.file ? style.no_br : ""
                      // } ${image2.validate !== false ? style.err : ""}`}
                      {...image2Props}
                    >
                      {image2.file ? (
                        <div>
                          <Image
                            alt="ad image 2"
                            layout="fill"
                            objectFit="contain"
                            src={image2.ready ? image2.ready : image2.prev}
                          />
                          <RemoveButtonLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setImage2({
                                file: null,
                                prev: null,
                                ready: null,
                                validate: false,
                              });
                            }}
                          >
                            <DeleteOutlined />
                          </RemoveButtonLink>
                          {processing === "image2" && (
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
                        </div>
                      ) : (
                        <>
                          {image2.validate === false ? (
                            <UploadFileCom text={t("addad:tooltips.title_2")} />
                          ) : (
                            <div>{image2.validate}</div>
                          )}
                        </>
                      )}
                    </UploadSmall>
                  </Tooltip>
                </Col>
                <Col>
                  <Tooltip title={t("addad:tooltips.photo_2")}>
                    <UploadSmall {...image3Props}>
                      {image3.file ? (
                        <div>
                          <Image
                            alt="ad image 3"
                            layout="fill"
                            objectFit="contain"
                            src={image3.ready ? image3.ready : image3.prev}
                          />
                          <RemoveButtonLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setImage3({
                                file: null,
                                prev: null,
                                ready: null,
                                validate: false,
                              });
                            }}
                          >
                            <DeleteOutlined />
                          </RemoveButtonLink>
                          {processing === "image3" && (
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
                        </div>
                      ) : (
                        <>
                          {image3.validate === false ? (
                            <UploadFileCom text={t("addad:tooltips.title_3")} />
                          ) : (
                            <div>{image3.validate}</div>
                          )}
                        </>
                      )}
                    </UploadSmall>
                  </Tooltip>
                </Col>
                {/* <Col>
                  <Tooltip title={t("addad:tooltips.photo_2")}>
                    <Upload
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture"
                      fileList={fileList}
                      onChange={onChange}
                      // onPreview={onPreview}
                    >
                      {fileList.length < 5 && "+ Upload"}
                    </Upload>
                  </Tooltip>
                </Col> */}
                {/* <Col>
                  <Tooltip title={t("addad:tooltips.photo_4")}>
                    <UploadSmall {...productFile}>
                      {productImage.file ? (
                        <div>
                          <Image
                            alt="ad image 4"
                            layout="fill"
                            objectFit="contain"
                            src={
                              productImage.ready
                                ? productImage.ready
                                : productImage.prev
                            }
                          />
                          <RemoveButtonLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setProductImage({
                                file: null,
                                prev: null,
                                ready: null,
                                validate: false,
                              });
                            }}
                          >
                            <DeleteOutlined />
                          </RemoveButtonLink>
                          {processing === "productImage" && (
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
                        </div>
                      ) : (
                        <>
                          {productImage.validate === false ? (
                            <UploadFileCom text={t("addad:tooltips.title_4")} />
                          ) : (
                            <span>{productImage.validate}</span>
                          )}
                        </>
                      )}
                    </UploadSmall>
                  </Tooltip>
                </Col> */}
              </Row>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  name="Title_tr"
                  label={t("addad:productTr")}
                  rules={[
                    {
                      // required: router.locale === "tr",
                      required: true,
                      message: t("common:form.validation.required.message", {
                        name: t("addad:tooltips.productTr"),
                      }),
                    },
                  ]}
                  tooltip={t("addad:productTr")}
                >
                  <Input placeholder={t("addad:tooltips.productTr")} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="Title_ar"
                  tooltip={t("addad:tooltips.productAr")}
                  label={t("addad:productAr")}
                  rules={[
                    {
                      // required: router.locale === "ar",
                      required: false,
                      message: t("common:form.validation.required.message", {
                        name: t("addad:tooltips.productAr"),
                      }),
                    },
                  ]}
                >
                  <Input placeholder={t("addad:productAr")} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="Title_en"
                  label={t("addad:productEn")}
                  tooltip={t("addad:tooltips.productEn")}
                  rules={[
                    {
                      // required: router.locale === "en",
                      required: false,
                      message: t("common:form.validation.required.message", {
                        name: t("addad:tooltips.productEn"),
                      }),
                    },
                  ]}
                >
                  <Input placeholder={t("addad:productEn")} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={t("addad:dsecTr")}
                  name="Description_tr"
                  tooltip={t("addad:tooltips.dsecTr")}
                  rules={[
                    {
                      // required: router.locale === "tr",
                      required: true,
                      message: t("common:form.validation.required.message", {
                        name: t("addad:tooltips.dsecTr"),
                      }),
                    },
                  ]}
                >
                  <Input placeholder={t("addad:dsecTr")} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={t("addad:dsecAr")}
                  tooltip={t("addad:tooltips.dsecAr")}
                  name="Description_ar"
                  rules={[
                    {
                      // required: router.locale === "ar",
                      required: false,
                      message: t("common:form.validation.required.message", {
                        name: t("addad:tooltips.dsecAr"),
                      }),
                    },
                  ]}
                >
                  <Input placeholder={t("addad:dsecAr")} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={t("addad:dsecEn")}
                  tooltip={t("addad:tooltips.dsecEn")}
                  name="Description_en"
                  rules={[
                    {
                      // required: router.locale === "en",
                      required: false,
                      message: t("common:form.validation.required.message", {
                        name: t("addad:tooltips.dsecEn"),
                      }),
                    },
                  ]}
                >
                  <Input placeholder={t("addad:dsecEn")} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label={t("addad:price")}
                  tooltip={t("addad:price")}
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: t("common:form.validation.required.message", {
                        name: t("addad:price"),
                      }),
                    },
                  ]}
                >
                  <Input placeholder={t("addad:price")} />
                </Form.Item>
              </Col>

              <>
                <Col span={8}>
                  <Form.Item
                    name="additionalMetaTags1_tr"
                    label={t("addad:additionalMetaTags1_tr")}
                    rules={[
                      {
                        required: false,
                        message: t("common:form.validation.required.message", {
                          name: t("addad:additionalMetaTags1_tr"),
                        }),
                      },
                    ]}
                    tooltip={t("addad:additionalMetaTags1_tr")}
                  >
                    <Input
                      maxLength={40}
                      placeholder={t("addad:additionalMetaTags1_tr")}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="additionalMetaTags1_ar"
                    tooltip={t("addad:additionalMetaTags1_ar")}
                    label={t("addad:additionalMetaTags1_ar")}
                    rules={[
                      {
                        required: false,
                        message: t("common:form.validation.required.message", {
                          name: t("addad:additionalMetaTags1_ar"),
                        }),
                      },
                    ]}
                  >
                    <Input placeholder={t("addad:additionalMetaTags1_ar")} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="additionalMetaTags1_en"
                    label={t("addad:additionalMetaTags1_en")}
                    tooltip={t("addad:additionalMetaTags1_en")}
                    rules={[
                      {
                        required: false,
                        message: t("common:form.validation.required.message", {
                          name: t("addad:additionalMetaTags1_en"),
                        }),
                      },
                    ]}
                  >
                    <Input placeholder={t("addad:additionalMetaTags1_en")} />
                  </Form.Item>
                </Col>
              </>

              <>
                <Col span={8}>
                  <Form.Item
                    name="additionalMetaTags2_tr"
                    label={t("addad:additionalMetaTags2_tr")}
                    rules={[
                      {
                        required: false,
                        message: t("common:form.validation.required.message", {
                          name: t("addad:additionalMetaTags2_tr"),
                        }),
                      },
                    ]}
                    tooltip={t("addad:additionalMetaTags2_tr")}
                  >
                    <Input
                      maxLength={40}
                      placeholder={t("addad:additionalMetaTags2_tr")}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="additionalMetaTags2_ar"
                    tooltip={t("addad:additionalMetaTags2_ar")}
                    label={t("addad:additionalMetaTags2_ar")}
                    rules={[
                      {
                        required: false,
                        message: t("common:form.validation.required.message", {
                          name: t("addad:additionalMetaTags2_ar"),
                        }),
                      },
                    ]}
                  >
                    <Input placeholder={t("addad:additionalMetaTags2_ar")} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="additionalMetaTags2_en"
                    label={t("addad:additionalMetaTags2_en")}
                    tooltip={t("addad:additionalMetaTags2_en")}
                    rules={[
                      {
                        required: false,
                        message: t("common:form.validation.required.message", {
                          name: t("addad:additionalMetaTags2_en"),
                        }),
                      },
                    ]}
                  >
                    <Input placeholder={t("addad:additionalMetaTags2_en")} />
                  </Form.Item>
                </Col>
              </>

              <>
                <Col span={8}>
                  <Form.Item
                    name="additionalMetaTags3_tr"
                    label={t("addad:additionalMetaTags3_tr")}
                    rules={[
                      {
                        required: false,
                        message: t("common:form.validation.required.message", {
                          name: t("addad:additionalMetaTags3_tr"),
                        }),
                      },
                    ]}
                    tooltip={t("addad:additionalMetaTags3_tr")}
                  >
                    <Input
                      maxLength={40}
                      placeholder={t("addad:additionalMetaTags3_tr")}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="additionalMetaTags3_ar"
                    tooltip={t("addad:additionalMetaTags3_ar")}
                    label={t("addad:additionalMetaTags3_ar")}
                    rules={[
                      {
                        required: false,
                        message: t("common:form.validation.required.message", {
                          name: t("addad:additionalMetaTags3_ar"),
                        }),
                      },
                    ]}
                  >
                    <Input placeholder={t("addad:additionalMetaTags3_ar")} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="additionalMetaTags3_en"
                    label={t("addad:additionalMetaTags3_en")}
                    tooltip={t("addad:additionalMetaTags3_en")}
                    rules={[
                      {
                        required: false,
                        message: t("common:form.validation.required.message", {
                          name: t("addad:additionalMetaTags3_en"),
                        }),
                      },
                    ]}
                  >
                    <Input placeholder={t("addad:additionalMetaTags3_en")} />
                  </Form.Item>
                </Col>
              </>

              <>
                <Col span={8}>
                  <Form.Item
                    name="additionalMetaTags4_tr"
                    label={t("addad:additionalMetaTags4_tr")}
                    rules={[
                      {
                        required: false,
                        message: t("common:form.validation.required.message", {
                          name: t("addad:additionalMetaTags4_tr"),
                        }),
                      },
                    ]}
                    tooltip={t("addad:additionalMetaTags4_tr")}
                  >
                    <Input
                      maxLength={40}
                      placeholder={t("addad:additionalMetaTags4_tr")}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="additionalMetaTags4_ar"
                    tooltip={t("addad:additionalMetaTags4_ar")}
                    label={t("addad:additionalMetaTags4_ar")}
                    rules={[
                      {
                        required: false,
                        message: t("common:form.validation.required.message", {
                          name: t("addad:additionalMetaTags4_ar"),
                        }),
                      },
                    ]}
                  >
                    <Input placeholder={t("addad:additionalMetaTags4_ar")} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="additionalMetaTags4_en"
                    label={t("addad:additionalMetaTags4_en")}
                    tooltip={t("addad:additionalMetaTags4_en")}
                    rules={[
                      {
                        required: false,
                        message: t("common:form.validation.required.message", {
                          name: t("addad:additionalMetaTags4_en"),
                        }),
                      },
                    ]}
                  >
                    <Input placeholder={t("addad:additionalMetaTags4_en")} />
                  </Form.Item>
                </Col>
              </>
            </Row>
          </Col>
          {/* <Col span={24}>
            <h2>{t("addad:descriptions")}</h2>
            {listDescriptions.map((item, i) => {
              return (
                <Row gutter={24} key={i}>
                  <Col xs={24} sm={21} md={22}>
                    <Row gutter={24}>
                      <Col xs={12} sm={12} md={6}>
                        {item[`name_${locale}`]}
                      </Col>

                      <div style={{ margin: 4, flexDirection: "column" }}>
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
                          />
                        )}

                        {item.propertyDescType === 1 && (
                          <Select
                            style={{ minWidth: 80 }}
                            placeholder={item[`name_${locale}`]}
                            optionFilterProp="children"
                            onChange={(e) => onChangeSelectMulti({ value: e, id: item.id })}
                            mode="multiple"
                            defaultValue={descriptions?.find((x) => x.id === item.id)?.values}
                            value={descriptions?.find((x) => x.id === item.id)?.values}
                            options={item.arrayPropertyValue.map((x) => {
                              return { label: x[`name_${locale}`], value: x.id };
                            })}
                          />
                        )}

                        {item.propertyDescType === 2 && (
                          <div>
                            <Radio.Group
                              style={{
                                width: "100%",
                              }}
                              onChange={(e) => onCheckRadio({ checkedValues: e.target.value, id: item.id })}
                              defaultValue={descriptions?.find((x) => x.id === item.id)?.values?.[0]}
                              value={descriptions?.find((x) => x.id === item.id)?.values?.[0]}
                              options={item.arrayPropertyValue.map((x) => {
                                return { label: x[`name_${locale}`], value: x.id };
                              })}
                            ></Radio.Group>
                          </div>
                        )}

                        {item.propertyDescType === 3 && (
                          <div>
                            <Checkbox.Group
                              style={{
                                width: "100%",
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
                              type="number"
                              onChange={(e) => onChangeInput({ checkedValues: e.target.value, id: item.id })}
                              value={descriptions?.find((x) => x.id === item.id)?.values?.[0]}
                              style={{
                                backgroundColor: "#eee",
                                borderColor: "#3562ED",
                                borderWidth: "1px",
                                borderRadius: 2,
                              }}
                            ></input>
                          </div>
                        )}
                      </div>
                    </Row>
                  </Col>
                </Row>
              );
            })}
          </Col> */}

          <Col span={24}>
            <h2>{t("addad:sections.adjects")}</h2>
            {adjects.map((item, i) => (
              <Row gutter={24} key={i}>
                <Col xs={24} sm={21} md={22}>
                  <Row gutter={24}>
                    <Col xs={12} sm={12} md={6}>
                      <Form.Item
                        label={t("addad:adjTr")}
                        name={"adjtr_" + i}
                        initialValue={item.adjtr}
                      >
                        <Input
                          onChange={(e) => handleInputOnChange(e, i, "adjtr")}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={6}>
                      <Form.Item
                        label={t("addad:adjAr")}
                        name={"adjar_" + i}
                        initialValue={item.adjar}
                      >
                        <Input
                          onChange={(e) => handleInputOnChange(e, i, "adjar")}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={6}>
                      <Form.Item
                        label={t("addad:adjEn")}
                        name={"adjen_" + i}
                        initialValue={item.adjen}
                      >
                        <Input
                          onChange={(e) => handleInputOnChange(e, i, "adjen")}
                        />
                      </Form.Item>
                    </Col>
                    {item?.values?.map((itemValue, indexValue) => {
                      return (
                        <Col xs={12} sm={12} md={6} key={indexValue}>
                          <Form.Item
                            label={t("addad:value")}
                            name={"line_" + i + "_value_" + indexValue}
                            initialValue={itemValue}
                          >
                            <Input
                              onChange={(e) =>
                                handleLineInputValuesOnChange(e, i, indexValue)
                              }
                              suffix={
                                <InputSuffix
                                  lineIndex={i}
                                  valueIndex={indexValue}
                                />
                              }
                            />
                          </Form.Item>
                        </Col>
                      );
                    })}
                  </Row>
                </Col>
                <Col
                  xs={24}
                  sm={3}
                  md={2}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Space>
                    <Tooltip
                      title={t("common:form.remove", {
                        name:
                          router.locale === "ar"
                            ? "سطر"
                            : router.locale === "en"
                            ? "Line"
                            : "Satırı",
                      })}
                      placement="top"
                    >
                      <RoundedLink
                        type="danger"
                        onClick={(e) => {
                          e.preventDefault();
                          removeLine(i);
                        }}
                        className="bg-red-500"
                      >
                        <MinusOutlined />
                      </RoundedLink>
                    </Tooltip>
                    {i + 1 === adjects.length && (
                      <Tooltip
                        title={t("common:form.new", {
                          name:
                            router.locale === "ar"
                              ? "سطر"
                              : router.locale === "en"
                              ? "Line"
                              : "Satır",
                        })}
                        placement="top"
                      >
                        <RoundedLink
                          className="bg-green-500"
                          type="success"
                          onClick={(e) => addNewLine(i, 2, e)}
                        >
                          <PlusOutlined />
                        </RoundedLink>
                      </Tooltip>
                    )}
                  </Space>
                  {/* <Space>
                      <a
                        className="danger_link_bg link_rounded"
                        onClick={(e) => {
                          e.preventDefault();
                          removeLine(i);
                        }}
                      >
                        <MinusOutlined />
                      </a>
                      {i + 1 === adjects.length && (
                        <Dropdown
                          overlay={
                            <Menu>
                              <Menu.Item
                                key="1"
                                onClick={() => addNewLine(i, 2)}
                              >
                                {t("dash.forms.ad.adjective.drop.multi")}
                              </Menu.Item>
                              <Menu.Item
                                key="2"
                                onClick={() => addNewLine(i, 1)}
                              >
                                {t("dash.forms.ad.adjective.drop.one")}
                              </Menu.Item>
                            </Menu>
                          }
                          trigger={["click"]}
                        >
                          <a
                            // className="ant-dorpdown-link"
                            className="danger_link_bg link_rounded"
                            style={{ backgroundColor: "green" }}
                            onClick={(e) => e.preventDefault()}
                          >
                            <PlusOutlined />
                          </a>
                        </Dropdown>
                      )}
                    </Space> */}
                </Col>

                {/* {item.type === 1 ? (
                    <Col xs={24} sm={24} md={5} lg={5}>
                      <Form.Item
                        label={t("dash.forms.ad.adjective.value")}
                        name={"adjvalue_" + i}
                        initialValue={item.adjvalue}
                      >
                        <Input
                          onChange={(e) =>
                            handleInputOnChange(e, i, "adjvalue")
                          }
                        />
                      </Form.Item>
                    </Col>
                  ) : (
                    <>
                      <Col xs={24} sm={24} md={5} lg={5}>
                        <Form.Item
                          label={t("dash.forms.ad.adjective.value1")}
                          name={"adjMenvalue_" + i}
                          initialValue={item.adjvalue}
                        >
                          <Input
                            onChange={(e) =>
                              handleInputOnChange(e, i, "adjMenvalue")
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={5} lg={5}>
                        <Form.Item
                          label={t("dash.forms.ad.adjective.value2")}
                          name={"adjMtrvalue_" + i}
                          initialValue={item.adjvalue}
                        >
                          <Input
                            onChange={(e) =>
                              handleInputOnChange(e, i, "adjMtrvalue")
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={5} lg={5}>
                        <Form.Item
                          label={t("dash.forms.ad.adjective.value3")}
                          name={"adjMarvalue_" + i}
                          initialValue={item.adjvalue}
                        >
                          <Input
                            onChange={(e) =>
                              handleInputOnChange(e, i, "adjMarvalue")
                            }
                          />
                        </Form.Item>
                      </Col>
                    </>
                  )} */}
              </Row>
            ))}
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

export default ProductPageContent;
