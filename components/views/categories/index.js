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
import FlexDiv from "components/utils/flex-div";
import Text from "components/utils/text";
import Link from "next/link";

import { axiosInstance, httpsAgent, configHeader } from "helpers/constants";

import { useState, useEffect, useCallback } from "react";
// components
// import DashPageHeader from "@/components/utils/dash-page-header";

import { ExclamationCircleFilled } from "@ant-design/icons";
import axios from "axios";
import useTranslation from "next-translate/useTranslation";

export default function CategoriesPageContent({ locale, cookies }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { t } = useTranslation("common");

  const getList = useCallback(async () => {
    const reqUrl =
      process.env.NEXT_PUBLIC_HOST + process.env.NEXT_PUBLIC_ALL_CATEGORIES;
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
      e.preventDefault();
      Modal.confirm({
        title: t("categories.areYouSure"),
        icon: <ExclamationCircleFilled />,
        content: t("categories.areYouSureToPermanentlyDeleteThisCategory"),
        // content: "Are you sure about deleting this ad ?",
        okText: t("categories.yes"),
        cancelText: t("categories.cancel"),
        cancelButtonProps: {
          type: "primary",
          danger: true,
        },

        onOk: async () => {
          const { data: res } = await axiosInstance.post(
            process.env.NEXT_PUBLIC_HOST +
              process.env.NEXT_PUBLIC_DELETE_CATEGORY,
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
              t("categories.theCategoryHasBeenDeletedSuccessfully")
            );
            getList();
          } else {
            message.error("Something went wrong! Please try again later");
          }
        },
      });
    },
    [getList, t]
  );

  useEffect(() => {
    getList();
  }, [getList]);

  const columns = [
    {
      title: t("categories.categoryImage"),
      dataIndex: "image",
      key: "id",
      width: "200px",
      render: (data) => {
        return (
          <Image
            src={process.env.NEXT_PUBLIC_HOST + data}
            alt="category image"
            width={200}
            height={200}
          />
        );
      },
    },
    {
      title: t("categories.name"),
      dataIndex: `name_${locale}`,
      width: "20%",
      key: "id",
    },

    {
      title: t("tables.columns.actions"),
      dataIndex: "",
      width: "20%",
      key: "x",
      render: (data) => {
        return (
          <Space key={data.id}>
            <Tooltip placement="top" title={t("actions.editCategory")}>
              <Link
                href={`/admin/categories/${data.id}`}
                passHref
                scroll={true}
              >
                <Button shape="circle">
                  <EditFilled />
                </Button>
              </Link>
            </Tooltip>
            <Tooltip placement="top" title={t("actions.deleteCategory")}>
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
            <Text as="h1">{t("categories.categories")}</Text>
          </FlexDiv>
          <FlexDiv>
            <Link href="/admin/categories/category">
              <Button type="dashed" icon={<PlusOutlined />}>
                {t("categories.newCategory")}
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
