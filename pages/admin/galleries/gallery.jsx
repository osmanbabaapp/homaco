import { useState, useCallback, useEffect } from 'react'
import FlexDiv from '../../../components/utils/flex-div'
import Text from '../../../components/utils/text'
import useFetch from '../../../hooks/useFetch'
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
  Modal,
  Row,
  Space,
  Tooltip,
  Upload,
} from 'antd'

import axios from 'axios'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'
import AdminLayout from '../../../layouts/admin-layout/admin-layout'
import Head from 'next/head'
import { removeFileFromS3, uploadToS3 } from '../../../helpers/aws'
import useTranslation from 'next-translate/useTranslation'
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

export function GalleryPageContent({ t, id = null, cookies, locale }) {
  const [form] = Form.useForm()
  const router = useRouter()

  const reqUrl = process.env.NEXT_PUBLIC_HOST + 'api/gallery'

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

  const { data, loading, error, executeFetch } = useFetch(
    'api/gallery/' + id,
    'GET',
    {},
    id ? true : false
  )

  // loadings
  const [formError, setFormError] = useState(null)
  const [formLoading, setFormLoading] = useState(false)

  // functions
  const handleFormFinish = useCallback(
    async (values) => {
      setFormLoading(true)

      console.log('primaryFile')
      console.log(primaryFile)
      if ((!id && !primaryFile?.file) || (id && !primaryFile.prev)) {
        message.error('Image field is required !')
        setFormLoading(false)
        return
      }

      if (primaryFile.file) {
        // upload data
        const url = await uploadToS3(primaryFile?.file, 'gallery')
        values['image'] = url
      }

      // check for video
      if (videoFile?.file) {
        // upload data
        const url = await uploadToS3(videoFile?.file, 'gallery')
        values['video'] = url
      } else if (videoFile?.prev) {
        values['video'] = videoFile?.prev
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
    if (!loading && !error && data) {
      const myData = data?.description?.data
      form.setFieldsValue({
        title_ar: myData?.title_ar,
        title_en: myData?.title_en,
        title_tr: myData?.title_tr,
        desc_ar: myData?.desc_ar,
        desc_en: myData?.desc_en,
        desc_tr: myData?.desc_tr,
      })
      if (myData?.image) {
        setPrimaryFile({
          prev: myData?.image,
          file: false,
          validate: false,
        })
      }
      if (myData?.video) {
        setVideoFile({
          prev: myData.video,
          file: false,
          validate: false,
        })
      }
    }
  }, [data, loading, error])

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

  if (error)
    return (
      <Col span={24}>
        <Alert
          showIcon
          type="error"
          message={getError?.header}
          description={getError?.description}
        />
      </Col>
    )

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
                <Tooltip title={t('video')}>
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
                            onClick={() => {
                              setVideoFile({
                                prev: null,
                                file: null,
                                ready: null,
                                validate: false,
                              })
                            }}
                          >
                            {t('delete')}
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
                  {locale === 'ar'
                    ? 'معلومات إضافية'
                    : locale === 'en'
                    ? ' More Info '
                    : 'Fazla Bilgiler'}
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
  const { t } = useTranslation('common')
  return (
    <>
      <Head>
        <title>{t('new', { name: t('layout.gallery') })}</title>
      </Head>
      <AdminLayout>
        <GalleryPageContent t={t} cookies={cookies?.user} locale={locale} />
      </AdminLayout>
    </>
  )
}
