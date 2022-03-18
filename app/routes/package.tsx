import { json, LoaderFunction, MetaFunction, useLoaderData } from "remix";

import { Advisory } from "~/components/advisory";
import { Header } from "~/components/header";
import {
	generatePacakgeAudit,
	Audit,
	AuditAdvisory,
	AuditSummary,
	Version,
} from "~/server/audit.server";
import { cache } from "~/server/cache.server";

type LoaderData = {
	audits: Audit[];
	packageName: string;
	version: Version;
};

const isAuditAdvisory = (audit: Audit): audit is AuditAdvisory => {
	return audit.type === "auditAdvisory";
};

export const meta: MetaFunction = ({ data }) => {
	if (data) {
		const { packageName, version } = data as LoaderData;
		return { title: `${packageName} v${version} | Auditphobia` };
	}

	return { title: "Auditphobia" };
};

export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url);
	const packageName = url.searchParams.get("name");
	const version = url.searchParams.get("version") as Version;

	if (packageName && version) {
		const audits = cache.get(packageName, version);

		if (!audits) {
			const generatedAudit = await generatePacakgeAudit({
				name: packageName,
				version: version,
			});

			cache.set(packageName, version, generatedAudit);

			return json<LoaderData>({
				audits: generatedAudit,
				packageName,
				version,
			});
		}

		return json<LoaderData>({ audits, packageName, version });
	}

	return json({}, { status: 400 });
};

const PackageNamePage = () => {
	const { audits, packageName, version } = useLoaderData<LoaderData>();
	const [advisory, summary] = audits.reduce(
		([auditAdivosry, auditSummary], curr) => {
			return isAuditAdvisory(curr)
				? [[...auditAdivosry, curr], auditSummary]
				: [auditAdivosry, [...auditSummary, curr]];
		},
		[[] as AuditAdvisory[], [] as AuditSummary[]]
	);

	return (
		<div>
			<Header />
			<div className="max-w-full">
				<div className="text-center text-2xl">
					{packageName}@{version}
				</div>
				<div className="mt-5">
					{advisory.length && (
						<div className="grid grid-cols-3 gap-4">
							{advisory.map((audit) => {
								return (
									<Advisory
										key={audit.data.advisory.github_advisory_id}
										advisory={audit}
									/>
								);
							})}
						</div>
					)}
					{summary.length && (
						<>
							<h2>Summary</h2>
							{summary.map((audit, i) => {
								return (
									<pre key={`summary-${i}`}>
										{JSON.stringify(audit, null, 2)}
									</pre>
								);
							})}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default PackageNamePage;
