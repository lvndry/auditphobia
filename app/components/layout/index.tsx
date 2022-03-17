interface LayoutProps {
	children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
	return (
		<div className="bg-white dark:bg-slate-900 text-gray-200">{children}</div>
	);
};
