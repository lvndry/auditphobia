import Image from "remix-image";

export const Header = () => {
	const github_repo_link = "https://github.com/lvndry/auditphobia";
	return (
		<div className="header flex justify-around">
			<section>Auditphobia</section>
			<section className="right-section">
				<a href={github_repo_link}>
					<Image src={"/assets/github-logo.png"} alt={"Github Mark Logo"} />
				</a>
			</section>
		</div>
	);
};
