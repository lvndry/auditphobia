interface LayoutProps {
	children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
	return (
		<main className="text-zinc-400	dark:text-gray-200 min-h-full">
			{children}
		</main>
	);
};
