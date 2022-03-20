export interface NPMSSuggestion {
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

interface NPMUser {
	username: string;
	email: string;
}

export interface PackageInfos {
	analyzedAt: string;
	collected: {
		metadata: {
			name: string;
			scope: string;
			version: string;
			description: string;
			keywords: string[];
			date: string;
			publisher: NPMUser;
			maintainers: NPMUser[];
			repository: {
				type: string;
				url: string;
				repository: string;
			};
			links: {
				npm: string;
				homepage: string;
				repository: string;
				bugs: string;
			};
			license: string;
			dependencies: {
				[key: string]: string;
			};
			devDependencies: {
				[key: string]: string;
			};
			releases: { from: string; to: string; count: number }[];
			hasTestScript: boolean;
			hasSelectiveFiles: boolean;
			readme: string;
		};
		npm: {
			downloads: { from: string; to: string; count: number }[];
			dependentsCount: number;
			starsCount: number;
		};
		github: {
			homepage: string;
			starsCount: number;
			forksCount: number;
			subscribersCount: number;
			issues: {
				count: number;
				openCount: number;
				distribution: {
					[key: number]: number;
				};
				isDisabled: boolean;
			};
			contributors: { username: string; commitsCount: number }[];
			commits: {
				from: string;
				to: string;
				count: number;
			}[];
		};
		source: {
			files: {
				readmeSize: number;
				testsSize: number;
				hasChangelog: boolean;
			};
			linters: string[];
			outdatedDependencies: {
				[key: string]: { required: string; stable: string; latest: string };
			};
		};
	};
	evaluation: {
		quality: {
			carefulness: number;
			tests: number;
			health: number;
			branding: number;
		};
		popularity: {
			communityInterest: number;
			downloadsCount: number;
			downloadsAcceleration: number;
			dependentsCount: number;
		};
		maintenance: {
			releasesFrequency: number;
			commitsFrequency: number;
			openIssues: number;
			issuesDistribution: number;
		};
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
