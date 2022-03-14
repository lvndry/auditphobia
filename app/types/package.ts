export interface NPMSPackage {
	package: {
		name: string;
		scope: string;
		version: `${number}.${number}.${number}`;
		description: string;
		keywords: string[];
		date: string;
		links: {
			npm: string;
			homepage: string;
			repository: string;
			bugs: string;
		};
		author: {
			name: string;
		};
		publisher: {
			username: string;
			email: string;
		};
		maintainers: [
			{
				username: string;
				email: string;
			}
		];
	};
	score: {
		final: number;
		detail: {
			quality: number;
			popularity: number;
			maintenance: number;
		};
	};
}
