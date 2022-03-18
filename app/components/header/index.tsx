import Image from "remix-image";

export const Header = () => {
	const github_repo_link = "https://github.com/lvndry/auditphobia";
	return (
		<div className="header flex justify-around">
			<span className="text-6xl">
				<h1>Auditphobia</h1>
			</span>
			<section className="right-section dark:invert">
				<a href={github_repo_link}>
					<Image
						src={"/assets/github-logo.png"}
						alt={"Github Mark Logo"}
						className="opacity-80 hover:opacity-100"
					/>
				</a>
			</section>
		</div>
	);
};
