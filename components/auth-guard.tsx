import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function AuthGuard({
	children,
}: {
	children: JSX.Element;
}): JSX.Element {
	const router = useRouter();
	// get session
	const { data, status } = useSession();

	console.log("Session Data");
	console.log(data);
	console.log("status");
	console.log(status);

	useEffect(() => {
		if (status !== "loading") {
			//auth is initialized and there is no user
			if (!data) {
				router.push(`/auth/signin?redirect=${router.asPath}`);
			}
		}
	}, [data, status, router]);

	/* show loading indicator while the auth provider is still initializing */
	if (status === "loading") return <h1>loading ...</h1>;

	// if auth initialized with a valid user show protected page
	if (status === "authenticated" && data) {
		console.log("Render it !!");
		return children;
	}
	return <>Null</>;
}
