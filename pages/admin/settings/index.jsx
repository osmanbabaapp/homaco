import { Alert, Button, Col, Form, Input, message, Row, Upload } from 'antd'
import axios from 'axios'
import { signOut, useSession } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { MdFacebook, MdSettings } from 'react-icons/md'
import {
  RiFacebookBoxLine,
  RiInstagramLine,
  RiPhoneLine,
  RiTwitterLine,
  RiWhatsappLine,
} from 'react-icons/ri'
import styled from 'styled-components'
import { setupFormData } from '../../../helpers/form'
import useFetch from '../../../hooks/useFetch'

import AdminLayout from '../../../layouts/admin-layout/admin-layout'

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
  max-height: 470px;
`

const RemoveButton = styled(Button)`
  position: absolute;
  right: 20px;
  bottom: 20px;
`

const ProcessingImage = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function SettingsPage() {
  const [form] = Form.useForm()
  const { data: cookies } = useSession()

  const { t } = useTranslation('common')
  const router = useRouter()

  const { data, loading, error, executeFetch } = useFetch(
    'api/settings',
    'GET',
    {},
    true
  )

  // states
  const [primaryFile, setPrimaryFile] = useState({
    prev: null,
    file: null,
    ready: null,
    validate: false,
  })
  const [formError, setFormError] = useState(null)
  const [formLoading, setFormLoading] = useState(false)
  // form finish
  const handleFormOnFinish = useCallback(
    async (values) => {
      const formData = setupFormData(values)

      if (primaryFile.file) formData.append('logo', primaryFile.file)

      const website = process.env.NEXT_PUBLIC_WEBSITE
      try {
        const { data: res, status } = await axios({
          url: process.env.NEXT_PUBLIC_HOST + 'api/settings',
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${cookies.user?.token}`,
            website: website,
          },
          data: formData,
        })
        if (status === 200 || status === 201) {
          message.success(String(res?.description))
          setFormError(null)
        } else if (status === 204) {
          setFormError({
            header: 'No Content Found',
            description: 'Something went wrong! Please try again. 204',
          })
        }
      } catch (err) {
        console.log('err')
        console.log(err)
        if (err?.response?.status === 401) {
          //   signOut({ callbackUrl: '/' })
        } else {
          setFormError({
            header: err?.response?.data?.header,
            description: err?.response?.data?.description,
          })
        }
        // else if (err?.response?.status === 400) {
        //   setFormError(
        //     err?.response?.data ||
        //       'Something went wrong! Please try again later.'
        //   )
        // } else if (err?.response?.status === 404) {
        //   setFormError({ description: 'Wrong endpoint error' })
        // }
      }
    },
    [form, primaryFile, cookies]
  )

  useEffect(() => {
    if (!loading && !error && data) {
      const _data = data?.description?.data

      form.setFieldsValue({
        type: _data?.type,
        facebook: _data?.facebook,
        instagram: _data?.instagram,
        twitter: _data?.twitter,
        whatsapp: _data?.whatsapp,
        phones: _data?.phones,
      })
      if (_data?.logo) {
        setPrimaryFile({
          prev: _data.logo,
          file: true,
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
      if (file.size >= 1048576 * 5) {
        message.error('File size must be less than 5Mb')
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

  return (
    <>
      <Head>
        <title>Website Settings</title>
      </Head>
      <AdminLayout>
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <MdSettings />
            Settings
          </h2>
          <Form layout="vertical" form={form} onFinish={handleFormOnFinish}>
            <Row gutter={[24, 24]}>
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
              <Col span={12}>
                <Row>
                  <Col span={24}>
                    <Form.Item label={'Facebook Url'} name="facebook">
                      <Input
                        addonBefore={<RiFacebookBoxLine />}
                        placeholder="Facebook url"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label={'Instagram Url'} name="instagram">
                      <Input
                        addonBefore={<RiInstagramLine />}
                        placeholder="Instagram url"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label={'Twitter Url'} name="twitter">
                      <Input
                        addonBefore={<RiTwitterLine />}
                        placeholder="Twitter url"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label={'Whatsapp Phone'} name="whatsapp">
                      <Input
                        addonBefore={<RiWhatsappLine />}
                        placeholder="Whatsapp url"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label={'Phone'} name="phones">
                      <Input
                        addonBefore={<RiPhoneLine />}
                        placeholder="Phone"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <UploadPrimary name="logo" {...primaryFileProps}>
                  <PrimaryImageOuter error={primaryFile.validate !== false}>
                    {primaryFile.prev ? (
                      <>
                        <PrimaryImagePreview>
                          <Image
                            alt="Logo"
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
              </Col>

              <Col span={24}>
                <Button htmlType="submit">Save</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </AdminLayout>
    </>
  )
}
