import styled from "styled-components";

const Styles = styled.div`
	@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap");

	position: relative;
	max-height: 85vh;
	overflow-y: auto;

	font-family: "Source Sans Pro", sans-serif;
	background-color: ${(props) => props.theme.edit.colors.dark1};
	color: #fff;
	overflow-x: hidden;
	a {
		color: inherit;
		text-decoration: none;
		&:hover {
			color: ${(props) => props.theme.edit.colors.gold1};
		}
	}

	* {
		box-sizing: border-box;
	}

	*::selection {
		background-color: ${(props) => props.theme.edit.colors.primary};
	}

	input,
	label,
	textarea {
		color: #fff !important;
	}

	ul {
		padding: 0;
		list-style: none;
		margin: 0;
	}
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		color: #fff;
		margin: 0;
	}
`;

export default function EditWebsitePageContent(props) {
	const { data } = props;

	const contactImage = data?.filter((x) => x.departmentName == "contactImage");

	console.log("contactImage index:>> ", contactImage);

	return (
		<>
			<Styles>
				<iframe
					className='w-[100%] h-[900px]'
					src='https://sayaf-master.vercel.app/'
				></iframe>
			</Styles>
		</>
	);
}
