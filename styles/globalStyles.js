const { createGlobalStyle } = require("styled-components");

const GlobalStyles = createGlobalStyle`
    body {
        ${(props) =>
					props.image ? `background-image: url("/imgs/bg.jpeg");` : ""}
        direction: ${(props) => props.dir}
    }
`;

export default GlobalStyles;
