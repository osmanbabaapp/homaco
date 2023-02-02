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
import Text from "../..//utils/text";
import Link from "next/link";

import {
  axiosInstance,
  httpsAgent,
  configHeader,
} from "../../../helpers/constants";

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
      process.env.NEXT_PUBLIC_HOST + process.env.NEXT_PUBLIC_ALL_CLIENTS;
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
        title: t("clients.areYouSure"),
        icon: <ExclamationCircleFilled />,
        content: t("clients.areYouSureToPermanentlyDeleteThisCategory"),
        // content: "Are you sure about deleting this ad ?",
        okText: t("clients.yes"),
        cancelText: t("clients.cancel"),
        okButtonProps: {
          type: "dashed",
        },
        cancelButtonProps: {
          type: "primary",
          danger: true,
        },

        onOk: async () => {
          const { data: res } = await axiosInstance.post(
            process.env.NEXT_PUBLIC_HOST +
              process.env.NEXT_PUBLIC_DELETE_CLIENT,
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
            message.success(t("clients.theCategoryHasBeenDeletedSuccessfully"));
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
      title: t("clients.categoryImage"),
      dataIndex: "image",
      key: "id",
      width: "200px",
      render: (data) => {
        console.log("data", data);
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
      title: t("clients.name"),
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
            <Tooltip placement="top" title={t("clients.editClient")}>
              <Link href={`/admin/clients/${data.id}`} passHref scroll={true}>
                <Button shape="circle">
                  <EditFilled />
                </Button>
              </Link>
            </Tooltip>
            <Tooltip placement="top" title={t("clients.deleteClient")}>
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
            <Text as="h1">{t("clients.categories")}</Text>
          </FlexDiv>
          <FlexDiv>
            <Link href="/admin/clients/client">
              <Button icon={<PlusOutlined />}>
                {t("clients.newCategory")}
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
