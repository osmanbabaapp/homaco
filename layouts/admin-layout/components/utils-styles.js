import { css } from "styled-components";

export const containerPadding = css`
	padding: ${(props) => props.theme.layout.con_padding};
`;

export const activeBackground = css`
	background-color: ${(props) => props.theme.colors.gold1};
`;

export const activeLink = css`
	color: ${(props) => props.theme.colors.primary};
	font-weight: 600;
`;

export const layoutTransitionWidth = css`
	transition: width 0.4s;
`;
