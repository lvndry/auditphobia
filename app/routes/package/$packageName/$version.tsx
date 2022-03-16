import { json, LoaderFunction, useLoaderData } from "remix";
import {
	generatePacakgeAudit,
	Audit,
	AuditAdvisory,
	AuditSummary,
	Version,
} from "~/lib/audit.server";

type LoaderData = {
	audits: Audit[];
	packageName: string;
	version: Version;
};

const isAuditAdvisory = (audit: Audit): audit is AuditAdvisory => {
	return audit.type === "auditAdvisory";
};

export const loader: LoaderFunction = async ({ params }) => {
	const { packageName, version } = params;
	if (packageName && version) {
		const audits = await generatePacakgeAudit({
			name: packageName,
			version: version as Version,
		});

		return json({ audits, packageName, version });
	}

	return json({});
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
			{packageName}@{version}
			<h2>Advisory</h2>
			{advisory.map((audit) => {
				return <pre>{JSON.stringify(audit, null, 2)}</pre>;
			})}
			<h2>Summary</h2>
			{summary.map((audit) => {
				return <pre>{JSON.stringify(audit, null, 2)}</pre>;
			})}
		</div>
	);
};

export default PackageNamePage;
