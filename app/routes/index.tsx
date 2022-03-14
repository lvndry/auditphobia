import { Form, json, LoaderFunction, useLoaderData, useSubmit } from "remix";
import { Input } from "~/components/input";
import { NPMSPackage } from "~/types/package";

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

export default function Index() {
	const submit = useSubmit();
	const packages: NPMSPackage[] = useLoaderData();

	const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
		submit(event.currentTarget);
	};

	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
			<h1>Auditphobia</h1>
			<Form autoComplete="off" onChange={handleChange}>
				<Input
					name="query"
					placeholder="find pacakge"
					aria-label="package-name"
				/>
			</Form>
			<div>
				{packages.length
					? packages.map((p) => {
							return <div>{p.package.name}</div>;
					  })
					: null}
			</div>
		</div>
	);
}
