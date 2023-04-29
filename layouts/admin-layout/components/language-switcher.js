import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
// components
import { Menu, Dropdown } from "antd";
import { MdExpandMore } from "react-icons/md";

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
	padding: 10px 15px;
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

function LanguageSwitcher({ isWhite = false }) {
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
			<Dropdown overlay={menu} trigger={["click"]}>
				<a className='ant-dorpdown-link'>
					<HeaderItem>
						{router.locale === "tr"
							? "Türkçe "
							: router.locale === "ar"
							? "العربية "
							: router.locale === "en"
							? "English "
							: "Error ! "}

						<MdExpandMore />
					</HeaderItem>
				</a>
			</Dropdown>
		</StyledDropdownContainer>
	);
}

export default LanguageSwitcher;
