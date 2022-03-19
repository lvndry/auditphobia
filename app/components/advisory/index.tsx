import { AuditAdvisory } from "auditphobia-gadget";

interface AdvisoryProps {
	advisory: AuditAdvisory;
}

export const Advisory = ({ advisory }: AdvisoryProps) => {
	const { data } = advisory;

	return (
		<div className="max-w-md p-3 break-words border-solid border-2 rounded-md dark:border-indigo-600">
			<section className="flex flex-col">
				<span>
					Impacted package: {data.resolution.path.split(">").join(" >  ")} until
					version {data.advisory.vulnerable_versions.slice(1)}
				</span>
				<span>Used version: {data.advisory.findings[0].version}</span>
			</section>
			<section className="flex flex-col">
				<h5>{data.advisory.title}</h5>
				<span>Severity: {data.advisory.severity}</span>
			</section>
			<section className="flex flex-col">
				<span>Recommendation: {data.advisory.recommendation}</span>
			</section>
			<section className="flex flex-col">
				Links:
				<div>
					{data.advisory.references.split("- ").map((reference) => (
						<div key={reference}>
							<a href={reference} className="text-blue-600">
								{reference}
							</a>
						</div>
					))}
				</div>
				<span id="cvss">
					CVSS: {data.advisory.cvss && data.advisory.cvss.score}
				</span>
			</section>
		</div>
	);
};
