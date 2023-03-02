import { useState, useCallback, useEffect } from 'react'
import FlexDiv from 'components/utils/flex-div'
import Text from 'components/utils/text'
import Loading from 'components/utils/loading'

import { axiosInstance, httpsAgent, configHeader } from 'helpers/constants'

import Image from 'next/image'
import styled, { css } from 'styled-components'
import { uploadToS3 } from '../../../helpers/aws'
// components
import {
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
  Switch,
  Radio,
  Alert,
} from 'antd'
// modules
import {
  DeleteOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import axios from 'axios'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { setupFormData } from '../../../helpers/form'
import { signOut } from 'next-auth/react'
import useFetch from '../../../hooks/useFetch'
// styles
const FormContainer = styled.div`
  background-color: #fff;
  padding: 10px;
`

const UploadPrimary = styled(Upload)`
  display: block;
  padding: 0 20px;

  > div {
    width: 100%;
  }
`

const PrimaryImageOuter = styled.div`
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
const PrimaryImagePreview = styled.div`
  width: 100%;
  height: auto;
  height: 470px;
  max-height: 100%;
`

const RemoveButton = styled(Button)`
  position: absolute;
  right: 20px;
  bottom: 20px;
`

function BannerPageContent({ id = null, cookies, status }) {
  const [form] = Form.useForm()
  const router = useRouter()

  let reqUrl = process.env.NEXT_PUBLIC_HOST + 'api/banner'

  const { t } = useTranslation(['common', 'addad'])

  // states
  const [primaryFile, setPrimaryFile] = useState({
    prev: null,
    file: null,
    ready: null,
    validate: false,
    fileType: 'image',
  })

  // loadings
  const [formError, setFormError] = useState(null)
  const [formLoading, setFormLoading] = useState(false)
  const [bannerType, setBannerType] = useState(
    cookies.user?.websites?.[0]?.settings?.banner_type
  )

  // apis fetch
  const {
    data: getData,
    loading: getLoading,
    error: getError,
    executeFetch: getAd,
  } = useFetch('api/banner/' + id, 'GET', {}, false)

  // functions
  const handleFormFinish = useCallback(
    async (values) => {
      setFormLoading(true)
      if (
        (values?.type === 'image' || values?.type === 'banner') &&
        !primaryFile?.file
      ) {
        alert('error!!!')
        setFormError({
          header: 'Cannot process this request',
          description: 'Please choose image first.',
        })
        return
      }

      const data = setupFormData(values)

      if (primaryFile?.file) {
        console.log('upload file ___')
        // upload data
        const url = await uploadToS3(primaryFile?.file)
        data?.append('image', url)
        data?.append('file_type', primaryFile.fileType)
      }
      console.log('values')
      console.log(values)

      if (id) data?.append('id', id)

      // start request
      try {
        const { data: res, status } = await axios({
          url: reqUrl,
          method: id ? 'PUT' : 'POST',
          headers: {
            Authorization: `Bearer ${cookies.user?.token}`,
            website: process.env.NEXT_PUBLIC_WEBSITE,
          },
          data: data,
        })

        if (status === 201 || status === 200) {
          message.success(
            id
              ? `${
                  router.locale === 'ar'
                    ? 'تم تحديث البانر'
                    : router.locale === 'en'
                    ? 'Banner has been updated.'
                    : 'Banner guncellendi.'
                }`
              : `
                ${
                  router.locale === 'ar'
                    ? 'تم إضافة البانر'
                    : router.locale === 'en'
                    ? 'Banner has been added.'
                    : 'Banner eklendi.'
                }
              `
          )
          router.push('/admin/banners')
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
    },
    [id, primaryFile.file, reqUrl, router, cookies]
  )

  const imageValidate = useCallback((file) => {
    // const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    // if (!isJpgOrPng) {
    //   message.error("You can only upload JPG/PNG files !");
    //   return false;
    // }
    // return true;
    return true
  }, [])

  // useEffects

  useEffect(() => {
    if (id && status !== 'loading') {
      getAd()
    }
  }, [id, status])

  useEffect(() => {
    if (!getLoading && !getError && getData) {
      const _data = getData?.description?.data

      form.setFieldsValue({
        type: _data?.type,
        title_tr: _data?.title_tr,
        title_en: _data?.title_en,
        title_ar: _data?.title_ar,
        desc_ar: _data?.desc_ar,
        desc_en: _data?.desc_en,
        desc_tr: _data?.desc_tr,
      })
      if (_data?.image) {
        setPrimaryFile({
          prev: _data.image,
          file: true,
          validate: false,
        })
      }
    }
  }, [getData, getLoading, getError])

  const uploadProps = {
    accept: 'video/mp4,video/x-m4v,video/*, image/*',
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
      // if (file.size >= 1048576) {
      //   message.error('File size must be less than 1Mb')
      //   return false
      // }
      let fileType = 'image'
      if (file?.type?.startsWith('video/')) {
        fileType = 'video'
      }

      setPrimaryFile((prev) => {
        // check image file..
        const validate = imageValidate(file)
        if (!validate) return prev
        // set image
        let newObj = prev
        newObj.file = file
        newObj.prev = URL.createObjectURL(file)
        newObj.validate = false
        newObj.fileType = fileType
        return { ...newObj }
      })

      return false
    },
    primaryFile,
  }

  console.log('primaryFile')
  console.log(primaryFile)

  if (getError)
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
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormFinish}
        initialValues={{ type: 'image' }}
      >
        <Row>
          {formError && (
            <Col span={24}>
              <Alert
                showIcon
                type="error"
                message={formError?.header}
                description={formError?.description}
              />
            </Col>
          )}
          <Col xs={24} sm={24} md={12} lg={12}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <Form.Item
                  name={'type'}
                  label={'Banner Type'}
                  rules={[{ required: true }]}
                >
                  <Radio.Group>
                    <Radio value={'text'}>Text</Radio>
                    <Radio value={'image'}>Image</Radio>
                    <Radio value={'banner'}>Text And Image</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Tooltip title={t('Image')}>
                  <UploadPrimary name="PrimaryImage" {...uploadProps}>
                    <PrimaryImageOuter error={primaryFile.validate !== false}>
                      {primaryFile.prev ? (
                        <>
                          <PrimaryImagePreview>
                            {primaryFile.fileType === 'video' ? (
                              <video
                                src={
                                  primaryFile?.ready
                                    ? primaryFile?.ready
                                    : primaryFile.prev
                                }
                                style={{
                                  width: '100%',
                                  height: '100%',
                                }}
                                controls
                              ></video>
                            ) : (
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
                            )}
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
                            {t('common:delete', {
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
                            ? t('Image')
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
              <Col span={8}>
                <Form.Item
                  name="title_tr"
                  label={t('Unvan')}
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                  tooltip={t('Unvan')}
                >
                  <Input placeholder={t('Unvan')} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="title_ar"
                  tooltip={t('العنوان')}
                  label={t('العنوان')}
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Input placeholder={t('العنوان')} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="title_en"
                  label={t('Title')}
                  tooltip={t('Title')}
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Input placeholder={t('Title')} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={t('Aciklama')}
                  name="desc_tr"
                  tooltip={t('Aciklama')}
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Input placeholder={t('Aciklama')} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={t('الوصف')}
                  tooltip={t('الوصف')}
                  name="desc_ar"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Input placeholder={t('الوصف')} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={t('Description')}
                  tooltip={t('Description')}
                  name="desc_en"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Input placeholder={t('Description')} />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col span={24} style={{ margin: 60 }}>
            <Space>
              <Button htmlType="submit" loading={formLoading}>
                {id ? t('common:edit') : t('common:confirm')}
              </Button>
              <Button type="primary" danger disabled={formLoading}>
                {t('common:cancel')}
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}

export default BannerPageContent
