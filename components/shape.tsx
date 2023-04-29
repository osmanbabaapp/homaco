import { FC } from "react";

interface IShape {
	className?: string;
	direction?: "rightTop" | "leftBottom" | "rightBottom" | "leftTop";
}
const Shape: FC<IShape> = (props) => {
	const dirClassNames =
		props.direction === "leftBottom"
			? "rotate-90"
			: props.direction === "rightBottom"
			? "rotate-180"
			: props.direction === "leftTop"
			? "-rotate-90"
			: "rotate-0"; //rightTop
	return (
		<span className={"block " + props.className}>
			<span
				className={"relative inline-block w-[50px] transform " + dirClassNames}
			>
				<span className='absolute inline-block w-[15px] h-[40px] bg-red-600 transform rotate-90 -top-[13px] right-0'></span>
				<span className='absolute inline-block w-[15px] h-[40px] bg-red-600  top-0 -right-[13px]'></span>
			</span>
		</span>
	);
};

export default Shape;
