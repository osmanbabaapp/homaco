import { useCallback, useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'
// import ProductsSlider from "@/components/sliders/products-slider";
import { useRouter } from 'next/router'
import axios from 'axios'

// components
import Container from '../../utils/container'
// import { PagesHeader } from "./pages-header";
import { Button, Col, Row, Image as AntImage } from 'antd'
import AdSlide, { SlideBreadImage } from '../../ad-page-slider'
import Text from '../../utils/text'
import useTranslation from 'next-translate/useTranslation'
// redux
import { useDispatch } from 'react-redux'
import { openDrawer } from '@/redux/drawer/actions'
import * as constants from 'redux/drawer/constants'

// styles
const PageContent = styled.div``

/* 
    This component used for product page sections title
    like: Name of ad, Details etc..
*/
export const Title = ({ title, as, locale, itemprop }) => {
  return (
    <Text
      as={as}
      type="primary"
      itemprop={itemprop}
      bold="bold"
      size={26}
      line={1}
      cstyle={`
        padding-inline-start: 40px;
        position: relative;
        &::before {
            content: "";
            position: absolute;
            ${locale === 'ar' ? 'right' : 'left'}: 15px;
            background-color: orange;
            width: 20px;
            height: 100%;
        }
        &::after {
            content: "";
            position: absolute;
            ${locale === 'ar' ? 'right' : 'left'}: 0;
            background-color: orange;
            width: 10px;
            height: 100%;
        }
    `}
    >
      {title}
    </Text>
  )
}

/* 
    This component used for product page detials table
    ad details will be displayed here
    !!! required props: list => to render details in table
*/

// styles
const CompanyDetails = styled.div`
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  position: relative;
  padding-top: 120px;
  padding-bottom: 60px;
  z-index: 5;
  margin-bottom: -40px;

  @media (max-width: 450px) {
    margin-bottom: -30px;
    margin-top: 60px;
  }
`

const CompanyLogo = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid orange;
  border-radius: 20px;
  overflow: hidden;

  @media (max-width: 450px) {
    top: -30px;
  }
`

const ProductNameText = styled.div`
  color: #fff;
  font-weight: bold;
  font-size: 26px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  // padding-inline-start: 40px;
  position: relative;
  display: flow-root;
  @media (max-width: 450px) {
    display: flow-root;
  }
`
const SocialLinks = styled.a`
  ${(props) => {
    let styles = `
        font-size: 24px;
      `
    if (props.facebook)
      return (
        styles +
        `
            color: #4267B2;
        `
      )
    else if (props.instagram)
      return (
        styles +
        `
            color: #cd486b;
        `
      )
    else if (props.whatsapp)
      return (
        styles +
        `
            color: #25D366;
        `
      )
    else if (props.twitter)
      return (
        styles +
        `
            color: #00acee;
        `
      )

    return styles
  }}
`

const Certificates = styled.div`
  margin-top: -60px;
  ${(props) =>
    props.back === true &&
    `
    margin-top: 0;
  `}

  @media (max-width: 450px) {
    margin-top: -40px;
  }
`
const CertificateItem = styled.div`
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 20px;
  background-color: #fff;
  position: relative;
  z-index: 10;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;

  @media (max-width: 450px) {
    margin-bottom: 10px;
  }
`

const AboutCompany = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  position: relative;
  z-index: 5;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  margin-top: -40px;
  padding-top: 30px;
  padding-bottom: 10px;
  border-radius: 20px;
  color: #fff;
  text-align: center;
  padding-right: 10px;
  padding-left: 10px;
`
const AboutCompanyHeader = styled.div`
  padding-top: 30px;

  @media (max-width: 450px) {
    margin-bottom: 10px;
  }
`

const StyledButton = styled(Button)`
  width: auto;
  border-radius: 20px;
  font-size: 26px;
  height: auto;
  border-color: orange;
  color: ${'red'};
  font-weight: bolder;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  &:hover {
    background-color: ${'red'};
    color: #fff;
    border-color: white;

    > span {
      color: #fff;
      border-color: orange;
    }
  }
`

export const UserInfoTitlePhone = styled.div`
  direction: ltr;
`

export default function OneAdV2Page({
  id,
  globalT,
  data,
  locale,
  categories,
  adjValues,
  company,
}) {
  const dispatch = useDispatch()

  const { t } = useTranslation('addad')

  const router = useRouter()

  const [loadingSimilarAdds, setLoadingSimilarAdds] = useState(false)
  const [similarAdds, setSimilarAdds] = useState(false)

  const childCategoryId = useMemo(
    () => categories?.[0]?.categoryID,
    [categories]
  )
  const parentCategoryId = useMemo(
    () => categories?.[0]?.parenCategory.result.id,
    [categories]
  )

  const [descriptions, setDescriptions] = useState([
    {
      id: '',
      type: 1,
      values: [1],
    },
  ])

  console.log('descriptions', descriptions)

  const [listDescriptions, setListDescriptions] = useState([])

  console.log('listDescriptions :>> ', listDescriptions)

  const [selected, setSelected] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadings, setLoadings] = useState(null)

  const [error, setError] = useState(null)

  const getListDescriptions = useCallback(async () => {
    // if (listDescriptions.length !== 0) return false;

    setLoadings('listDescriptions')
    const { data: res } = await axios.get(
      process.env.NEXT_PUBLIC_HOST +
        process.env.NEXT_PUBLIC_GET_ALL_DESCRIPTIONS,
      {
        headers: { websiteHostName: process.env.NEXT_PUBLIC_WEBSITE_HOST_NAME },
      }
    )

    setLoadings(null)

    if (res.status === true) {
      setListDescriptions(res.description)
    } else {
      message.error('Something went wrong! Please try again.')
    }
  }, [])

  const lol2 = [
    {
      asyncState: null,
      creationOptions: 0,
      exception: null,
      id: 1160,
      isCanceled: false,
      isCompleted: true,
      isCompletedSuccessfully: true,
      isFaulted: false,
      result: {
        id: '673ffc0e-34a5-443c-4bab-08dad45d9e49',
        adjactiveAR: 'الطاقة الإنتاجية - مغلف / دقيقة',
        adjactiveEN: 'Producing capacity - package / min',
        adjctiveTR: 'Üretim kapasitesi - paket / dk',
        value: ['40-200'],
      },
      status: 5,
    },
    {
      asyncState: null,
      creationOptions: 0,
      exception: null,
      id: 1161,
      isCanceled: false,
      isCompleted: true,
      isCompletedSuccessfully: true,
      isFaulted: false,
      result: {
        id: '5f249d48-eae3-4bfe-4bac-08dad45d9e49',
        adjactiveAR: 'نوع مبرمج التحكم الكهربائي ',
        adjactiveEN: 'Electrical control programmer type',
        adjctiveTR: 'Elektrik kontrol programlayıcı tipi',
        value: ['PLC'],
      },
      status: 5,
    },
    {
      asyncState: null,
      creationOptions: 0,
      exception: null,
      id: 1162,
      isCanceled: false,
      isCompleted: true,
      isCompletedSuccessfully: true,
      isFaulted: false,
      result: {
        id: '5f249d48-eae3-4bfe-4bac-08dad45d9e50',
        adjactiveAR: 'نوع مبرمج التحكم الكهربائي 2 ',
        adjactiveEN: 'Electrical control programmer type 2',
        adjctiveTR: 'Elektrik kontrol programlayıcı tipi 2',
        value: ['XYZ'],
      },
      status: 5,
    },
  ]

  const handleOpenContactDrawer = useCallback(() => {
    console.log('111111 :>> ', 111111)
    dispatch(
      openDrawer(constants.modalType_ContactCompany, () => false, {
        companyId: 'data?.id',
        productId: data?.id,
        productName: 'productName',
        adjs: lol2,
        productData: data,
      })
    )
  }, [adjValues, data, dispatch])

  useEffect(() => {
    // if (data?.id) {
    //   // getListDescriptions();
    //   const lol = async () => {
    //     setLoadingSimilarAdds(true)
    //     const { data: res } = await axios.post(
    //       'https://dashosmanbaba.com/api/ListByCategory',
    //       {
    //         id: childCategoryId,
    //       },
    //       {
    //         headers: {
    //           lang: router.locale,
    //           websiteHostName: process.env.NEXT_PUBLIC_WEBSITE_HOST_NAME,
    //         },
    //       }
    //     )
    //     if (res?.status === true) {
    //       if (res.description.length === 0) {
    //         const { data: res2 } = await axios.post(
    //           'https://dashosmanbaba.com/api/ListByCategory',
    //           {
    //             id: parentCategoryId,
    //           },
    //           {
    //             headers: {
    //               lang: router.locale,
    //               websiteHostName: process.env.NEXT_PUBLIC_WEBSITE_HOST_NAME,
    //             },
    //           }
    //         )
    //         if (res2.status === true) {
    //           setSimilarAdds(res2.description)
    //         } else {
    //           alert('Something went wrong 2 ! Please try again.')
    //         }
    //       } else {
    //         setSimilarAdds(res.description)
    //       }
    //     } else {
    //       alert('Something went wrong! Please try again.')
    //     }
    //     setLoadingSimilarAdds(false)
    //   }
    //   lol()
    //   const myDescriptions = data?.descriptionsId?.map((x) => {
    //     const lolType = listDescriptions.find(
    //       (y) => y.id === x.descriptionId
    //     )?.propertyDescType
    //     // if (lolType === 4) {
    //     //   setMinValueInput(x.optionsId.map((z) => Number(z))[0]);
    //     // }
    //     return {
    //       id: x.descriptionId,
    //       type: lolType,
    //       values: x.optionsId.map((z) => Number(z)),
    //     }
    //   })
    //   setDescriptions(myDescriptions)
    // }
  }, [childCategoryId, data, data?.id, parentCategoryId, router.locale])

  const ImageCol = () => (
    <Col md={24} lg={12}>
      <div>
        <AdSlide
          productName={data?.title}
          companyName={data?.publisher?.name}
          data={{
            primaryImage: data?.primary_image,
            image1: data?.image1,
            image2: data?.image2,
            image3: data?.image3,
            video: data?.video,
          }}
        />

        <div style={{ marginTop: 20 }}>
          <Row
            justify="space-around"
            gutter={[12, 12]}
            style={{
              margin: 'auto',
              marginBlockStart: 10,
              marginBlockEnd: 10,
            }}
          >
            <Col>
              <StyledButton size="large" onClick={handleOpenContactDrawer}>
                {t('askDet')}
              </StyledButton>
            </Col>
          </Row>
        </div>
      </div>
    </Col>
  )

  const DetailsCol = () => (
    <Col
      md={24}
      lg={12}
      style={{ direction: router.locale === 'ar' ? 'rtl' : 'ltr' }}
    >
      <div style={{ margin: '0px 0' }}>
        <ProductNameText>{data?.title}</ProductNameText>
        {data?.desc?.split('. ').map((x) => {
          return (
            <Text
              key={x}
              as="p"
              margin={[4, 0]}
              itemprop="description"
              style={{ fontSize: 16, fontWeight: 'normal', color: '#fff' }}
            >
              • {x}
            </Text>
          )
        })}

        <div style={{ borderRadius: 4, marginTop: 12 }}>
          <h2 className="text-white text-lg font-bold mb-2">
            {t('sections.adjects')}
          </h2>
          <div
            style={
              locale === 'ar'
                ? {
                    borderRadius: 4,
                    borderTop: `0.51px solid ${'red'}`,
                    width: '95%',
                    marginRight: '2.8%',
                  }
                : {
                    borderRadius: 4,
                    borderTop: `0.51px solid ${'red'}`,
                    width: '95%',
                    marginLeft: '2.8%',
                  }
            }
          />
          {data?.adjects?.map((item, idx) => {
            return (
              <div
                key={idx}
                style={{
                  borderColor: 'red',
                  alignItems: 'center',
                  flexDirection: 'row',
                  display: 'flex',
                }}
              >
                <div
                  style={
                    locale === 'ar'
                      ? {
                          borderLeft: `0.51px solid ${'red'}`,
                          borderBottom: `0.51px solid ${'red'}`,
                          paddingRight: 10,
                          width: '50%',
                          borderRadius: 14,
                        }
                      : {
                          borderRight: `0.51px solid ${'red'}`,
                          borderLeft: `0.51px solid ${'red'}`,
                          borderBottom: `0.51px solid ${'red'}`,
                          paddingLeft: 10,
                          width: '50%',
                          borderRadius: 14,
                        }
                  }
                >
                  <Text
                    as="p"
                    margin={[4, 0]}
                    itemProp="description"
                    style={{ fontSize: 14, fontWeight: 'normal' }}
                    color="#fff"
                  >
                    • {item?.title}
                  </Text>
                </div>

                <div
                  style={{
                    borderBottom: `0.51px solid ${'red'}`,
                    borderRight: `0.51px solid ${'red'}`,
                    paddingRight: 10,
                    width: '50%',
                    borderRadius: 14,
                  }}
                >
                  <Text
                    key={item.id}
                    as="p"
                    margin={[4, 0]}
                    itemprop="description"
                    style={{
                      fontSize: 16,
                      fontWeight: 'normal',
                      paddingLeft: 10,
                    }}
                    color="#272727"
                  >
                    {' '}
                    {item?.values?.map((valueItem, index) => {
                      return (
                        <span key={index} className="text-[#fff]  text-[14px]">
                          {valueItem}
                        </span>
                      )
                    })}
                  </Text>
                </div>
              </div>
            )
          })}
        </div>

        <Text
          as="p"
          margin={[4, 0]}
          itemprop="description"
          style={{
            fontSize: 22,
            fontWeight: 'normal',
            textAlign: 'center',
            marginTop: 18,
          }}
          color={'red'}
        >
          {t('price')}: {data?.price || 10000}
        </Text>
      </div>
      {/* <div style={{ marginTop: 10 }}>
        <Row
          justify="space-around"
          gutter={[12, 12]}
          style={{
            margin: "auto",
            marginBlockStart: 10,
            marginBlockEnd: 10,
          }}
        >
          <Col>
            <StyledButton size="large" onClick={handleOpenContactDrawer}>
              {t("form.requestPriceProposal")}
            </StyledButton>
          </Col>
        </Row>
      </div> */}
    </Col>
  )

  return (
    <Container
      className="mt-[160px] mb-[120px]  "
      itemScope
      itemtype="https://schema.org/Product"
    >
      {/* <PagesHeader
        title={locale === "ar" ? "إعلان" : locale === "tr" ? "Reklam" : "Ad"}
        list={categories}
        locale={locale}
        current={data?.[`title_${locale}`]}
      /> */}
      <div className="  ">
        <Row gutter={24}>
          {router.locale === 'ar' ? (
            <>
              <DetailsCol />
              <ImageCol />
            </>
          ) : (
            <>
              <ImageCol />
              <DetailsCol />
            </>
          )}
        </Row>
      </div>
    </Container>
  )
}
