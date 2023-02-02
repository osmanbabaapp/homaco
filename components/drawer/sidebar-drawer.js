import {
  Button,
  Col,
  Divider,
  Dropdown,
  Row,
  Space,
  Form,
  Input,
  message,
} from "antd";
// components
import FlexDiv from "@/components/utils/flex-div";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import styled from "styled-components";
import Text from "@/components/utils/text";
import { useDispatch } from "react-redux";
import { useCallback, useContext } from "react";
// import { AuthContext } from "context/auth-context/auth-context";
import { useRouter } from "next/router";
import { closeDrawer } from "@/redux/drawer/actions";
// import LanguageSwitcher from "layouts/default/components/language-switcher";
import { TbReportAnalytics } from "react-icons/tb";
const LogoContainer = styled.div`
  max-width: 200px;
  min-width: 150px;
  > img {
    max-width: 300px;
  }
`;
export const InfoTitle = styled.div`
  display: flex;
  color: ${(props) => props.theme.colors.secondary};
  font-weight: 600;
  font-size: 16px;
`;
export default function SidesBarDrawer({
  open,
  onClose,
  payload,
  locale,
  role = ["User"],
}) {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const router = useRouter();
  const { dispatch: _dispatch, user } = useContext(null);

  const handleLogout = useCallback(
    (e) => {
      e.preventDefault();
      message.success(t("messages.successLogout"));
    },
    [_dispatch, t]
  );

  const onCloseDrawer = () => {
    dispatch(closeDrawer());
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* <a onClick={onCloseDrawer}>
        <LogoContainer>
          <Logo />
        </LogoContainer>
      </a> */}
      <Divider type="horizontal" />
      {user ? (
        <>
          {role?.includes("Company") ? (
            <Link legacyBehavior href={"/dashboard"} locale={router.locale}>
              <a onClick={onCloseDrawer}>
                <InfoTitle>{"companyName"}</InfoTitle>
              </a>
            </Link>
          ) : (
            <>
              <Link legacyBehavior href={"/dashboard"} locale={router.locale}>
                <a onClick={onCloseDrawer}>
                  <InfoTitle>{user?.userName}</InfoTitle>
                </a>
              </Link>
              <Divider type="horizontal" width={"50%"} />
            </>
          )}
        </>
      ) : (
        ""
      )}
      <FlexDiv direction="column" gap={20}>
        <Link legacyBehavior href="/category" scroll={true}>
          <a onClick={onCloseDrawer}>
            <InfoTitle>{t("navbar.categories")} </InfoTitle>
          </a>
        </Link>

        <Link legacyBehavior href="/packages" scroll={true}>
          <a onClick={onCloseDrawer}>
            <InfoTitle>{t("navbar.offers")} </InfoTitle>
          </a>
        </Link>

        <Link legacyBehavior href="/contract" scroll={true}>
          <a onClick={onCloseDrawer}>
            <InfoTitle>{t("footer.contract")}</InfoTitle>
          </a>
        </Link>

        <Link legacyBehavior href="/translation" scroll={true}>
          <a onClick={onCloseDrawer}>
            <InfoTitle>{t("footer.translaing-service")}</InfoTitle>
          </a>
        </Link>
        {/* <Link legacyBehavior href="/eimza" scroll={true}>
          <InfoTitle>{t("footer.eimza-service")}</InfoTitle>
        </Link> */}
        {/* <Link legacyBehavior href="/stateid" scroll={true}>
          <InfoTitle>{t("footer.state-ait")}</InfoTitle>
        </Link> */}
        {/* <Link legacyBehavior href="/faq" scroll={true}>
          <InfoTitle>{t("footer.faq")}</InfoTitle>
        </Link> */}
        <Link legacyBehavior href="/kurumsal" scroll={true}>
          <a onClick={onCloseDrawer}>
            <InfoTitle>{t("footer.about-us")}</InfoTitle>
          </a>
        </Link>

        <Link legacyBehavior href="/about-us" scroll={true}>
          <a onClick={onCloseDrawer}>
            <InfoTitle>{t("footer.why-us")}</InfoTitle>
          </a>
        </Link>

        <Link legacyBehavior href="/company" scroll={true}>
          <a onClick={onCloseDrawer}>
            <InfoTitle>{t("footer.company")}</InfoTitle>
          </a>
        </Link>

        <Link legacyBehavior href="/academy" scroll={true}>
          <a onClick={onCloseDrawer}>
            <InfoTitle>{t("navbar.academy")}</InfoTitle>
          </a>
        </Link>

        <a
          href="https://new.osmanbaba.net/surveys"
          target="_blank"
          rel="noreferrer"
        >
          <InfoTitle>
            <TbReportAnalytics />
            {t("navbar.surveys")}
          </InfoTitle>
        </a>
        {/* <LanguageSwitcher /> */}
        {user ? (
          <div>
            <a href="#" onClick={handleLogout}>
              <InfoTitle>{t("navbar.logout")}</InfoTitle>
            </a>
          </div>
        ) : (
          <a
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <InfoTitle>{t("navbar.login")}</InfoTitle>
          </a>
        )}
      </FlexDiv>
    </div>
  );
}
