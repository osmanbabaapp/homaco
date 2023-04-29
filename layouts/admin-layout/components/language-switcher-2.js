import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
// components
import { Dropdown, Menu } from "antd";
import { TbLanguage } from "react-icons/tb";

// styles
const StyledDropdownContainer = styled.div`
	display: block;
	color: ${(props) => (props.isWhite ? `#fff` : props.theme.colors.primary)};

	> a {
		display: flex;
		width: 100%;
		justify-content: flex-end;
		align-items: center;
		font-weight: 700;
		> span {
			margin-inline-start: 5px;
		}
	}
`;

const HeaderItem = styled.div`
	display: flex;
	width: ${(props) => (props.width ? `${props.width}px` : "")};
	justify-content: center;
	align-items: center;
	color: ${(props) => props.theme.colors.primary};
	font-weight: ${(props) => (props.bold ? "600" : "")};
	${(props) =>
		props.reverse &&
		`
      color: #fff;
      background-color: ${props.theme.colors.primary};
      > a:hover {
          color: #fff;
      }
  `}
`;

function LanguageSwitcher2({ isWhite = false }) {
	const router = useRouter();
	const menu = (
		<Menu>
			<Menu.Item key='0'>
				<Link href={router.asPath} locale={"tr"}>
					Türkçe
				</Link>
			</Menu.Item>
			<Menu.Item key='1'>
				<Link href={router.asPath} locale={"ar"}>
					العربية
				</Link>
			</Menu.Item>
		</Menu>
	);

	return (
		<StyledDropdownContainer isWhite={isWhite}>
			<Dropdown menu={menu} trigger={["click"]}>
				<a className='ant-dorpdown-link'>
					<HeaderItem>
						<text>
							<TbLanguage />
						</text>
					</HeaderItem>
				</a>
			</Dropdown>
		</StyledDropdownContainer>
	);
}

export default LanguageSwitcher2;
