import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";

import { Layout } from "./components/layout";

import styles from "~/styles/root.css";
import tailwindStyles from "./styles/tailwind.css";

export const meta: MetaFunction = () => {
	return { title: "Auditphobia" };
};

export const links = () => [
	{
		rel: "icon",
		href: "/favicon.ico",
	},
	{ rel: "stylesheet", href: styles },
	{ rel: "stylesheet", href: tailwindStyles },
];

export default function App() {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<Layout>
					<Outlet />
				</Layout>
				<Scripts />
				<ScrollRestoration />
				{process.env.NODE_ENV === "development" && <LiveReload />}
			</body>
		</html>
	);
}
