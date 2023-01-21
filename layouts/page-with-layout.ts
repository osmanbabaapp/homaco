import { NextPage } from "next";
import { ReactElement } from "react";
import MainLayout from "./main-layout";

export type PageWithMainLayout = NextPage & { layout: typeof MainLayout };
export type PageWithAdminLayout = NextPage & { layout: typeof MainLayout };

export type PageWithLayoutType = PageWithMainLayout | PageWithAdminLayout;

export type LayoutProps = ({
  children,
}: {
  children: ReactElement;
}) => ReactElement;

export default PageWithLayoutType;
