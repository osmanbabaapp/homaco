import React, { ReactNode } from "react";
import PropTypes from "prop-types";

const Container = (props: { children: ReactNode | [ReactNode] }) => {
  return <div className="max-w-5xl m-auto">{props.children}</div>;
};

export default Container;
