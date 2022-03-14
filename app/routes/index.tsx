import { Form, json, LoaderFunction, useLoaderData, useSubmit } from "remix";
import { Input, links as InputLinks } from "~/components/input";
import { NPMSPackage } from "~/types/package";
import styles from "~/styles/index.css";

export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url);
	const query = url.searchParams.get("query");
	if (query) {
		const LIMIT = 5;
		const NPMS_ENDPOINT = `https://api.npms.io/v2/search/suggestions?size=${LIMIT}&q=${query}`;
		const response = await fetch(NPMS_ENDPOINT);
		const packages: NPMSPackage[] = await response.json();
		return json(packages);
	}

	return json({});
};

export const links = () => [
	...InputLinks(),
	{ rel: "stylesheet", href: styles },
];

export default function Index() {
	const submit = useSubmit();
	const suggestions: NPMSPackage[] = useLoaderData();

	const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
		submit(event.currentTarget);
	};

	return (
		<main className="homepage">
			<div className="homepage-container">
				<h1>Auditphobia</h1>
				<h2>Find the vulnerabilites of NPM Packages</h2>
				<Form autoComplete="off" onChange={handleChange} data-query-form>
					<div data-input-wrapper>
						<Input
							name="query"
							placeholder="find pacakge"
							aria-label="package-name"
						/>
					</div>
					<ul data-suggestions-list>
						{suggestions.length
							? suggestions.map((suggestion) => {
									return (
										<li data-suggestions-list-item>
											{suggestion.package.name}
										</li>
									);
							  })
							: null}
					</ul>
				</Form>
			</div>
		</main>
	);
}
