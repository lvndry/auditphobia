module.exports = {
	testEnvironment: "jest-environment-jsdom",
	roots: ["<rootDir>/app"],
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	moduleFileExtensions: ["js", "ts", "tsx", "json"],
};
