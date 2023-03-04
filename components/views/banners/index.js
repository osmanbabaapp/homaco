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

import { useState, useEffect, useCallback } from 'react'

import { ExclamationCircleFilled } from '@ant-design/icons'
import axios from 'axios'
import useTranslation from 'next-translate/useTranslation'

export default function BannersPageContent({ locale, cookies }) {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { t } = useTranslation('common')

  const getList = useCallback(async () => {
    const reqUrl = process.env.NEXT_PUBLIC_HOST + 'api/banner?take=100'
    setLoading(true)
    try {
      const { data: res, status } = await axios.get(reqUrl, {
        headers: {
          Authorization: `Bearer ${cookies.user?.token}`,
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

  const handleDeleteBanner = useCallback(
    async (e, id) => {
      console.log('id :>> ', id)
      e.preventDefault()
      Modal.confirm({
        title:
          locale === 'ar'
            ? 'هل أنت متأكد ؟'
            : locale === 'en'
            ? 'Are You Sure ?'
            : 'Emin Misiniz ?',
        icon: <ExclamationCircleFilled />,
        content:
          locale === 'ar'
            ? 'هل أنت متأكد من حذف هذا البانر نهائيا ؟'
            : locale === 'en'
            ? 'Are you sure to permanently delete this banner ?'
            : 'Bu Banner kalıcı olarak silmek istediğinizden emin misiniz ?',
        // content: "Are you sure about deleting this ad ?",
        okText: locale === 'ar' ? 'نعم' : locale === 'en' ? 'Yes' : 'Evet',
        cancelText:
          locale === 'ar' ? 'الغاء' : locale === 'en' ? 'Cancel' : 'İptal',
        cancelButtonProps: {
          type: 'dashed',
          danger: true,
        },
        okButtonProps: {
          type: 'dashed',
          danger: false,
        },

        onOk: async () => {
          try {
            const { data: res, status } = await axios.delete(
              process.env.NEXT_PUBLIC_HOST + 'api/banner',
              {
                data: {
                  id,
                },
                headers: {
                  Authorization: `Bearer ${cookies.user?.token}`,
                  website: process.env.NEXT_PUBLIC_WEBSITE,
                },
              }
            )

            if (status === 200) {
              message.success(
                locale === 'ar'
                  ? 'تم حذف البانر بنجاح'
                  : locale === 'en'
                  ? 'The Banner has been deleted successfully'
                  : 'Banner başarılı bir şekilde silindi'
              )
              getList()
            } else if (status === 204) {
              message.error(
                'Something went wrong! Please try again later. (204)'
              )
            }
          } catch (err) {
            if (err?.response?.status === 401) {
              // signOut({ callbackUrl: '/' })
            } else if (err?.response?.status === 500) {
              setError(
                err?.response?.data ||
                  'Something went wrong! Please try again later.'
              )
            } else if (err?.response?.status === 400) {
              setError(
                err?.response?.data ||
                  'Something went wrong! Please try again later.'
              )
            } else if (err?.response?.status === 404) {
              setError({ description: 'Wrong endpoint error' })
            }
          }
        },
      })
    },
    [getList, locale]
  )

  const toggleActivation = useCallback(
    async (e, id, active) => {
      e.preventDefault()
      Modal.confirm({
        title:
          locale === 'ar'
            ? 'هل أنت متأكد ؟'
            : locale === 'en'
            ? 'Are You Sure ?'
            : 'Emin Misiniz ?',
        icon: <ExclamationCircleFilled />,
        content:
          locale === 'ar'
            ? 'هل أنت متأكد من تحديث هذا منتج نهائيا ؟'
            : locale === 'en'
            ? 'Are you sure to permanently update this product ?'
            : 'Bu ürün kalıcı olarak Güncelleme istediğinizden emin misiniz ?',
        // content: "Are you sure about deleting this ad ?",
        okText: locale === 'ar' ? 'نعم' : locale === 'en' ? 'Yes' : 'Evet',
        cancelText:
          locale === 'ar' ? 'الغاء' : locale === 'en' ? 'Cancel' : 'İptal',
        cancelButtonProps: {
          type: 'dashed',
          danger: true,
        },
        okButtonProps: {
          type: 'dashed',
          danger: false,
        },

        onOk: async () => {
          try {
            const { data: res, status } = await axios.put(
              process.env.NEXT_PUBLIC_HOST + 'api/banner',
              {
                id,
                active: !active,
              },
              {
                headers: {
                  Authorization: `Bearer ${cookies.user?.token}`,
                  website: process.env.NEXT_PUBLIC_WEBSITE,
                },
              }
            )

            if (status === 200) {
              message.success(
                locale === 'ar'
                  ? 'تم تحديث منتج بنجاح'
                  : locale === 'en'
                  ? 'The Product has been updated successfully'
                  : 'Ürün başarılı bir şekilde güncellenmiş'
              )
              getList()
            } else if (status === 204) {
              message.error(
                'Something went wrong! Please try again later. (204)'
              )
            }
          } catch (err) {
            if (err?.response?.status === 401) {
              signOut({ callbackUrl: '/' })
            } else if (err?.response?.status === 500) {
              setError(
                err?.response?.data ||
                  'Something went wrong! Please try again later.'
              )
            } else if (err?.response?.status === 400) {
              setError(
                err?.response?.data ||
                  'Something went wrong! Please try again later.'
              )
            } else if (err?.response?.status === 404) {
              setError({ description: 'Wrong endpoint error' })
            }
          }
        },
      })
    },
    [getList, locale, cookies]
  )

  useEffect(() => {
    getList()
  }, [getList])

  const columns = [
    {
      title: t('image'),
      dataIndex: 'image',
      key: '_id',
      width: 200,
      render: (data, record) => {
        if (record?.file_type === 'video') {
          return (
            <video
              src={data}
              style={{
                width: '200px',
                height: '200px',
              }}
              controls
            ></video>
          )
        } else {
          return (
            <Image src={data} alt="product image" width={200} height={200} />
          )
        }
      },
    },
    {
      title: t('type'),
      dataIndex: 'file_type',
      key: '_id',
    },
    {
      title: t('actStatus'),
      dataIndex: '',
      key: 'id',
      render: (data) => {
        return (
          <a
            href="#"
            onClick={(e) => toggleActivation(e, data?._id, data.active)}
            style={{ width: 'fit-content', display: 'inline-block' }}
          >
            <FlexDiv
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              {data.active ? (
                <>
                  <FlexDiv
                    style={{ borderRadius: '50%', border: '1px solid #010101' }}
                    direction="column"
                    width={40}
                    height={40}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <div>
                      <UnlockFilled />
                    </div>
                  </FlexDiv>
                  <Text>{t('active')}</Text>
                </>
              ) : (
                <>
                  <FlexDiv
                    style={{ borderRadius: '50%', border: '1px solid #010101' }}
                    direction="column"
                    width={40}
                    height={40}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <div>
                      <LockFilled />
                    </div>
                  </FlexDiv>
                  <Text>{t('passive')}</Text>
                </>
              )}
            </FlexDiv>
          </a>
        )
      },
    },

    {
      title: t('actions'),
      dataIndex: '',
      key: '_id',
      render: (data) => {
        return (
          <Space>
            <Tooltip placement="top" title={t('edit')}>
              <Link href={`/admin/banners/${data?._id}`} passHref scroll={true}>
                <Button shape="circle">
                  <EditFilled />
                </Button>
              </Link>
            </Tooltip>
            <Tooltip placement="top" title={t('delete')}>
              <a href="#">
                <Button
                  shape="circle"
                  onClick={(e) => handleDeleteBanner(e, data?._id)}
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
            <Text as="h1">{t('layout.banners')}</Text>
          </FlexDiv>
          <FlexDiv>
            <Link href="/admin/banners/banner">
              <Button type="dashed" icon={<PlusOutlined />}>
                {t('new', {
                  name: t('layout.banners'),
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
  )
}
