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
import { uploadToS3 } from '../../../helpers/aws'
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
  height: 100%;
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

export function GalleryPageContent({ id = null, cookies, locale }) {
  const [form] = Form.useForm()
  const router = useRouter()

  const reqUrl = process.env.NEXT_PUBLIC_HOST + 'api/gallery'

  const { t } = useTranslation('common')
  // states
  const [primaryFile, setPrimaryFile] = useState({
    prev: null,
    file: null,
    ready: null,
    validate: false,
  })
  const [videoFile, setVideoFile] = useState({
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
      setFormLoading(true)

      if (!primaryFile?.file) {
        message.error('Image field is required !')
        return
      }
      // upload data
      const url = await uploadToS3(primaryFile?.file, 'gallery')
      values['image'] = url

      // check for video
      if (videoFile?.file) {
        // upload data
        const url = await uploadToS3(videoFile?.file, 'gallery')
        values['video'] = url
      }

      // start send data
      if (id) {
        values['id'] = id
      }
      try {
        const { data: res, status } = await axios({
          url: reqUrl,
          method: id ? 'PUT' : 'POST',
          headers: {
            Authorization: `Bearer ${cookies?.token}`,
            website: process.env.NEXT_PUBLIC_WEBSITE,
          },
          data: values,
        })
        if (status === 200 || status === 201) {
          message.success(String(res?.description))
          router.push('/admin/galleries')
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

    [primaryFile, videoFile, id, reqUrl, t, router, cookies]
  )

  // useEffects
  useEffect(() => {
    if (id) {
      const getGallery = async () => {
        setLoading(true)
        const reqUrl = process.env.NEXT_PUBLIC_HOST + 'api/gallery/' + id

        try {
          const { data: res, status } = await axios.get(reqUrl, {
            headers: {
              website: process.env.NEXT_PUBLIC_WEBSITE,
              Authorization: `Bearer ${cookies?.token}`,
            },
          })
          console.log('status', status)
          if (status === 200) {
            console.log('Setting data')
            const myData = res?.description?.data
            console.log('myData', myData)
            // await getListCategory()
            // let categories =
            //   res.category?.map((item, i) => item?.categoryID) ?? []
            // setting form values
            console.log('setting form values _____')
            form.setFieldsValue({
              name: myData?.name,
              phone: myData?.phone,
              whatsapp: myData?.whatsapp,
              role: myData?.role,
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
      getGallery()
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
  // video props
  const videoFileProps = {
    accept: 'video/*',
    showUploadList: false,
    disabled: videoFile.file ?? false,
    onRemove: (file) => {
      setVideoFile((prevF) => {
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

      setVideoFile((prev) => {
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
        <Row gutter={[12, 12]}>
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
          <Col span={24}>
            <Row gutter={[24, 24]}>
              <Col span={12}>
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
              <Col span={12}>
                <Tooltip title={t('Video')}>
                  <UploadPrimary name="Video" {...videoFileProps}>
                    <PrimaryImageOuter error={videoFile.validate !== false}>
                      {videoFile.prev ? (
                        <>
                          <PrimaryImagePreview>
                            <video
                              src={
                                videoFile?.ready
                                  ? videoFile?.ready
                                  : videoFile.prev
                              }
                              style={{
                                width: '100%',
                                height: '100%',
                              }}
                              controls
                            ></video>
                          </PrimaryImagePreview>
                          <RemoveButton
                            danger
                            color="#ff0000"
                            onClick={() =>
                              setVideoFile({
                                prev: null,
                                file: null,
                                validate: false,
                                ready: null,
                              })
                            }
                          >
                            {t('common:delete', {
                              name:
                                router.locale === 'ar'
                                  ? 'ملف'
                                  : router.locale === 'en'
                                  ? 'Video'
                                  : 'Video',
                            })}
                          </RemoveButton>
                        </>
                      ) : (
                        <h2>
                          {primaryFile.validate === false
                            ? t('Video')
                            : primaryFile.validate}
                        </h2>
                      )}
                    </PrimaryImageOuter>
                  </UploadPrimary>
                </Tooltip>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={24}>
              <Col span={24}>
                <h2 className="font-bold text-2xl my-5">
                  More Info - Not Required
                </h2>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="title_tr"
                  label={t('Isim')}
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                  tooltip={t('Isim')}
                >
                  <Input placeholder={t('Isim')} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="title_ar"
                  label={t('الاسم')}
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                  tooltip={t('الاسم')}
                >
                  <Input placeholder={t('الاسم')} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="title_en"
                  label={t('Title')}
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                  tooltip={t('Title')}
                >
                  <Input placeholder={t('Title')} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="desc_tr"
                  label={t('Aciklama')}
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                  tooltip={t('Aciklama')}
                >
                  <Input placeholder={t('Aciklama')} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="desc_ar"
                  label={t('الوصف')}
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                  tooltip={t('الوصف')}
                >
                  <Input placeholder={t('الوصف')} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="desc_en"
                  label={t('Description')}
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                  tooltip={t('Description')}
                >
                  <Input placeholder={t('Description')} />
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

export default function GalleryPage() {
  const { data: cookies } = useSession()
  const locale = useRouter().locale
  return (
    <>
      <Head>
        <title>New Gallery</title>
      </Head>
      <AdminLayout>
        <GalleryPageContent cookies={cookies?.user} locale={locale} />
      </AdminLayout>
    </>
  )
}
