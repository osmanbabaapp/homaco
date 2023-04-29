import { LayoutContext } from "../context/layout.context";
import { useContext } from "react";
import { ThemeProvider } from "styled-components";

const lightTheme = {
	edit: {
		colors: {
			primary: "#FC5130",
			secondary: "#8E8E8E",
			tertiary: "#191919",
			dark1: "#040402",
			dark2: "#111111",
			gold1: "#E4D078",
			gold2: "#96641C",
		},
		hovers: {
			primary: "#da3414",
		},
	},
	colors: {
		text: "#1E2E4E",
		text2: "#8F97B5",
		primary: "#3562ED",
		secondary: "#B1B3CF",
		tertiary: "#F8F9FF",
	},
	bg: {
		primary: "#fff",
	},
	hovers: {
		primary: "#3562ED44",
	},
	layout: {
		con_padding: "20px",
		side_collapsed_width: "100px",
		side_uncollapsed_width: "300px",
	},
};

export const editTheme = {
	colors: {
		primary: "#FC5130",
		secondary: "#8E8E8E",
		tertiary: "#191919",
		dark1: "#040402",
		dark2: "#111111",
		gold1: "#E4D078",
		gold2: "#96641C",
	},
	hovers: {
		primary: "#da3414",
	},
};

const darkTheme = {
	edit: {
		colors: {
			primary: "#FC5130",
			secondary: "#8E8E8E",
			tertiary: "#191919",
			dark1: "#040402",
			dark2: "#111111",
			gold1: "#E4D078",
			gold2: "#96641C",
		},
		hovers: {
			primary: "#da3414",
		},
	},
	colors: {
		text: "#eee",
		text2: "#8F97B5",
		primary: "#3562ED",
		secondary: "#B1B3CF",
		tertiary: "#16213E",
	},
	bg: {
		primary: "#020118",
	},
	hovers: {
		primary: "#3562ED44",
	},
	layout: {
		con_padding: "20px",
		side_collapsed_width: "100px",
		side_uncollapsed_width: "300px",
	},
};
const Theme = ({ children }) => {
	const { theme } = useContext(LayoutContext);
	return (
		<ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
			{children}
		</ThemeProvider>
	);
};

export default Theme;
