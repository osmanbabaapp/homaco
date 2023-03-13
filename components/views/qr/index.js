import { useRouter } from "next/router";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

function QrScreen({ data }) {
  const { locale, route } = useRouter();
  const { t } = useTranslation("common");

  const onPhoneCall = () => {
    console.log("11111 :>> ", 11111);
  };
  const onEmail = () => {
    console.log("22222 :>> ", 22222);
  };
  const onDirection = () => {
    console.log("33333 :>> ", 33333);
  };

  return (
    <div className="flex flex-col justify-center h-[100vh] w-[100vw]   qr-page-bg-style">
      <div className="flex top-[20px] left-[28%]  z-[400] absolute  ">
        <Image src={"/imgs/logo.png"} alt="asd" width={180} height={100} />
      </div>

      <div className="top-[160px] z-[200] absolute  h-[40px] w-[100%] qr-bg-gradient-heading" />

      <div className="flex absolute top-[110px] z-[300] items-center justify-around h-[40px] w-[100%] font-bold font-[Bahij]">
        <span className="text-[#E4D078] text-[24px]">{t("qr.unitedAmbalaj")}</span>
      </div>

      <div className="flex absolute top-[160px] z-[300] items-center justify-around h-[40px] w-[100%]">
        <a href="tel:+50225079227;1" target="_blank" rel="noopener noreferrer">
          <span className="text-black text-[20px] font-bold font-[Bahij]">{t("qr.call")}</span>
        </a>

        <div className="h-[18px] w-[1px] bg-black"></div>

        <a
          href={`mailto:homacoalhasan@gmail.com?subject=Subject&body=message%20goes%20here`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-black text-[20px] font-bold font-[Bahij]">{t("qr.email")}</span>
        </a>

        <div className="h-[18px] w-[1px] bg-black"></div>

        <a href={`https://goo.gl/maps/qGru7ih9HPQtr3Ja6`} target="_blank" rel="noopener noreferrer">
          <span className="text-black text-[20px] font-bold font-[Bahij]">{t("qr.direction")}</span>
        </a>
      </div>

      <div className="mt-[240px] w-[100%] px-[40px]">
        <div className="flex items-center w-[100%] my-[13px] ">
          <div className="h-[60px] w-[60px]">
            <Image src={"/images/qr-tel.png"} alt="asd" width={100} height={100} />
          </div>

          <div className="flex flex-col w-[100%] items-center">
            <a href="tel:+50225079227;1">
              <span /* onClick={() => onPhoneCall()} */ className="text-white text-[18px] my-[16px]">
                +905385800069
              </span>
            </a>

            <div className="h-[1.5px] w-[76%] bg-indigo-200 saparate-line-gradient-heading my-[16px]"></div>
          </div>
        </div>

        <div className="flex items-center w-[100%]  my-[13px]">
          <div className="h-[60px] w-[60px]">
            <Image src={"/images/qr-product.png"} alt="asd" width={100} height={100} />
          </div>

          <div className="flex flex-col w-[100%] items-center">
            <a href="https://homacomakina.com/">
              <span /* onClick={() => onPhoneCall()} */ className="text-white text-[18px] my-[16px]">
                {t("qr.ourProducts")}
              </span>
            </a>

            <div className="h-[1.5px] w-[76%] bg-indigo-200 saparate-line-gradient-heading my-[16px]"></div>
          </div>
        </div>

        <div className="flex items-center w-[100%] my-[13px] ">
          <div className="h-[60px] w-[60px]">
            <Image src={"/images/qr-web.png"} alt="asd" width={100} height={100} />
          </div>

          <div className="flex flex-col w-[100%] items-center">
            <a href="https://homacomakina.com/">
              <span /* onClick={() => onPhoneCall()} */ className="text-white text-[18px] my-[16px]">
                homacomakina.com
              </span>
            </a>

            <div className="h-[1.5px] w-[76%] bg-indigo-200 saparate-line-gradient-heading my-[16px]"></div>
          </div>
        </div>

        <div className="flex items-center w-[100%] my-[13px] ">
          <div className="h-[60px] w-[60px]">
            <Image src={"/images/qr-map.png"} alt="asd" width={100} height={100} />
          </div>

          <div className="flex flex-col w-[100%] items-center">
            <a href="https://homacomakina.com/" className="flex flex-col justify-center   items-center">
              <span /* onClick={() => onPhoneCall()} */ className="text-white text-[18px] my-[0px] text-center p-[10px] ">
                {/* 27600 Baspinar Osb/ Sehitkamil/Gaziantep */}
                SANAYİ MAH.60346SK.NO:6 ŞEHİTKAMİL, GAZİANTEP
              </span>
            </a>

            <div className="h-[1.5px] w-[76%] bg-indigo-200 saparate-line-gradient-heading my-[16px]"></div>
          </div>
        </div>
      </div>

      <div className="pr-[30px] mt-[10px] w-[100%]   flex items-center justify-between  mb-[40px] px-[80px]">
        <div className="h-[82px] w-[90px]">
          <a href="https://www.facebook.com/homacomakina.com" className="flex flex-col justify-center   items-center">
            <Image src={"/images/face.png"} alt="asd" width={108} height={100} />
          </a>
        </div>

        <div className="h-[82px] w-[90px]">
          <a href="https://www.instagram.com/homacomakina.com" className="flex flex-col justify-center   items-center">
            <Image src={"/images/insta.png"} alt="asd" width={108} height={100} />
          </a>
        </div>

        <div className="h-[82px] w-[90px]">
          <a
            href={`//api.whatsapp.com/send?phone=+905385800069_NUMBER&text=Hi`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col justify-center   items-center"
          >
            <Image src={"/images/whats.png"} alt="asd" width={108} height={100} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default QrScreen;
