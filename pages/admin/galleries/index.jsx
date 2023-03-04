import { DeleteFilled, PlusOutlined } from '@ant-design/icons'
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

import AdminLayout from '../../../layouts/admin-layout/admin-layout'

import { useState, useEffect, useCallback } from 'react'

import { ExclamationCircleFilled } from '@ant-design/icons'
import axios from 'axios'
import useTranslation from 'next-translate/useTranslation'
import { signOut, useSession } from 'next-auth/react'
import Head from 'next/head'

export default function GalleriesPage({ locale }) {
  const { data: cookies } = useSession()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { t } = useTranslation('common')

  const getList = useCallback(async () => {
    const reqUrl = process.env.NEXT_PUBLIC_HOST + 'api/gallery'

    setLoading(true)
    try {
      const { data: res, status } = await axios.get(reqUrl, {
        headers: {
          Authorization: `Bearer ${cookies?.user?.token}`,
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
      console.log(String(err))
      if (err?.response?.status === 401) {
        signOut({ callbackUrl: '/' })
      } else if (err?.response?.status === 500) {
        setError(
          err?.response?.data || 'Something went wrong! Please try again later.'
        )
      } else if (err?.response?.status === 400) {
        setError(
          err?.response?.data || 'Something went wrong! Please try again later.'
        )
      } else if (err?.response?.status === 404) {
        setError({ description: 'Wrong endpoint error' })
      }
    }
  }, [cookies, locale])

  const handleDeleteAd = useCallback(
    async (e, id) => {
      e.preventDefault()
      Modal.confirm({
        title: t('sureMessage'),
        icon: <ExclamationCircleFilled />,
        content: t('deleteMessage'),
        // content: "Are you sure about deleting this ad ?",
        okText: t('yes'),
        okButtonProps: { type: 'default' },
        cancelText: t('cancel'),
        cancelButtonProps: {
          type: 'primary',
          danger: true,
        },

        onOk: async () => {
          const { data: res, status } = await axios.delete(
            process.env.NEXT_PUBLIC_HOST + 'api/gallery',
            {
              headers: {
                Authorization: `Bearer ${cookies?.user?.token}`,
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
      title: t('video'),
      dataIndex: `video`,
      key: '_id',
      render: (data) => {
        if (!data) return `No Video`
        return (
          <>
            <video
              src={data}
              controls
              style={{ width: 200, height: 200 }}
            ></video>
          </>
        )
      },
    },
    {
      title: t('action'),
      dataIndex: '',
      width: 50,
      key: '_id',
      render: (data) => {
        return (
          <Space key={data.id}>
            <Tooltip placement="top" title={t('delete')}>
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
    <>
      <Head>
        <title>{'layout.gallery'}</title>
      </Head>
      <AdminLayout>
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
                <Text as="h1">{t('layout.gallery')}</Text>
              </FlexDiv>
              <FlexDiv>
                <Link href="/admin/galleries/gallery">
                  <Button type="dashed" icon={<PlusOutlined />}>
                    {t('new', {
                      name: t('layout.gallery'),
                    })}
                  </Button>
                </Link>
              </FlexDiv>
            </FlexDiv>
          </Col>
          <Col span={24}>
            <Table bordered rowKey="id" dataSource={list} columns={columns} />
          </Col>
        </Row>
      </AdminLayout>
    </>
  )
}
