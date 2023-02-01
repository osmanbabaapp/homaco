import {
  DeleteFilled,
  EditFilled,
  LockFilled,
  PlusOutlined,
  UnlockFilled,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Image,
  Row,
  Space,
  Table,
  Tooltip,
  Modal,
  message,
} from "antd";
import FlexDiv from "../../utils/flex-div";
import Text from "../../utils/text";
import Link from "next/link";

import {
  axiosInstance,
  httpsAgent,
  configHeader,
} from "../../../helpers/constants";

import { useState, useEffect, useCallback } from "react";
// components
// import DashPageHeader from "@/components/utils/dash-page-header";

import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import axios from "axios";
import useTranslation from "next-translate/useTranslation";

export default function ProductsPageContent({ locale, cookies }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { t } = useTranslation("common");

  const getList = useCallback(async () => {
    const reqUrl =
      process.env.NEXT_PUBLIC_HOST + process.env.NEXT_PUBLIC_ALL_PRODUCTS;
    setLoading(true);
    const { data: res } = await axios.get(reqUrl, {
      headers: {
        Authorization: `Bearer ${cookies?.token}`,
        lang: locale,
        websiteHostName: process.env.NEXT_PUBLIC_WEBSITE_HOST_NAME,
      },
    });
    setLoading(false);
    if (res.status === true) {
      setList(res.description);
    } else {
      setError("Something went wrong! Please try again");
    }
  }, [cookies?.token, locale]);

  const handleDeleteAd = useCallback(
    async (e, id) => {
      console.log("id :>> ", id);
      e.preventDefault();
      Modal.confirm({
        title:
          locale === "ar"
            ? "هل أنت متأكد ؟"
            : locale === "en"
            ? "Are You Sure ?"
            : "Emin Misiniz ?",
        icon: <ExclamationCircleFilled />,
        content:
          locale === "ar"
            ? "هل أنت متأكد من حذف هذا منتج نهائيا ؟"
            : locale === "en"
            ? "Are you sure to permanently delete this product ?"
            : "Bu ürün kalıcı olarak silmek istediğinizden emin misiniz ?",
        // content: "Are you sure about deleting this ad ?",
        okText: locale === "ar" ? "نعم" : locale === "en" ? "Yes" : "Evet",
        cancelText:
          locale === "ar" ? "الغاء" : locale === "en" ? "Cancel" : "İptal",
        cancelButtonProps: {
          type: "dashed",
          danger: true,
        },
        okButtonProps: {
          type: "dashed",
          danger: false,
        },

        onOk: async () => {
          const { data: res } = await axiosInstance.post(
            process.env.NEXT_PUBLIC_HOST +
              process.env.NEXT_PUBLIC_DELETE_PRODUCT,
            {
              id,
            },
            // {
            //   headers: {
            //     Authorization: `Bearer ${cookies?.token}`,
            //   },
            // }
            { httpsAgent: httpsAgent },
            configHeader
          );

          if (res.status === true) {
            message.success(
              locale === "ar"
                ? "تم حذف الاعلان بنجاح"
                : locale === "en"
                ? "The ad has been deleted successfully"
                : "Reklam başarılı bir şekilde silindi"
            );
            getList();
          } else {
            message.error("Something went wrong! Please try again later");
          }
        },
      });
    },
    [getList, locale]
  );
  const toggleActivation = useCallback(
    async (e, id) => {
      e.preventDefault();
      Modal.confirm({
        title:
          locale === "ar"
            ? "هل أنت متأكد ؟"
            : locale === "en"
            ? "Are You Sure ?"
            : "Emin Misiniz ?",
        icon: <ExclamationCircleFilled />,
        content:
          locale === "ar"
            ? "هل أنت متأكد من تحديث هذا منتج نهائيا ؟"
            : locale === "en"
            ? "Are you sure to permanently update this product ?"
            : "Bu ürün kalıcı olarak Güncelleme istediğinizden emin misiniz ?",
        // content: "Are you sure about deleting this ad ?",
        okText: locale === "ar" ? "نعم" : locale === "en" ? "Yes" : "Evet",
        cancelText:
          locale === "ar" ? "الغاء" : locale === "en" ? "Cancel" : "İptal",
        cancelButtonProps: {
          type: "dashed",
          danger: true,
        },
        okButtonProps: {
          type: "dashed",
          danger: false,
        },

        onOk: async () => {
          const { data: res } = await axiosInstance.post(
            process.env.NEXT_PUBLIC_HOST +
              process.env.NEXT_PUBLIC_ACTIVE_UN_ACTIVE_PRODUCT,
            {
              id,
            },
            // {
            //   headers: {
            //     Authorization: `Bearer ${cookies?.token}`,
            //   },
            // }
            { httpsAgent: httpsAgent },
            configHeader
          );

          if (res.status === true) {
            message.success(
              locale === "ar"
                ? "تم محدث منتج بنجاح"
                : locale === "en"
                ? "The Product has been updated successfully"
                : "Ürün başarılı bir şekilde güncellenmiş"
            );
            getList();
          } else {
            message.error("Something went wrong! Please try again later");
          }
        },
      });
    },
    [getList, locale]
  );

  useEffect(() => {
    getList();
  }, [getList]);

  const columns = [
    {
      title: "Product Image",
      dataIndex: "primaryImage",
      key: "id",
      width: "200px",
      render: (data) => {
        return (
          <Image
            src={process.env.NEXT_PUBLIC_HOST + data}
            alt="product image"
            width={200}
            height={200}
          />
        );
      },
    },
    {
      title: "Title",
      dataIndex: `title_${locale}`,
      width: "20%",
      key: "id",
    },
    {
      title: "Description",
      dataIndex: `description_${locale}`.substring(0, 24),
      width: "15%",
      height: "60px",
      key: "id",
      render: (data) => {
        let stringItem = data;

        if (stringItem.length > 40) {
          stringItem = stringItem.substring(0, 40) + "...";
        }
        return <div>{stringItem}</div>;
      },
    },
    {
      title: "Active Status",
      dataIndex: "",
      key: "id",
      render: (data) => {
        if (data.active)
          return (
            <a
              href="#"
              style={{ width: "fit-content", display: "inline-block" }}
            >
              <Button
                shape="circle"
                onClick={(e) => toggleActivation(e, data.id)}
              >
                <FlexDiv
                  direction="column"
                  width="fit-content"
                  alignItems="center"
                  justifyContent="center"
                  padding={10}
                >
                  <div>
                    <UnlockFilled />
                  </div>
                  <Text>Active</Text>
                </FlexDiv>
              </Button>
            </a>
          );
        else
          return (
            <a
              href="#"
              style={{ width: "fit-content", display: "inline-block" }}
            >
              <Button
                shape="circle"
                onClick={(e) => toggleActivation(e, data.id)}
              >
                <FlexDiv
                  direction="column"
                  width="fit-content"
                  alignItems="center"
                  justifyContent="center"
                  padding={10}
                >
                  <div>
                    <LockFilled />
                  </div>
                  <Text>Passive</Text>
                </FlexDiv>
              </Button>
            </a>
          );
      },
    },

    {
      title: t("tables.columns.actions"),
      dataIndex: "",
      key: "x",
      render: (data) => {
        return (
          <Space key={data.id}>
            <Tooltip
              placement="top"
              title={t("actions.edit", {
                name:
                  locale === "ar"
                    ? "منتج"
                    : locale === "en"
                    ? "Product"
                    : "Ürün",
              })}
            >
              <Link href={`/admin/products/${data.id}`} passHref scroll={true}>
                <Button shape="circle">
                  <EditFilled />
                </Button>
              </Link>
            </Tooltip>
            <Tooltip
              placement="top"
              title={t("actions.delete", {
                name:
                  locale === "ar"
                    ? "منتج"
                    : locale === "en"
                    ? "Product"
                    : "Ürün",
              })}
            >
              <a href="#">
                <Button
                  shape="circle"
                  onClick={(e) => handleDeleteAd(e, data.id)}
                  danger
                >
                  <DeleteFilled />
                </Button>
              </a>
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <FlexDiv justifyContent="space-between" alignItems="center">
          <FlexDiv>
            <Text as="h1">Products</Text>
          </FlexDiv>
          <FlexDiv>
            <Link href="/admin/products/product">
              <Button type="dashed" icon={<PlusOutlined />}>
                New Product
              </Button>
            </Link>
          </FlexDiv>
        </FlexDiv>
      </Col>
      <Col span={24}>
        <Table bordered rowKey="id" dataSource={list} columns={columns} />
      </Col>
    </Row>
  );
}
