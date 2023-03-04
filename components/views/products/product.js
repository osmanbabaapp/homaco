import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
// components
import {
  Button,
  Col,
  Form,
  Row,
  Select,
  Space,
  Tooltip,
  Upload,
  Input,
  message,
} from 'antd'
// modules
import axios from 'axios'
import useTranslation from 'next-translate/useTranslation'
import {
  DeleteOutlined,
  LoadingOutlined,
  MinusCircleFilled,
  MinusOutlined,
  PlusCircleFilled,
  PlusOutlined,
} from '@ant-design/icons'
import Text from '@/components/utils/text'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import useFetch from '../../../hooks/useFetch'
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
const UploadSmall = styled(Upload)`
  display: block;
  width: 120px;
  height: 100px;

  > div {
    width: 120px;
    height: 100px;
    border: 1px dashed #ddd;
  }
  > div > span {
    display: block;
    padding: 10px;
    width: 120px;
    height: 100px;
    cursor: pointer;
    position: relative;
  }
  > div > span > div {
    width: 120px;
    height: 100px;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
  }
  ${(props) => {
    if (!props.noBorder) {
      return `
      > div:hover {
          border-width: 3px;
      }
    `
    }
  }}
  ${(props) => {
    if (props.error) {
      return `
            > div {
                border: 3px dashed ${props.theme.colors.dnager};
                text-align: center;
            }
          `
    }
  }}
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
const RemoveButtonLink = styled.a`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 20px;
  bottom: 20px;
  background-color: #fff;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  ${(props) =>
    props.second &&
    css`
      right: 60px;
    `}
`

const RoundedLink = styled.a`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: #fff;
  ${(props) =>
    props.type && `background-color: ${props.theme.colors[props.type]};`}
  &:hover {
    color: #fff;
  }
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

function AddPageContent({ id = null }) {
  const [form] = Form.useForm()
  const router = useRouter()

  const { data: cookies, status } = useSession()

  // console.log('id')
  // console.log(id)

  const { t } = useTranslation(['common', 'addad'])
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
    validate: false,
  })
  const [image1, setImage1] = useState({
    prev: null,
    file: null,
    ready: null,
    validate: false,
  })
  const [image2, setImage2] = useState({
    prev: null,
    file: null,
    ready: null,
    validate: false,
  })
  const [image3, setImage3] = useState({
    prev: null,
    file: null,
    ready: null,
    validate: false,
  })
  const [productImage, setProductImage] = useState({
    prev: null,
    file: null,
    ready: null,
    validate: false,
  })

  // category list
  const [listCategory, setListCategory] = useState([])
  const [processing, setProcessing] = useState(false)
  // lines state
  const [adjects, setAdjects] = useState([
    {
      adj_en: '',
      adj_tr: '',
      adj_ar: '',
      type: 1,
      adj_value: [''],
    },
  ])
  // loadings
  const [loading, setLoading] = useState(null)
  const [loadings, setLoadings] = useState(null)
  const [formError, setFormError] = useState(null)
  const [formLoading, setFormLoading] = useState(false)

  // apis fetch
  const {
    data: getData,
    loading: getLoading,
    error: getError,
    executeFetch: getAd,
  } = useFetch('api/product/' + id, 'GET', {}, false)

  // functions
  const handleFormFinish = useCallback(
    async (values) => {
      // setFormLoading(true);
      let reqUrl = process.env.NEXT_PUBLIC_HOST + 'api/product'

      let formData = new FormData()
      // values.ModelID?.map((item) =>
      //   formData.append('ModelID', item?.split('/')[0])
      // )
      // const googleCodes = values.ModelID?.map((item) => item?.split('/')[1])
      // formData.append("ModelID", values.ModelID);

      formData.append('category', JSON.stringify(values.category))
      formData.append('desc_ar', values.desc_ar)
      formData.append('desc_tr', values.desc_tr)
      formData.append('desc_en', values.desc_en)
      formData.append('title_ar', values.title_ar)
      formData.append('title_tr', values.title_tr)
      formData.append('title_en', values.title_en)
      if (typeof primaryFile?.file !== 'boolean')
        formData.append('primary_image', primaryFile.file)
      if (typeof image1?.file !== 'boolean')
        formData.append('image1', image1.file)
      if (typeof image2?.file !== 'boolean')
        formData.append('image2', image2.file)
      if (typeof image3?.file !== 'boolean')
        formData.append('image3', image3.file)
      if (typeof productImage?.file !== 'boolean')
        formData.append('productImage', productImage.file)
      if (typeof videoFile?.file !== 'boolean')
        formData.append('video', videoFile.file)

      const linesString = JSON.stringify(adjects)
      formData.append('adjects', linesString)

      if (id) {
        formData.append('id', id)
      }

      // start request
      try {
        const { data: res, status } = await axios({
          url: reqUrl,
          method: id ? 'PUT' : 'POST',
          headers: {
            Authorization: `Bearer ${cookies.user?.token}`,
            website: process.env.NEXT_PUBLIC_WEBSITE,
          },
          data: formData,
        })

        if (status === 201 || status === 200) {
          message.success(
            id
              ? `${
                  router.locale === 'ar'
                    ? 'تم تحديث المنتج'
                    : router.locale === 'en'
                    ? 'Product has been updated.'
                    : 'Urun guncellendi.'
                }`
              : `
                ${
                  router.locale === 'ar'
                    ? 'تم إضافة المنتج'
                    : router.locale === 'en'
                    ? 'Product has been added.'
                    : 'Urun eklendi.'
                }
              `
          )
          router.push('/admin/products')
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

      setFormLoading(false)
    },
    [id, image1, image2, image3, productImage, primaryFile, adjects, cookies]
  )

  const getListCategory = useCallback(async () => {
    if (listCategory.length !== 0) return false

    setLoadings('categoryList')
    try {
      const { data: res, status } = await axios.get(
        process.env.NEXT_PUBLIC_HOST + 'api/category?take=100',
        {
          headers: {
            Authorization: `Bearer ${cookies?.user?.token}`,
            website: process.env.NEXT_PUBLIC_WEBSITE,
          },
        }
      )
      setLoadings(null)
      if (status === 200) {
        setListCategory(res.description?.data)
      } else {
        message.error('Something went wrong! Please try again.')
      }
    } catch (err) {
      setLoadings(null)
      message.error(String(err) || 'Something went wrong! Please try again.')
    }
  }, [listCategory])

  const imageValidate = useCallback((file) => {
    // const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    // if (!isJpgOrPng) {
    //   message.error("You can only upload JPG/PNG files !");
    //   return false;
    // }
    // return true;
    return true
  }, [])
  const videoValidate = useCallback((file) => {
    const isVideo = file.type.includes('video/')
    if (!isVideo) {
      message.error('You can only upload VIDEO files !')
      return false
    }
    return true
  }, [])

  // validate line before add new line
  // validate line
  const validateLineBeforeAdd = (i, justOne, goal, type) => {
    let validate = true

    if (goal) {
      if (!(form.getFieldInstance(goal) && form.getFieldValue(goal))) {
        form.setFields([
          {
            name: goal,
            //   value: values.user,
            errors: [String('Lütfen Ürün Özeliklerini Giriniz')],
          },
        ])
        validate = false
      } else {
        form.setFields([
          {
            name: goal,
            //   value: values.user,
            errors: [],
          },
        ])
      }
    } else {
      if (
        !(
          form.getFieldInstance(`adjtr_${i}`) &&
          form.getFieldValue(`adjtr_${i}`)
        )
      ) {
        form.setFields([
          {
            name: `adjtr_${i}`,
            errors: [String('Lütfen Ürün Özeliklerini Giriniz')],
          },
        ])
        validate = false
        if (justOne) return validate
      } else {
        form.setFields([
          {
            name: `adjtr_${i}`,
            errors: [],
          },
        ])
      }
      if (
        !(
          form.getFieldInstance(`adjar_${i}`) &&
          form.getFieldValue(`adjar_${i}`)
        )
      ) {
        form.setFields([
          {
            name: `adjar_${i}`,
            errors: [String('Lütfen Ürün Özeliklerini Giriniz')],
          },
        ])
        validate = false
        if (justOne) return validate
      } else {
        form.setFields([
          {
            name: `adjar_${i}`,
            errors: [],
          },
        ])
      }
      if (
        !(
          form.getFieldInstance(`adjen_${i}`) &&
          form.getFieldValue(`adjen_${i}`)
        )
      ) {
        form.setFields([
          {
            name: `adjen_${i}`,
            errors: [String('Lütfen Ürün Özeliklerini Giriniz')],
          },
        ])
        validate = false
        if (justOne) return validate
      } else {
        form.setFields([
          {
            name: `adjen_${i}`,
            errors: [],
          },
        ])
      }
      if (adjects[i].type === 1) {
        if (
          !(
            form.getFieldInstance(`adjvalue_${i}`) &&
            form.getFieldValue(`adjvalue_${i}`)
          )
        ) {
          form.setFields([
            {
              name: `adjvalue_${i}`,
              errors: [String('Lütfen değer giriniz')],
            },
          ])
          validate = false
          if (justOne) return validate
        } else {
          form.setFields([
            {
              name: `adjvalue_${i}`,
              errors: [],
            },
          ])
        }
      }
      if (adjects[i].type === 2) {
        if (
          !(
            form.getFieldInstance(`adjMenvalue_${i}`) &&
            form.getFieldValue(`adjMenvalue_${i}`)
          )
        ) {
          form.setFields([
            {
              name: `adjMenvalue_${i}`,
              errors: [String('Lütfen değer1 giriniz')],
            },
          ])
          validate = false
          if (justOne) return validate
        } else {
          form.setFields([
            {
              name: `adjMenvalue_${i}`,
              errors: [],
            },
          ])
        }
        if (
          !(
            form.getFieldInstance(`adjMtrvalue_${i}`) &&
            form.getFieldValue(`adjMtrvalue_${i}`)
          )
        ) {
          form.setFields([
            {
              name: `adjMtrvalue_${i}`,
              errors: [String('Lütfen değer2 giriniz')],
            },
          ])
          validate = false
          if (justOne) return validate
        } else {
          form.setFields([
            {
              name: `adjMtrvalue_${i}`,
              errors: [],
            },
          ])
        }
        if (
          !(
            form.getFieldInstance(`adjMarvalue_${i}`) &&
            form.getFieldValue(`adjMarvalue_${i}`)
          )
        ) {
          form.setFields([
            {
              name: `adjMarvalue_${i}`,
              errors: [String('Lütfen değer3 giriniz')],
            },
          ])
          validate = false
          if (justOne) return validate
        } else {
          form.setFields([
            {
              name: `adjMarvalue_${i}`,
              errors: [],
            },
          ])
        }
      }
    }
    return validate
  }

  // add new line
  const addNewLine = (i, type, event) => {
    event.preventDefault()
    setAdjects((prev) =>
      prev.concat([
        {
          adj_en: '',
          adj_tr: '',
          adj_ar: '',
          type: type, // 1 => One Value - 2 => Multi Value
          adj_value: [''],
        },
      ])
    )
  }

  // add new value to line
  const addNewValueToLineHandler = (e, lineIndex, valueIndex) => {
    e.preventDefault()
    if (
      !adjects[lineIndex].adj_value[valueIndex] ||
      !adjects[lineIndex].adj_value[valueIndex].trim() === ''
    ) {
      message.warning('Please enter unfilled values before')
      return false
    }
    setAdjects((prev) => {
      let newArr = prev
      for (let i = 0; i < newArr.length; i++) {
        if (i !== lineIndex) continue
        newArr[i].adj_value.push('')
      }
      return [...newArr]
    })
  }

  // remove a value from line
  const removeValueFromLineHandler = (e, lineIndex, valueIndex) => {
    e.preventDefault()
    setAdjects((prev) => {
      let newArr = prev
      for (let i = 0; i < newArr.length; i++) {
        if (i !== lineIndex) continue
        newArr[i].adj_value.splice(valueIndex, 1)
      }
      return [...newArr]
    })
  }

  // set line input values
  const handleLineInputValuesOnChange = (event, lineIndex, inputIndex) => {
    setAdjects((prev) => {
      let newArr = prev
      newArr[lineIndex].adj_value[inputIndex] = event.target.value
      return [...newArr]
    })
  }

  // set input value
  const handleInputOnChange = (event, elementIndex, name) => {
    let lineItem = adjects.map((item, i) => {
      console.log('elementIndex', elementIndex, 'name', name)
      if (elementIndex !== i) return item
      return { ...item, [name]: event.target.value }
    })
    setAdjects(lineItem)
  }

  // remove line
  const removeLine = (elementIndex) => {
    if (adjects.length === 1) {
      setAdjects((prev) => [
        { adj_en: '', adj_ar: '', adj_tr: '', adj_value: [''], type: 1 },
      ])
      form.setFieldsValue({
        [`adjar_${0}`]: '',
        [`adjen_${0}`]: '',
        [`adjtr_${0}`]: '',
        [`adjvalue_${0}`]: '',
      })
    } else {
      setAdjects((prev) => {
        let newObj = prev
        newObj = newObj.filter((item, i) => elementIndex !== i)
        return [...newObj]
      })
    }
  }

  // useEffects
  useEffect(() => {
    if (id && status !== 'loading') {
      getAd()
    }
  }, [id, status])
  useEffect(() => {
    if (!getLoading && !getError && getData) {
      getListCategory()
      const _data = getData?.description?.data

      form.setFieldsValue({
        // ModelID: "1ec0aaf3-bdf3-497e-9484-895bc26dc9c6",
        category: _data?.category,
        title_tr: _data?.title_tr,
        title_en: _data?.title_en,
        title_ar: _data?.title_ar,
        desc_ar: _data?.desc_ar,
        desc_en: _data?.desc_en,
        desc_tr: _data?.desc_tr,
      })
      if (_data?.video) {
        // setVideoFile({
        //   prev: _data?.video,
        //   file: true,
        //   validate: false,
        // });
      }
      setPrimaryFile({
        prev: _data?.primary_image,
        file: true,
        validate: false,
      })

      setImage1({
        prev: _data?.image1,
        file: true,
        validate: false,
      })
      setImage2({
        prev: _data?.image2,
        file: true,
        validate: false,
      })
      setImage3({
        prev: _data?.image3,
        file: true,
        validate: false,
      })
      console.log('Product image Found ...')
      setProductImage({
        prev: _data?.productImage,
        file: true,
        validate: false,
      })
      setAdjects((prev) => {
        let newAdjects = []
        if (_data?.adjects?.length > 0) {
          _data?.adjects?.map((__item) => {
            newAdjects.push({
              adj_en: __item?.adj_en,
              adj_tr: __item?.adj_tr,
              adj_ar: __item?.adj_ar,
              adj_value:
                __item?.adj_value?.length === 0 ? [''] : __item?.adj_value,
            })
          })
          setAdjects([...newAdjects])
        } else {
          newAdjects.push({
            adj_en: '',
            adj_tr: '',
            adj_ar: '',
            adj_value: [''],
          })
        }
        return [...newAdjects]
      })
    }
  }, [getData, getLoading, getError])

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

      return false
    },
    primaryFile,
  }

  const videoProps = {
    accept: 'video/mp4,video/x-m4v,video/*',
    showUploadList: false,
    disabled: videoFile.file ?? false,
    onRemove: (file) => {
      setVideoFile({ file: null, prev: null, validate: false })
    },
    beforeUpload: (file) => {
      if (file.size >= 1048576 * 25) {
        message.error('Video size must be less than 5Mb')
        return false
      }
      setVideoFile((prev) => {
        // check
        const validate = videoValidate(file)
        if (!validate) return prev
        // set video
        let newObj = prev
        newObj.file = file
        newObj.prev = 'have file'
        newObj.validate = false
        return {
          ...newObj,
        }
      })

      return false
    },
  }

  const image1Props = {
    // accept: "image/png, image/jpeg",
    showUploadList: false,
    disabled: image1.file ?? false,
    onRemove: (file) => {
      setImage1({ file: null, prev: null, validate: false })
    },
    beforeUpload: (file) => {
      if (file.size >= 1048576 * 25) {
        message.error('File size must be less than 1Mb')
        return false
      }
      setImage1((prev) => {
        // validate image
        const validate = imageValidate(file)
        if (!validate) return prev
        // set File
        let newObj = prev
        newObj.file = file
        newObj.prev = URL.createObjectURL(file)
        newObj.validate = false
        return {
          ...newObj,
        }
      })

      return false
    },
    image1,
  }
  const image2Props = {
    // accept: "image/png, image/jpeg",
    showUploadList: false,
    disabled: image2.file ?? false,
    onRemove: (file) => {
      setImage2({ file: null, prev: null, validate: false })
    },
    beforeUpload: (file) => {
      if (file.size >= 1048576 * 25) {
        message.error('File size must be less than 1Mb')
        return false
      }
      setImage2((prev) => {
        // validate image
        const validate = imageValidate(file)
        if (!validate) return prev
        // set File
        let newObj = prev
        newObj.file = file
        newObj.prev = URL.createObjectURL(file)
        newObj.validate = false
        return {
          ...newObj,
        }
      })

      return false
    },
    image2,
  }
  const image3Props = {
    // accept: "image/png, image/jpeg",
    showUploadList: false,
    disabled: image3.file ?? false,
    onRemove: (file) => {
      setImage3({ file: null, prev: null, validate: false })
    },
    beforeUpload: (file) => {
      if (file.size >= 1048576 * 25) {
        message.error('File size must be less than 1Mb')
        return false
      }
      setImage3((prev) => {
        // validate image
        const validate = imageValidate(file)
        if (!validate) return prev
        // set File
        let newObj = prev
        newObj.file = file
        newObj.prev = URL.createObjectURL(file)
        newObj.validate = false
        return {
          ...newObj,
        }
      })

      return false
    },
    image3,
  }
  const productFile = {
    // accept: "image/png, image/jpeg",
    showUploadList: false,
    disabled: productImage.file ?? false,
    onRemove: (file) => {
      setProductImage({ file: null, prev: null, validate: false })
    },
    beforeUpload: (file) => {
      if (file.size >= 1048576 * 25) {
        message.error('File size must be less than 1Mb')
        return false
      }
      setProductImage((prev) => {
        // validate image
        const validate = imageValidate(file)
        if (!validate) return prev
        // set File
        let newObj = prev
        newObj.file = file
        newObj.prev = URL.createObjectURL(file)
        newObj.validate = false
        return {
          ...newObj,
        }
      })

      return false
    },
    productImage,
  }

  const UploadFileCom = ({ text }) => (
    <div style={{ textAlign: 'center' }}>
      <PlusOutlined />
      <div style={{ marginTop: 9 }}>{text}</div>
    </div>
  )

  const InputSuffix = ({ lineIndex, valueIndex }) => {
    return (
      <Space>
        {adjects[lineIndex].adj_value.length !== 1 && (
          <a
            href="#d"
            onClick={(e) =>
              removeValueFromLineHandler(e, lineIndex, valueIndex)
            }
            style={{ color: 'red' }}
          >
            <MinusCircleFilled color="red" />
          </a>
        )}

        {valueIndex + 1 === adjects[lineIndex].adj_value.length && (
          <a
            href="#d"
            onClick={(e) => addNewValueToLineHandler(e, lineIndex, valueIndex)}
            style={{ color: 'green' }}
          >
            <PlusCircleFilled color="green" />
          </a>
        )}
      </Space>
    )
  }

  ;(function () {
    console.log('adjects')
    console.log(adjects)
    adjects.map((item, i) => {
      let valuesObj = {}
      valuesObj[`adjar_${i}`] = item?.adj_ar
      valuesObj[`adjen_${i}`] = item?.adj_en
      valuesObj[`adjtr_${i}`] = item?.adj_tr
      item?.adj_value?.map((itemValue, index) => {
        valuesObj[`line_${i}_value_${index}`] = itemValue
      })
      form.setFieldsValue({
        ...valuesObj,
      })
      valuesObj = {}
    })
  })()

  return (
    <FormContainer>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormFinish}
        onValuesChange={(changedValue, allValues) => {
          let keyname
          let keys = Object.keys(changedValue).some(function (key) {
            keyname = key
            return /adj/.test(key)
          })
          if (keys) {
            for (let i = 0; i < adjects.length; i++) {
              validateLineBeforeAdd(i, true, keyname)
            }
          }
        }}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              name="category"
              label={t('common:form.category')}
              rules={[
                {
                  required: true,
                  message: t('common:form.validation.required.message', {
                    name: t('common:form.category'),
                  }),
                },
              ]}
              tooltip={{
                title: t('addad:tooltips.kategori'),
                placement: router.locale === 'ar' ? 'left' : 'right',
              }}
            >
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder={t('common:form.category')}
                optionFilterProp="children"
                // onChange={() => console.log("on change")}
                onFocus={getListCategory}
                loading={loadings === 'categoryList'}
                mode="multiple"
                // onSearch={(value) => countryListSearch(value)}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {listCategory.map((item, i) => {
                  return (
                    <Select.Option
                      key={item?._id}
                      // value={`${item?._id}/${item?.googleCode}`}
                      value={`${item?._id}`}
                    >
                      {item[`title_${router.locale}`]}
                    </Select.Option>
                  )
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <Tooltip title={t('addad:tooltips.primary_photo')}>
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
                            {t('delete')}
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
                            ? t('addad:tooltips.primary_photo_title')
                            : primaryFile.validate}
                        </h2>
                      )}
                    </PrimaryImageOuter>
                  </UploadPrimary>
                </Tooltip>
              </Col>
              <Row
                gutter={24}
                style={{ justifyContent: 'center', width: '100%' }}
              >
                <Col>
                  <Tooltip title={t('addad:tooltips.photo_1')}>
                    <UploadSmall
                      // className={`${style.small_upload} ${
                      //   image1.file ? style.no_br : ""
                      // } ${image1.validate !== false ? style.err : ""}`}
                      {...image1Props}
                    >
                      {image1.file ? (
                        <div>
                          <Image
                            alt="ad image 1"
                            layout="fill"
                            objectFit="contain"
                            src={image1?.ready ? image1?.ready : image1.prev}
                          />
                          <RemoveButtonLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              setImage1({
                                file: null,
                                prev: null,
                                ready: null,
                                validate: false,
                              })
                            }}
                          >
                            <DeleteOutlined />
                          </RemoveButtonLink>

                          {processing === 'image1' && (
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
                        </div>
                      ) : (
                        <>
                          {image1.validate === false ? (
                            <UploadFileCom text={t('addad:tooltips.title_1')} />
                          ) : (
                            <span>{image1.validate}</span>
                          )}
                        </>
                      )}
                    </UploadSmall>
                  </Tooltip>
                </Col>
                <Col>
                  <Tooltip title={t('addad:tooltips.photo_1')}>
                    <UploadSmall {...image2Props}>
                      {image2.file ? (
                        <div>
                          <Image
                            alt="ad image 2"
                            layout="fill"
                            objectFit="contain"
                            src={image2.ready ? image2.ready : image2.prev}
                          />
                          <RemoveButtonLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              setImage2({
                                file: null,
                                prev: null,
                                ready: null,
                                validate: false,
                              })
                            }}
                          >
                            <DeleteOutlined />
                          </RemoveButtonLink>
                          {processing === 'image2' && (
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
                        </div>
                      ) : (
                        <>
                          {image2.validate === false ? (
                            <UploadFileCom text={t('addad:tooltips.title_2')} />
                          ) : (
                            <span>{image2.validate}</span>
                          )}
                        </>
                      )}
                    </UploadSmall>
                  </Tooltip>
                </Col>
                <Col>
                  <Tooltip title={t('addad:tooltips.photo_2')}>
                    <UploadSmall {...image3Props}>
                      {image3.file ? (
                        <div>
                          <Image
                            alt="ad image 3"
                            layout="fill"
                            objectFit="contain"
                            src={image3.ready ? image3.ready : image3.prev}
                          />
                          <RemoveButtonLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              setImage3({
                                file: null,
                                prev: null,
                                ready: null,
                                validate: false,
                              })
                            }}
                          >
                            <DeleteOutlined />
                          </RemoveButtonLink>
                          {processing === 'image3' && (
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
                        </div>
                      ) : (
                        <>
                          {image3.validate === false ? (
                            <UploadFileCom text={t('addad:tooltips.title_3')} />
                          ) : (
                            <span>{image3.validate}</span>
                          )}
                        </>
                      )}
                    </UploadSmall>
                  </Tooltip>
                </Col>
              </Row>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  name="title_tr"
                  label={t('addad:productTr')}
                  rules={[
                    {
                      required: true,
                      message: t('common:form.validation.required.message', {
                        name: t('addad:tooltips.productTr'),
                      }),
                    },
                  ]}
                  tooltip={t('addad:productTr')}
                >
                  <Input placeholder={t('addad:tooltips.productTr')} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="title_ar"
                  tooltip={t('addad:tooltips.productAr')}
                  label={t('addad:productAr')}
                  rules={[
                    {
                      // required: router.locale === "ar",
                      required: false,
                      message: t('common:form.validation.required.message', {
                        name: t('addad:tooltips.productAr'),
                      }),
                    },
                  ]}
                >
                  <Input placeholder={t('addad:productAr')} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="title_en"
                  label={t('addad:productEn')}
                  tooltip={t('addad:tooltips.productEn')}
                  rules={[
                    {
                      // required: router.locale === "en",
                      required: false,
                      message: t('common:form.validation.required.message', {
                        name: t('addad:tooltips.productEn'),
                      }),
                    },
                  ]}
                >
                  <Input placeholder={t('addad:productEn')} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={t('addad:dsecTr')}
                  name="desc_tr"
                  tooltip={t('addad:tooltips.dsecTr')}
                  rules={[
                    {
                      required: true,
                      message: t('common:form.validation.required.message', {
                        name: t('addad:tooltips.dsecTr'),
                      }),
                    },
                  ]}
                >
                  <Input placeholder={t('addad:dsecTr')} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={t('addad:dsecAr')}
                  tooltip={t('addad:tooltips.dsecAr')}
                  name="desc_ar"
                  rules={[
                    {
                      required: false,
                      message: t('common:form.validation.required.message', {
                        name: t('addad:tooltips.dsecAr'),
                      }),
                    },
                  ]}
                >
                  <Input placeholder={t('addad:dsecAr')} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={t('addad:dsecTr')}
                  tooltip={t('addad:tooltips.dsecEn')}
                  name="desc_en"
                  rules={[
                    {
                      required: false,
                      message: t('common:form.validation.required.message', {
                        name: t('addad:tooltips.dsecEn'),
                      }),
                    },
                  ]}
                >
                  <Input placeholder={t('addad:dsecEn')} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <h2>{t('addad:sections.adjects')}</h2>
            {adjects.map((item, i) => (
              <Row gutter={24} key={i}>
                <Col xs={24} sm={21} md={22}>
                  <Row gutter={24}>
                    <Col xs={12} sm={12} md={6}>
                      <Form.Item
                        label={t('addad:adjTr')}
                        name={'adjtr_' + i}
                        initialValue={item.adj_tr}
                      >
                        <Input
                          onChange={(e) => handleInputOnChange(e, i, 'adj_tr')}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={6}>
                      <Form.Item
                        label={t('addad:adjAr')}
                        name={'adjar_' + i}
                        initialValue={item.adj_ar}
                      >
                        <Input
                          onChange={(e) => handleInputOnChange(e, i, 'adj_ar')}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={6}>
                      <Form.Item
                        label={t('addad:adjEn')}
                        name={'adjen_' + i}
                        initialValue={item.adj_en}
                      >
                        <Input
                          onChange={(e) => handleInputOnChange(e, i, 'adj_en')}
                        />
                      </Form.Item>
                    </Col>
                    {item?.adj_value?.map((itemValue, indexValue) => {
                      return (
                        <Col xs={12} sm={12} md={6} key={indexValue}>
                          <Form.Item
                            label={t('addad:value')}
                            name={'line_' + i + '_value_' + indexValue}
                            initialValue={itemValue}
                          >
                            <Input
                              onChange={(e) =>
                                handleLineInputValuesOnChange(e, i, indexValue)
                              }
                              suffix={
                                <InputSuffix
                                  lineIndex={i}
                                  valueIndex={indexValue}
                                />
                              }
                            />
                          </Form.Item>
                        </Col>
                      )
                    })}
                  </Row>
                </Col>
                <Col
                  xs={24}
                  sm={3}
                  md={2}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Space>
                    <Tooltip
                      title={t('common:form.remove', {
                        name:
                          router.locale === 'ar'
                            ? 'سطر'
                            : router.locale === 'en'
                            ? 'Line'
                            : 'Satırı',
                      })}
                      placement="top"
                    >
                      <RoundedLink
                        type="danger"
                        onClick={(e) => {
                          e.preventDefault()
                          removeLine(i)
                        }}
                      >
                        <MinusOutlined />
                      </RoundedLink>
                    </Tooltip>
                    {i + 1 === adjects.length && (
                      <Tooltip
                        title={t('common:form.new', {
                          name:
                            router.locale === 'ar'
                              ? 'سطر'
                              : router.locale === 'en'
                              ? 'Line'
                              : 'Satır',
                        })}
                        placement="top"
                      >
                        <RoundedLink
                          type="success"
                          onClick={(e) => addNewLine(i, 2, e)}
                        >
                          <PlusOutlined />
                        </RoundedLink>
                      </Tooltip>
                    )}
                  </Space>
                </Col>
              </Row>
            ))}
          </Col>
          <Col span={24}>
            <Space>
              <Button
                htmlType="submit"
                // onClick={handleValidateFiles}
                loading={formLoading}
              >
                {id ? t('common:edit') : t('common:confirm')}
              </Button>
              <Button
                type="primary"
                onClick={() => router.push('/admin/products')}
                danger
                disabled={formLoading}
              >
                {t('common:cancel')}
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}

export default AddPageContent
