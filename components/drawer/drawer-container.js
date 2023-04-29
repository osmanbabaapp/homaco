import { useCallback } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import * as constants from "../../redux/drawer/constants";
import { closeDrawer } from "../../redux/drawer/actions";
import { Drawer } from "antd";
import ContactDrawer from "./contact-drawer";
import SidesBarDrawer from "./sidebar-drawer";
import { useRouter } from "next/router";
import { useWindowSize } from "../../hooks/useWindowSize";

//components

export const modalMaskStyle = {
	backdropFilter: "blur(5px)",
	backgroundColor: "rgba(0, 0, 0, 0.2)",
	top: "-14%",
	bottom: "-14%",
};

function DrawerOuter({
	onClose,
	visible,
	headerStyle,
	bodyStyle,
	drawerStyle,
	children,
	width,
	placement,
}) {
	return (
		<Drawer
			destroyOnClose
			placement={placement}
			onClose={onClose}
			visible={visible}
			width={width}
			height={"50%"}
			bodyStyle={{ ...bodyStyle }}
			headerStyle={{ ...headerStyle }}
			drawerStyle={{ ...drawerStyle }}
			className='rounded-tl-lg rounded-bl-lg'
			rootClassName='top-[10%] bottom-[10%] '
			mask={true}
			maskStyle={modalMaskStyle}
		>
			{children}
		</Drawer>
	);
}

function DrawerContainer({}) {
	const router = useRouter();

	const size = useWindowSize();

	const media450 = size.width < 450;

	const locale = router.locale;
	const { visible, drawerType, dPayloads } = useSelector(
		(state) => state.drawer
	);
	const dispatch = useDispatch();

	const onClose = useCallback(() => dispatch(closeDrawer()), [dispatch]);

	const toggleModals = useCallback((e, close, open) => {
		e.preventDefault();
		alert("Toogle Drawers");
	}, []);

	return (
		<>
			{visible === true && (
				<>
					{drawerType === constants.modalType_ContactCompany ? (
						<DrawerOuter
							onClose={onClose}
							visible={visible}
							headerStyle={{ display: "none" }}
							bodyStyle={{
								paddingBottom: 80,
								backgroundColor: "white",
								height: "50%",
							}}
							width={media450 ? 400 : 500}
							height='50%'
						>
							<ContactDrawer
								payload={dPayloads}
								onClose={onClose}
								locale={locale}
							/>
						</DrawerOuter>
					) : (
						<DrawerOuter
							onClose={onClose}
							visible={visible}
							headerStyle={{ display: "none" }}
							bodyStyle={{ paddingBottom: 80 }}
							placement={"left"}
							width={"68%"}
							height={"50%"}
						>
							<SidesBarDrawer
								payload={dPayloads}
								onClose={onClose}
								locale={locale}
							/>
						</DrawerOuter>
					)}
				</>
			)}
		</>
	);
}

export default DrawerContainer;
