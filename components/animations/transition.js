import { config, Transition } from "@react-spring/core";
import { animated } from "@react-spring/web";
import styled from "styled-components";

export default function TransitionAnimation({
	show,
	reverse = false,
	delay = 0,
	onRest = () => null,
	children,
	from = { opacity: 0, x: -10 },
	enter = { opacity: 1, x: 10 },
	leave = { opacity: 0, x: -10 },
	zIndex = 2,
	position = undefined,
}) {
	return (
		<Transition
			items={show}
			from={from}
			enter={enter}
			leave={leave}
			reverse={false}
			delay={delay}
			config={config.molasses}
			onRest={onRest}
		>
			{(styles, item) =>
				item && (
					<animated.div style={{ ...styles, zIndex, position }}>
						{children}
					</animated.div>
				)
			}
		</Transition>
	);
}
