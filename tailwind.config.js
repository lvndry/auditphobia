module.exports = {
	content: ["./app/**/*.{ts,tsx}"],
	theme: {
		extend: {
			typography: (theme) => ({
				dark: {
					css: [
						{
							color: theme("colors.gray.200"),
						},
					],
				},
			}),
		},
		fontFamily: {
			body: ["Helvetica", "'Open Sans'"],
		},
	},
	variants: {
		extend: {
			typography: ["dark"],
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
