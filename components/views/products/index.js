import { LockFilled, PlusOutlined, UnlockFilled } from '@ant-design/icons'
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
import FlexDiv from '../../utils/flex-div'
import Text from '../../utils/text'
import Link from 'next/link'

import { useState, useEffect, useCallback } from 'react'
// components

import { ExclamationCircleFilled } from '@ant-design/icons'
import axios from 'axios'
import useTranslation from 'next-translate/useTranslation'
import { MdDelete, MdEdit } from 'react-icons/md'
import { signOut } from 'next-auth/react'

export default function ProductsPageContent({ locale, cookies, status }) {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { t } = useTranslation('common')

  const getList = useCallback(async () => {
    const reqUrl = process.env.NEXT_PUBLIC_HOST + 'api/product?take=100'
    setLoading(true)
    try {
      const { data: res, status } = await axios({
        url: reqUrl,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cookies.user?.token}`,
          website: process.env.NEXT_PUBLIC_WEBSITE,
        },
      })
      setLoading(false)

      if (status === 201 || status === 200) {
        setList(res.description?.data)
      } else if (status === 204) {
        setError({
          header: 'No Content Found',
          description: 'Something went wrong! Please try again. 204',
        })
      }
    } catch (err) {
      setLoading(false)
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
  }, [cookies?.token, locale])

  const handleDeleteAd = useCallback(
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
            ? 'هل أنت متأكد من حذف هذا منتج نهائيا ؟'
            : locale === 'en'
            ? 'Are you sure to permanently delete this product ?'
            : 'Bu ürün kalıcı olarak silmek istediğinizden emin misiniz ?',
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
              process.env.NEXT_PUBLIC_HOST + 'api/product',
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
                  ? 'تم حذف منتج بنجاح'
                  : locale === 'en'
                  ? 'The Product has been deleted successfully'
                  : 'Ürün başarılı bir şekilde silindi'
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
    [getList, locale, cookies]
  )
  const toggleActivation = useCallback(
    async (e, id, active, video) => {
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
              process.env.NEXT_PUBLIC_HOST + 'api/product',
              {
                id,
                active: !active,
                video,
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
      dataIndex: 'primary_image',
      key: 'id',
      width: '200px',
      render: (data) => {
        return <Image src={data} alt="product image" width={200} height={200} />
      },
    },
    {
      title: t('name'),
      dataIndex: `title_${locale}`,
      width: '20%',
      key: 'id',
    },
    {
      title: t('desc'),
      dataIndex: `desc_${locale}`.substring(0, 24),
      width: '15%',
      height: '60px',
      key: 'id',
      render: (data) => {
        let stringItem = data

        if (stringItem.length > 40) {
          stringItem = stringItem.substring(0, 40) + '...'
        }
        return <div>{stringItem}</div>
      },
    },
    {
      title: t('actStatus'),
      dataIndex: '',
      key: '_id',
      render: (data) => {
        return (
          <a
            href="#"
            onClick={(e) =>
              toggleActivation(e, data?._id, data.active, data?.video)
            }
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
      title: t('action'),
      dataIndex: '',
      key: 'x',
      render: (data) => {
        return (
          <Space key={data.id}>
            <Tooltip
              placement="top"
              title={t('edit', {
                name:
                  locale === 'ar'
                    ? 'منتج'
                    : locale === 'en'
                    ? 'Product'
                    : 'Ürün',
              })}
            >
              <Link
                href={`/admin/products/${data?._id}`}
                passHref
                scroll={true}
              >
                <Button
                  shape="circle"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <MdEdit />
                </Button>
              </Link>
            </Tooltip>
            <Tooltip
              placement="top"
              title={t('delete', {
                name:
                  locale === 'ar'
                    ? 'منتج'
                    : locale === 'en'
                    ? 'Product'
                    : 'Ürün',
              })}
            >
              <a href="#">
                <Button
                  shape="circle"
                  onClick={(e) => handleDeleteAd(e, data?._id)}
                  danger
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <MdDelete />
                </Button>
              </a>
            </Tooltip>
          </Space>
        )
      },
    },
  ]

  if (error)
    return (
      <>
        {error && (
          <Col span={24}>
            <Alert
              type="error"
              showIcon
              description={error?.description}
              message={error?.header}
            />
          </Col>
        )}
      </>
    )

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <FlexDiv justifyContent="space-between" alignItems="center">
          <FlexDiv>
            <Text as="h1">{t('layout.products')}</Text>
          </FlexDiv>
          <FlexDiv>
            <Link href="/admin/products/product">
              <Button type="dashed" icon={<PlusOutlined />}>
                {t('new', {
                  name: t('layout.products'),
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
