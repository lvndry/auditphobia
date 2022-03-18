import { AuditAdvisory } from "auditphobia-gadget";

interface AdvisoryProps {
	advisory: AuditAdvisory;
}

export const Advisory = ({ advisory }: AdvisoryProps) => {
	const { data } = advisory;

	return (
		<div className="border-solid border-2 border-indigo-600">
			<section className="flex flex-col">
				<h5>{data.advisory.title}</h5>
				<span>Severity: {data.advisory.severity}</span>
			</section>
			<section className="flex flex-col">
				<span>{data.advisory.overview.split("###").join("\n")}</span>
				<span>Recommendation: {data.advisory.recommendation}</span>
			</section>
			<section className="flex flex-col">
				<span>{data.resolution.path}</span>
				<span>{data.advisory.vulnerable_versions}</span>
			</section>
			<section className="flex flex-col">
				<span>{data.advisory.references}</span>
				<span>{data.advisory.url}</span>
				<span>{`${data.resolution.optional}`}</span>
				<span id="cvss">
					CVSS: {data.advisory.cvss && data.advisory.cvss.score}
				</span>
			</section>
		</div>
	);
};
