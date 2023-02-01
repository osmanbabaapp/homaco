import React, { ReactNode } from "react";

const Container = (props: { children: ReactNode | [ReactNode] }) => {
  return (
    <div className="max-w-3xl px-2 lg:max-w-[80vw]  lg:px-0 m-auto">
      {props.children}
    </div>
  );
};

export default Container;
