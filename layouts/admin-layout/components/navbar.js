import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { LayoutContext } from "context/layout.context";
import { useCallback, useContext } from "react";
import styled from "styled-components";
import LanguageSwitcher from "./language-switcher";
// styles
const StyledNavbar = styled.header`
	position: sticky;
	top: 0;
	padding: ${(props) => props.theme.layout.con_padding};
	z-index: 100;
	background-color: ${(props) => props.theme.bg.primary};
	border-block-end: 1px solid ${(props) => props.theme.colors.secondary};
`;
export default function Navbar() {
	// configs
	const { ToggleSideOpen, sideOpen, toggleChangeTheme } =
		useContext(LayoutContext);
	// states

	// functions
	const toggleSideMenu = useCallback(
		(e) => {
			e?.preventDefault();
			ToggleSideOpen();
		},
		[ToggleSideOpen]
	);
	const toggleTheme = useCallback(
		(e) => {
			e?.preventDefault();
			toggleChangeTheme();
		},
		[toggleChangeTheme]
	);

	return (
		<StyledNavbar>
			<div className='flex justify-between items-center'>
				<div className='flex gap-[20px]'>
					<span className='text-[28px]'>
						<a href='#' onClick={toggleSideMenu}>
							{sideOpen ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						</a>
					</span>
				</div>
				<div className='flex relative gap-[20px]'>
					<LanguageSwitcher />
				</div>
			</div>
		</StyledNavbar>
	);
}
