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
import { signOut } from 'next-auth/react'
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

export const ProcessingImage = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

function CategoryPageContent({ id = null, cookies, locale }) {
  const [form] = Form.useForm()
  const router = useRouter()

  const reqUrl = process.env.NEXT_PUBLIC_HOST + 'api/category'

  const { t } = useTranslation('common')
  // states
  const [primaryFile, setPrimaryFile] = useState({
    prev: null,
    file: null,
    ready: null,
    validate: false,
  })

  // category list
  const [listCategory, setListCategory] = useState([])
  const [processing, setProcessing] = useState(false)
  const [prevModalVisible, setPrevModalVisible] = useState({
    visible: false,
    target: null,
    file: null,
    ready: null,
  })
  // lines state

  // loadings
  const [loading, setLoading] = useState(null)
  const [loadings, setLoadings] = useState(null)
  const [formError, setFormError] = useState(null)
  const [formLoading, setFormLoading] = useState(false)

  // functions
  const handleFormFinish = useCallback(
    async (values) => {
      // if (!cookies) message.warning("Please login to complete this operation");
      // setFormLoading(true);

      let formData = new FormData()

      formData.append('title_ar', values.title_ar)
      formData.append('title_tr', values.title_tr)
      formData.append('title_en', values.title_en)
      formData.append('googleCode', values.googleCode)

      if (!!values.parentId) {
        formData.append('parent', values.parentId)
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
          router.push('/admin/categories')
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

    [primaryFile.file, id, reqUrl, t, router, cookies]
  )

  const getListCategory = useCallback(async () => {
    if (listCategory.length !== 0) return false

    setLoadings('categoryList')
    const { data: res, status } = await axios.get(
      process.env.NEXT_PUBLIC_HOST + 'api/category',
      {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
          lang: locale,
          website: process.env.NEXT_PUBLIC_WEBSITE,
        },
      }
    )

    if (status === 200) {
      setListCategory(res?.description?.data)
    } else {
    }
    setLoadings(null)
  }, [id, listCategory.length])

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
    if (id) {
      const getAdDetails = async () => {
        setLoading(true)
        const reqUrl = process.env.NEXT_PUBLIC_HOST + 'api/category/' + id

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
              title_tr: myData?.title_tr,
              title_en: myData?.title_en,
              title_ar: myData?.title_ar,
              googleCode: myData?.googleCode,
              parentId: myData?.parent,
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
      getAdDetails()
    }
  }, [form, getListCategory, id])

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
        // check image file..
        const validate = imageValidate(file)
        if (!validate) return prev
        // set image
        let newObj = prev
        newObj.file = file
        newObj.prev = URL.createObjectURL(file)
        newObj.validate = false
        return { ...newObj }
      })
      setPrevModalVisible({
        visible: true,
        target: 'primary',
        file: primaryFile,
        ready: null,
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
                          {processing === 'primary' && (
                            <ProcessingImage>
                              <LoadingOutlined
                                spin
                                style={{ color: 'orange', fontSize: 42 }}
                              />
                              <Text as="h1" type="primary">
                                Processing Image
                              </Text>
                            </ProcessingImage>
                          )}
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
                  name="title_tr"
                  label={t('categories.trTitle')}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  tooltip={t('categories.trTitle')}
                >
                  <Input placeholder={t('categories.trTitle')} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="title_ar"
                  tooltip={t('categories.arTitle')}
                  label={t('categories.arTitle')}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder={t('categories.arTitle')} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="title_en"
                  label={t('categories.enTitle')}
                  tooltip={t('categories.enTitle')}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder={t('categories.enTitle')} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="googleCode"
                  label={t('googleCode')}
                  tooltip={t('googleCode')}
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Input placeholder={t('googleCode')} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="parentId"
                  label={t('categories.parent')}
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                  tooltip={{
                    title: t('categories.parentHint'),
                    placement: router.locale === 'ar' ? 'left' : 'right',
                  }}
                >
                  <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder={t('categories.parent')}
                    optionFilterProp="children"
                    // onChange={() => console.log("on change")}
                    onFocus={getListCategory}
                    loading={loadings === 'categoryList'}
                    // mode="multiple"
                    // onSearch={(value) => countryListSearch(value)}
                    filterOption={(input, option) => {
                      return option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }}
                    allowClear
                  >
                    {listCategory.map((item, i) => {
                      return (
                        <Select.Option key={item?._id} value={item?._id}>
                          {item[`title_${router.locale}`]}
                        </Select.Option>
                      )
                    })}
                  </Select>
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
                onClick={() => router.push('/admin/categories')}
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

export default CategoryPageContent
