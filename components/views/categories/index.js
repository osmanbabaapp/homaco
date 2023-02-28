import {
  DeleteFilled,
  EditFilled,
  LockFilled,
  PlusOutlined,
  UnlockFilled,
} from '@ant-design/icons'
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
  Alert,
} from 'antd'
import FlexDiv from 'components/utils/flex-div'
import Text from 'components/utils/text'
import Link from 'next/link'

import { axiosInstance, httpsAgent, configHeader } from 'helpers/constants'

import { useState, useEffect, useCallback } from 'react'
// components
// import DashPageHeader from "@/components/utils/dash-page-header";

import { ExclamationCircleFilled } from '@ant-design/icons'
import axios from 'axios'
import useTranslation from 'next-translate/useTranslation'

export default function CategoriesPageContent({ locale, cookies }) {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { t } = useTranslation('common')

  const getList = useCallback(async () => {
    const reqUrl = process.env.NEXT_PUBLIC_HOST + 'api/category'

    setLoading(true)
    try {
      const { data: res, status } = await axios.get(reqUrl, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
          lang: locale,
          website: process.env.NEXT_PUBLIC_WEBSITE,
        },
      })
      setLoading(false)

      if (status === 200) {
        setList(res?.description?.data)
      } else {
      }
    } catch (err) {
      setLoading(false)
      alert('Error')
    }
  }, [cookies, locale])

  const handleDeleteAd = useCallback(
    async (e, id) => {
      e.preventDefault()
      Modal.confirm({
        title: t('categories.areYouSure'),
        icon: <ExclamationCircleFilled />,
        content: t('categories.areYouSureToPermanentlyDeleteThisCategory'),
        // content: "Are you sure about deleting this ad ?",
        okText: t('categories.yes'),
        okButtonProps: { type: 'default' },
        cancelText: t('categories.cancel'),
        cancelButtonProps: {
          type: 'primary',
          danger: true,
        },

        onOk: async () => {
          const { data: res, status } = await axios.delete(
            process.env.NEXT_PUBLIC_HOST + 'api/category',
            {
              headers: {
                Authorization: `Bearer ${cookies?.token}`,
                lang: locale,
                website: process.env.NEXT_PUBLIC_WEBSITE,
              },
              data: { id },
            }
          )

          if (status === 200) {
            message.success('Item has been deleted successfully.')
            await getList()
          } else if (status === 204) {
            setError({
              header: 'No Content Found',
              description: 'Something went wrong! Please try again later.',
            })
          }
        },
      })
    },
    [getList, t]
  )

  useEffect(() => {
    getList()
  }, [getList])

  const columns = [
    {
      title: t('image'),
      dataIndex: 'image',
      key: '_id',
      width: 100,
      render: (data) => {
        return (
          <Image src={data} alt="category image" width={200} height={200} />
        )
      },
    },
    {
      title: t('name'),
      dataIndex: `title_${locale}`,
      key: '_id',
    },

    {
      title: t('tables.columns.actions'),
      dataIndex: '',
      width: 50,
      key: '_id',
      render: (data) => {
        return (
          <Space key={data.id}>
            <Tooltip placement="top" title={t('actions.editCategory')}>
              <Link
                href={`/admin/categories/${data?._id}`}
                passHref
                scroll={true}
              >
                <Button shape="circle">
                  <EditFilled />
                </Button>
              </Link>
            </Tooltip>
            <Tooltip placement="top" title={t('actions.deleteCategory')}>
              <a href="#">
                <Button
                  shape="circle"
                  onClick={(e) => handleDeleteAd(e, data?._id)}
                  danger
                >
                  <DeleteFilled />
                </Button>
              </a>
            </Tooltip>
          </Space>
        )
      },
    },
  ]

  return (
    <Row gutter={[24, 24]}>
      {error && (
        <Col span={24}>
          <Alert
            showIcon
            type="error"
            message={error?.header}
            description={error?.description}
          />
        </Col>
      )}
      <Col span={24}>
        <FlexDiv justifyContent="space-between" alignItems="center">
          <FlexDiv>
            <Text as="h1">{t('categories.categories')}</Text>
          </FlexDiv>
          <FlexDiv>
            <Link href="/admin/categories/category">
              <Button type="dashed" icon={<PlusOutlined />}>
                {t('categories.newCategory')}
              </Button>
            </Link>
          </FlexDiv>
        </FlexDiv>
      </Col>
      <Col span={24}>
        <Table bordered rowKey="id" dataSource={list} columns={columns} />
      </Col>
    </Row>
  )
}
