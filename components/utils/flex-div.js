import styled from "styled-components";

import PropTypes, { string } from "prop-types";

const FlexDiv = styled.div`
  ${(props) => (props.relative ? "position: relative;" : "")}
  display: flex;
  ${(props) => {
    if (!props.noFlex)
      return `
    flex-direction: ${props.direction};
    gap: ${props.gap && Number.isInteger(props.gap) && `${props.gap}px`};
    justify-content: ${props.justifyContent ? props.justifyContent : null}};
    align-items: ${props.alignItems ? props.alignItems : null};
    flex-wrap: ${props.responsive ? "wrap" : "no-wrap"};
    `;
  }}
  flex: ${(props) => (props.flex ? props.flex : "")};
  background-color: ${(props) => {
    // if (props.type === "default") return props.theme.colors.default;
    if (props.bg) return props.bg;
    if (props.type === "primary") return props.theme.colors.primary;
    else if (props.type === "secondary") return props.theme.colors.secondary;
    else if (props.type === "tertiary") return props.theme.colors.tertiary;
    else if (props.type === "gray") return props.theme.colors.grayColor;
    else if (props.type === "bg") return props.theme.colors.bgColor;
  }};
  width: ${(props) =>
    props.width && Number.isInteger(props.width)
      ? props.width + "px"
      : props.width};
  height: ${(props) =>
    props.height && Number.isInteger(props.height)
      ? props.height + "px"
      : props.height};
  padding: ${(props) => {
    if (Number.isInteger(props.padding)) {
      return props.padding + "px";
    } else if (Array.isArray(props.padding)) {
      let str = ``;
      props.padding.map((num, i) => (str += `${props.padding[i]}px `));
      return str;
    }
  }};
  margin: ${(props) => {
    if (Number.isInteger(props.margin)) {
      return props.margin + "px";
    } else if (Array.isArray(props.margin)) {
      let str = ``;
      props.margin.map((num, i) => (str += `${props.margin[i]}px `));
      return str;
    } else if (props.margin) {
      return props.margin;
    }
  }};

  color: ${(props) => {
    // if (props.type === "default") return props.theme.colors.default;
    if (props.color === "primary") return props.theme.colors.primary;
    else if (props.color === "secondary") return props.theme.colors.secondary;
    else if (props.color === "tertiary") return props.theme.colors.tertiary;
    else if (props.color === "gray") return props.theme.colors.grayColor;
    else return props.color;
  }};

  ${(props) => (props.noFlex ? "display: block;" : "")}

  ${(props) => {
    if (props?.responsiveWhen && props?.responsiveWhen !== 0)
      return `
      @media (max-width: ${props.responsiveWhen}px ) {
        flex-wrap: warp;
      }
    `;
  }}

  ${(props) => {
    if (props.gradient && Array.isArray(props.gradient)) {
      return `
      background: linear-gradient(to right, ${props.gradient[0]}, ${props.gradient[1]});
      `;
    }
  }}
  ${(props) => {
    if (props.radius && Number.isInteger(props.radius)) {
      return `
      border-radius: ${props.radius}px;
      `;
    }
  }}

  ${(props) => (props.cstyle ? props.cstyle : "")}
`;

FlexDiv.propTypes = {
  direction: PropTypes.oneOf(["row", "column"]),
  gap: PropTypes.number,
  justifyContent: PropTypes.oneOf([
    "space-between",
    "space-around",
    "space-evenly",
    "stretch",
    "start",
    "end",
    "flex-start",
    "flex-end",
    "center",
  ]),
  alignItems: PropTypes.oneOf([
    "space-between",
    "space-around",
    "space-evenly",
    "stretch",
    "start",
    "end",
    "flex-start",
    "flex-end",
    "center",
  ]),
  padding: PropTypes.any,
  margin: PropTypes.any,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  cstyle: PropTypes.string,
  responsive: PropTypes.bool,
  responsiveWhen: PropTypes.number,
  relative: PropTypes.bool,
  gradient: PropTypes.array,
  radius: PropTypes.number,
  color: PropTypes.oneOfType([
    string,
    PropTypes.oneOf(["primary", "secondary", "tertiary", "gray", "default"]),
  ]),
};

FlexDiv.defaultProps = {
  direction: "row",
  gap: 0,
  justifyContent: null,
  alignItems: null,
  padding: null,
  margin: null,
  width: null,
  cstyle: null,
  responsive: false,
  responsiveWhen: 0,
  height: "auto",
  relative: false,
  gradient: null,
  radius: null,
  color: null,
};

export default FlexDiv;
