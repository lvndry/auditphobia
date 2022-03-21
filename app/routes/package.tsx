import { json, LoaderFunction, MetaFunction, useLoaderData } from "remix";

import { Advisory } from "~/components/advisory";
import { Header } from "~/components/header";
import { NoVulnerabilites } from "~/components/noVulnerabilites";
import { Summary } from "~/components/summary";
import {
	generatePackageAudit,
	Audit,
	AuditAdvisory,
	AuditSummary,
	Version,
} from "~/server/audit.server";
import { cache } from "~/server/cache.server";
import { PackageInfos } from "~/types/package";

type LoaderData = {
	audits: Audit[];
	packageName: string;
	version: Version;
	infos: PackageInfos;
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
	const response = await fetch(`https://api.npms.io/v2/package/${packageName}`);
	const infos: PackageInfos = await response.json();

	if (!packageName || !version) {
		// TODO: should return an error message
		return json(null, { status: 400 });
	}

	const audits = cache.get(packageName, version);

	if (!audits) {
		const generatedAudit = await generatePackageAudit({
			name: packageName,
			version: version,
		});

		cache.set(packageName, version, generatedAudit);

		return json<LoaderData>({
			audits: generatedAudit,
			packageName,
			version,
			infos,
		});
	}

	return json<LoaderData>({ audits, packageName, version, infos });
};

const isAuditAdvisory = (audit: Audit): audit is AuditAdvisory => {
	return audit.type === "auditAdvisory";
};

const PackageNamePage = () => {
	const loaderData = useLoaderData<LoaderData | null>();

	if (loaderData) {
		const { audits, packageName, version } = loaderData;
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
					<div className="text-center text-3xl">
						<span>{packageName}</span>
						<span className="text-green-200">@</span>
						<span>{version}</span>
					</div>
					{advisory.length ? (
						<div className="mt-5">
							{summary.length ? (
								<>
									{summary.map((audit, i) => {
										return <Summary key={i} summary={audit} />;
									})}
								</>
							) : null}
							{advisory.length ? (
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
							) : null}
						</div>
					) : (
						<NoVulnerabilites />
					)}
				</div>
			</div>
		);
	}
};

export default PackageNamePage;
