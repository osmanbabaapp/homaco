import "next-auth";

declare module "next-auth" {
	interface User {
		address: string;
		token: string;
		username: string;
		id: string;
		websites: [
			{
				id: string;
				url: string;
				user: string;
				settings: {
					id: string;
					banner_type: "video" | "image";
					website: string;
				};
			}
		];
	}
}

declare module "next-auth/client" {
	export interface Session {
		user: {
			address: string;
			token: string;
			username: string;
			id: string;
			websites: [
				{
					id: string;
					url: string;
					user: string;
					settings: {
						id: string;
						banner_type: "video" | "image";
						website: string;
					};
				}
			];
		};
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		token: string;
	}
}
