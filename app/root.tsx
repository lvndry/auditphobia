import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import styles from "~/styles/root.css";
import tailwindStyles from "./styles/app.css";

export const meta: MetaFunction = () => {
	return { title: "Auditphobia" };
};

export const links = () => [
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
				<Outlet />
				<Scripts />
				<ScrollRestoration />
				{process.env.NODE_ENV === "development" && <LiveReload />}
			</body>
		</html>
	);
}
