import { useState, useCallback, useEffect } from 'react'
import FlexDiv from '../../../components/utils/flex-div'
import Text from '../../../components/utils/text'

import Image from 'next/image'
import styled, { css } from 'styled-components'
// components
import {
  Alert,
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
} from 'antd'
// modules
import {
  DeleteOutlined,
  LoadingOutlined,
  MinusCircleFilled,
  MinusOutlined,
  PlusCircleFilled,
  PlusOutlined,
} from '@ant-design/icons'
import axios from 'axios'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'
import AdminLayout from '../../../layouts/admin-layout/admin-layout'
import Head from 'next/head'
// styles
const FormContainer = styled.div`
  background-color: #fff;
  padding: 10px;
`

export const UploadPrimary = styled(Upload)`
  display: block;
  padding: 0 20px;

  > div {
    width: 100%;
  }
`

export const PrimaryImageOuter = styled.div`
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
      `
    else
      return `
    
    `
  }}
  ${(props) => {
    if (props.error)
      return `
        border: 3px dashed ${props.theme.colors.danger};
      `
  }}
`
export const PrimaryImagePreview = styled.div`
  width: 100%;
  height: auto;
  max-height: 470px;
`

export const RemoveButton = styled(Button)`
  position: absolute;
  right: 20px;
  bottom: 20px;
`

// styles
const StyledUploadImage = styled(FlexDiv)`
  border: 1px dashed ${(props) => props.theme.colors.secondary};
  position: relative;
  &:hover {
    border-width: 2px;
  }
`

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
    `
  }}
  > div {
    width: 100%;
  }
`

export function ClientPageContent({ id = null, cookies, locale }) {
  const [form] = Form.useForm()
  const router = useRouter()

  const reqUrl = process.env.NEXT_PUBLIC_HOST + 'api/client'

  const { t } = useTranslation('common')
  // states
  const [primaryFile, setPrimaryFile] = useState({
    prev: null,
    file: null,
    ready: null,
    validate: false,
  })

  // loadings
  const [loading, setLoading] = useState(null)
  const [formError, setFormError] = useState(null)
  const [formLoading, setFormLoading] = useState(false)

  // functions
  const handleFormFinish = useCallback(
    async (values) => {
      // if (!cookies) message.warning("Please login to complete this operation");
      setFormLoading(true)

      let formData = new FormData()

      formData.append('name_ar', values.name_ar)
      formData.append('name_tr', values.name_tr)
      formData.append('name_en', values.name_en)

      if (!primaryFile.file) {
        message.error('Please choose image.')
        return
      }
      formData.append('image', primaryFile.file)

      // start send data
      if (id) {
        formData.append('id', id)
      }
      try {
        const { data: res, status } = await axios({
          url: reqUrl,
          method: id ? 'PUT' : 'POST',
          headers: {
            Authorization: `Bearer ${cookies?.token}`,
            website: process.env.NEXT_PUBLIC_WEBSITE,
          },
          data: formData,
        })
        if (status === 200 || status === 201) {
          message.success(String(res?.description))
          router.push('/admin/clients')
        } else {
        }
      } catch (err) {
        if (err?.response?.status === 401) {
          signOut({ callbackUrl: '/' })
        } else if (err?.response?.status === 500) {
          setFormError(
            err?.response?.data ||
              'Something went wrong! Please try again later.'
          )
        } else if (err?.response?.status === 400) {
          setFormError(
            err?.response?.data ||
              'Something went wrong! Please try again later.'
          )
        } else if (err?.response?.status === 404) {
          setFormError({ description: 'Wrong endpoint error' })
        }
      }

      setFormLoading(false)
    },

    [primaryFile, id, reqUrl, t, router, cookies]
  )

  // useEffects
  useEffect(() => {
    if (id) {
      const getPartner = async () => {
        setLoading(true)
        const reqUrl = process.env.NEXT_PUBLIC_HOST + 'api/client/' + id

        try {
          const { data: res, status } = await axios.get(reqUrl, {
            headers: {
              website: process.env.NEXT_PUBLIC_WEBSITE,
              Authorization: `Bearer ${cookies?.token}`,
            },
          })
          console.log('status', status)
          if (status === 200) {
            const myData = res?.description?.data
            form.setFieldsValue({
              name_tr: myData?.name_tr,
              name_ar: myData?.name_ar,
              name_en: myData?.name_en,
            })

            if (myData?.image) {
              setPrimaryFile({
                prev: myData?.image,
                file: true,
                validate: false,
              })
            }
          } else if (status === 204) {
            setFormError({
              header: 'No Content Found',
              description: 'Something went wrong! Please try again. 204',
            })
          }
        } catch (err) {
          if (err?.response?.status === 401) {
            signOut({ callbackUrl: '/' })
          } else if (err?.response?.status === 500) {
            setFormError(
              err?.response?.data ||
                'Something went wrong! Please try again later.'
            )
          } else if (err?.response?.status === 400) {
            setFormError(
              err?.response?.data ||
                'Something went wrong! Please try again later.'
            )
          } else if (err?.response?.status === 404) {
            setFormError({ description: 'Wrong endpoint error' })
          }
        }
        setLoading(false)
      }
      getPartner()
    }
  }, [form, id])

  // primary image props
  const primaryFileProps = {
    // accept: "image/png, image/jpeg",
    showUploadList: false,
    disabled: primaryFile.file ?? false,
    onRemove: (file) => {
      setPrimaryFile((prevF) => {
        let newObj = prevF
        newObj.file = null
        newObj.prev = null
        newObj.validate = false
        return { ...newObj }
      })
    },
    beforeUpload: (file) => {
      // check file size
      if (file.size >= 1048576 * 25) {
        message.error('File size must be less than 1Mb')
        return false
      }

      setPrimaryFile((prev) => {
        // set image
        let newObj = prev
        newObj.file = file
        newObj.prev = URL.createObjectURL(file)
        newObj.validate = false
        return { ...newObj }
      })
      return false
    },
    primaryFile,
  }

  if (loading) return <h2>Loading ...</h2>

  return (
    <FormContainer>
      <Form form={form} layout="vertical" onFinish={handleFormFinish}>
        <Row>
          {formError && (
            <Col span={24}>
              <Alert
                type="error"
                showIcon
                description={formError?.description}
                message={formError?.header}
              />
            </Col>
          )}
          <Col xs={24} sm={24} md={12} lg={12}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <Tooltip title={t('image')}>
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
                            {t('delete', {
                              name:
                                router.locale === 'ar'
                                  ? 'ملف'
                                  : router.locale === 'en'
                                  ? 'Photo'
                                  : 'Fotoğrafı',
                            })}
                          </RemoveButton>
                        </>
                      ) : (
                        <h2>
                          {primaryFile.validate === false
                            ? t('image')
                            : primaryFile.validate}
                        </h2>
                      )}
                    </PrimaryImageOuter>
                  </UploadPrimary>
                </Tooltip>
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  name="name_tr"
                  label={t('Isim')}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  tooltip={t('Name')}
                >
                  <Input placeholder={t('Isim')} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="name_ar"
                  label={t('الاسم')}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  tooltip={t('Name')}
                >
                  <Input placeholder={t('الاسم')} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="name_en"
                  label={t('Name')}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  tooltip={t('Name')}
                >
                  <Input placeholder={t('Name')} />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col span={24} style={{ margin: 60 }}>
            <Space>
              <Button
                htmlType="submit"
                type="dashed"
                // onClick={handleValidateFiles}
                loading={formLoading}
              >
                {id ? t('edit') : t('confirm')}
              </Button>
              <Button
                onClick={() => router.back()}
                type="dashed"
                danger
                disabled={formLoading}
              >
                {t('cancel')}
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}

export default function ClientPage({ id }) {
  const { data: cookies } = useSession()
  const locale = useRouter().locale
  return (
    <>
      <Head>
        <title>Partner</title>
      </Head>
      <ClientPageContent cookies={cookies?.user} locale={locale} id={id} />
    </>
  )
}
