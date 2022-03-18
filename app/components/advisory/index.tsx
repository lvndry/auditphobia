import { AuditAdvisory } from "auditphobia-gadget";

interface AdvisoryProps {
	advisory: AuditAdvisory;
}

export const Advisory = ({ advisory }: AdvisoryProps) => {
	const { data } = advisory;

	return (
		<div className="max-w-md p-3 break-all border-solid border-2 border-indigo-600">
			<section className="flex flex-col">
				<span>
					Impacted package: {data.resolution.path.split(">").join(" >  ")} until
					version {data.advisory.vulnerable_versions.slice(1)}
				</span>
			</section>
			<section className="flex flex-col">
				<h5>{data.advisory.title}</h5>
				<span>Severity: {data.advisory.severity}</span>
			</section>
			<section className="flex flex-col">
				<span>Recommendation: {data.advisory.recommendation}</span>
			</section>
			<section className="flex flex-col">
				<div>
					{data.advisory.references.split("- ").map((reference) => (
						<div key={reference}>
							<a href={reference}>{reference}</a>
						</div>
					))}
				</div>
				<span>{`Required: ${!data.resolution.optional}`}</span>
				<span id="cvss">
					CVSS: {data.advisory.cvss && data.advisory.cvss.score}
				</span>
			</section>
		</div>
	);
};
