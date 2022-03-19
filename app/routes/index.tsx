import { Form, json, LoaderFunction, useLoaderData, useSubmit } from "remix";
import { Input, links as InputLinks } from "~/components/input";
import { NPMSPackage } from "~/types/package";
import styles from "~/styles/index.css";

export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url);
	const query = url.searchParams.get("query");

	if (query && query.length > 1) {
		const LIMIT = 4;
		const NPMS_ENDPOINT = `https://api.npms.io/v2/search/suggestions?size=${LIMIT}&q=${query}`;
		const response = await fetch(NPMS_ENDPOINT);
		const suggestions: NPMSPackage[] = await response.json();
		return json(
			suggestions.sort(
				(a, b) => b.score.detail.popularity - a.score.detail.popularity
			)
		);
	}

	return json({}, { status: 400 });
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
		<article className="homepage">
			<div className="homepage-container">
				<h1 className="text-6xl">Auditphobia</h1>
				<h2 className="text-xl my-3">
					Find the vulnerabilites of a npm package
				</h2>
				<Form
					autoComplete="off"
					onChange={handleChange}
					className="mt-8"
					data-query-form
				>
					<div className="mb-4" data-input-wrapper>
						<Input
							name="query"
							placeholder="find package"
							aria-label="package-name"
						/>
					</div>
					<div
						className="divide-y divide-solid dark:text-sky-200 opacity-100"
						data-suggestions-list
					>
						{suggestions.length
							? suggestions.map(({ package: suggestion }) => {
									const { name, description, version } = suggestion;
									return (
										<div key={name} data-suggestions-list-item>
											<a
												href={`/package?name=${name}&version=${version}`}
												data-suggestions-list-item
											>
												<h3>{name}</h3>
												<h3>{description}</h3>
												<h3>{version}</h3>
											</a>
										</div>
									);
							  })
							: null}
					</div>
				</Form>
			</div>
		</article>
	);
}
