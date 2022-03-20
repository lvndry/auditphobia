interface StatBarProps {
	elements: { label: string; value: number; color?: string }[];
}

export const StatBar = ({ elements }: StatBarProps) => {
	const totalValues = elements.reduce((acc, element) => {
		acc += element.value;
		return acc;
	}, 0);

	return (
		<div className="">
			{elements.map((element) => {
				return (
					<div key={element.label} className="">
						{element.label} {(element.value / totalValues) * 100} %
					</div>
				);
			})}
		</div>
	);
};
