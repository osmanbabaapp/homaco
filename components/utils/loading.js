import { Alert, Spin } from "antd";
import React from "react";

const Loading = (props) => {
	const { tip, message, description } = props;

	return (
		<Spin tip={tip}>
			<Alert message={message} description={description} type='info' />
		</Spin>
	);
};
export default Loading;
