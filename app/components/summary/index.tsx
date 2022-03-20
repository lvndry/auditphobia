import { AuditSummary } from "auditphobia-gadget";
import { StatBar } from "../statBar";

interface SummaryProps {
	summary: AuditSummary;
}

export const Summary = ({ summary }: SummaryProps) => {
	const { data } = summary;
	return (
		<div>
			<div>
				Number of dependencies: {summary.data.totalDependencies} (dependencies:{" "}
				{summary.data.dependencies}, devDependencies:{" "}
				{summary.data.devDependencies})
			</div>
			<StatBar
				elements={[
					{ label: "Critical", value: data.vulnerabilities.critical },
					{ label: "High", value: data.vulnerabilities.high },
					{ label: "Moderate", value: data.vulnerabilities.moderate },
					{ label: "Low", value: data.vulnerabilities.low },
					{ label: "Info", value: data.vulnerabilities.info },
				]}
			/>
		</div>
	);
};
