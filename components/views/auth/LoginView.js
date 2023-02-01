import Head from "next/head";
import { Button, Form, Input, message } from "antd";
import { LayoutContext } from "context/layout.context";
import { useContext } from "react";
// import HomePageContent from "components/views";
import LanguageSwitcher from "layouts/main/components/language-switcher";

import { useRouter } from "next/router";
import https from "https";
import axios from "axios";
import { useCallback, useState } from "react";
import useTranslation from "next-translate/useTranslation";

export default function LoginView(props) {
  // const { sideOpen } = useContext(LayoutContext);
  const router = useRouter();
  const { t } = useTranslation(["common"]);

  // const { id } = router.query;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const locale = router.locale;

  const onLogin = useCallback(() => {
    if (email.toLocaleLowerCase() === "dahermakina" && password === "12345") {
      router.push("home-page");
    } else {
      message.error(t("common:messages.userNameOrPassWordError"));
    }
  }, [email, password, router, t]);

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      {/* <button onClick={() => onLogin()}> Login</button> */}
      <main
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          marginTop: 120,
        }}
      >
        <div>
          <LanguageSwitcher />
        </div>
        <img src="/media/dahir/logo2.png" width={200} style={{}} />

        <form onSubmit={() => onLogin()} style={{ justifyContent: "center", alignItems: "center" }}>
          <h1 className="h3 mb-3 fw-normal">{t("common:messages.pleaseLogin")}</h1>

          <div className="form-floating" style={{ maxWidth: 160, margin: 10 }}>
            <Input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder={t("common:messages.userName")}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <label htmlFor="floatingInput">Email address</label> */}
          </div>
          <div className="form-floating" style={{ maxWidth: 160, margin: 10 }}>
            <Input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder={t("common:messages.password")}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <label htmlFor="floatingPassword">Password</label> */}
          </div>

          {/* <div>
              <label>
                <input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div> */}
          <Button
            onClick={() => onLogin()}
            className="w-100 btn btn-lg btn-primary"
            type="submit"
            style={{ maxWidth: 160, margin: 10 }}
          >
            Sign in
          </Button>
        </form>
      </main>
    </>
  );
}
