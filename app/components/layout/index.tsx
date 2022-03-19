interface LayoutProps {
	children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
	return (
		<main className="p-3	text-zinc-600	dark:text-gray-200 min-h-full">
			{children}
		</main>
	);
};
