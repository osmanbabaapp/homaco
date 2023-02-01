import { DeleteFilled, EditFilled, LockFilled, PlusOutlined, UnlockFilled } from "@ant-design/icons";
import { Button, Col, Image, Row, Space, Table, Tooltip, Modal, message } from "antd";
import FlexDiv from "components/utils/flex-div";
import Text from "components/utils/text";
import Link from "next/link";

import { axiosInstance, httpsAgent, configHeader } from "helpers/constants";

import { useState, useEffect, useCallback } from "react";
// components
// import DashPageHeader from "@/components/utils/dash-page-header";

import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import axios from "axios";
import useTranslation from "next-translate/useTranslation";
import { RiH1 } from "react-icons/ri";

export default function BannersPageContent({ locale, cookies }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { t } = useTranslation("common");

  const getList = useCallback(async () => {
    const reqUrl = process.env.NEXT_PUBLIC_HOST + process.env.NEXT_PUBLIC_ALL_BANNERS;
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

  const handleDeleteBanner = useCallback(
    async (e, id) => {
      console.log("id :>> ", id);
      e.preventDefault();
      Modal.confirm({
        title: locale === "ar" ? "هل أنت متأكد ؟" : locale === "en" ? "Are You Sure ?" : "Emin Misiniz ?",
        icon: <ExclamationCircleFilled />,
        content:
          locale === "ar"
            ? "هل أنت متأكد من حذف هذا البنر نهائيا ؟"
            : locale === "en"
            ? "Are you sure to permanently delete this banner ?"
            : "Bu ürün kalıcı olarak silmek istediğinizden emin misiniz ?",
        // content: "Are you sure about deleting this ad ?",
        okText: locale === "ar" ? "نعم" : locale === "en" ? "Yes" : "Evet",
        cancelText: locale === "ar" ? "الغاء" : locale === "en" ? "Cancel" : "İptal",
        cancelButtonProps: {
          type: "primary",
          danger: true,
        },

        onOk: async () => {
          const { data: res } = await axiosInstance.post(
            process.env.NEXT_PUBLIC_HOST + process.env.NEXT_PUBLIC_DELETE_BANNER,
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
                ? "تم حذف البنر بنجاح"
                : locale === "en"
                ? "The banner has been deleted successfully"
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

  useEffect(() => {
    getList();
  }, [getList]);

  const columns = [
    {
      title: "banner Type",
      dataIndex: "",
      key: "id",
      render: (data) => {
        if (data.typeBanner == 0) {
          return <h4>Image</h4>;
        } else {
          return <h4>Video</h4>;
        }
      },
    },
    {
      title: "banner Image",
      dataIndex: "",
      key: "id",
      render: (data) => {
        console.log("data :>> ", data);
        if (data.typeBanner == 0) {
          return (
            <Image
              src={process.env.NEXT_PUBLIC_HOST + "" + data.pathOfFile}
              alt="product image"
              width={200}
              height={200}
            />
          );
        } else {
          return (
            <video
              src={process.env.NEXT_PUBLIC_HOST + "" + data.pathOfFile}
              alt="product image"
              width={200}
              height={200}
            />
          );
        }
      },
    },
    {
      title: "Active Status",
      dataIndex: "activeStatus",
      key: "id",
      render: (data) => {
        if (data)
          return (
            <a href="#" style={{ width: "fit-content", display: "inline-block" }}>
              <FlexDiv direction="column" width="fit-content" alignItems="center" justifyContent="center" padding={10}>
                <Text>
                  <UnlockFilled />
                </Text>
                <Text>Active</Text>
              </FlexDiv>
            </a>
          );
        else
          return (
            <a href="#" style={{ width: "fit-content", display: "inline-block" }}>
              <FlexDiv direction="column" width="fit-content" alignItems="center" justifyContent="center" padding={10}>
                <Text>
                  <LockFilled />
                </Text>
                <Text>Passive</Text>
              </FlexDiv>
            </a>
          );
      },
    },
    {
      title: "File",
      dataIndex: "",
      key: "id",
      render: (data) => {
        return <h4>{"Uploads/Banners/" + data.pathOfFile}</h4>;
      },
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "id",
      render: (data) => {
        return (
          <Space>
            <Tooltip
              placement="top"
              title={t("actions.edit", {
                name: locale === "ar" ? "بنر" : locale === "en" ? "Banner" : "Ürün",
              })}
            >
              <Link href={`/banners/${data.id}`} passHref scroll={true}>
                  <Button shape="circle">
                    <EditFilled />
                  </Button>
              </Link>
            </Tooltip>
            <Tooltip placement="top" title="Delete">
              <a href="#">
                <Button shape="circle" onClick={(e) => handleDeleteBanner(e, data.id)} danger>
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
            <Text as="h1">Banners</Text>
          </FlexDiv>
          <FlexDiv>
            {/* <Button type="primary" icon={<PlusOutlined />}>
              New Banner
            </Button> */}
          </FlexDiv>
        </FlexDiv>
      </Col>
      <Col span={24}>
        <Table bordered rowKey="id" dataSource={list} columns={columns} />
      </Col>
    </Row>
  );
}
