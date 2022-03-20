import Image from "remix-image";
import { appName } from "~/constants";

export const Header = () => {
	const github_repo_link = "https://github.com/lvndry/auditphobia";

	return (
		<div className="header flex justify-between">
			<a href="/" className="text-3xl">
				<h1 className="first-letter:uppercase">{appName}</h1>
			</a>
			<section className="right-section dark:invert">
				<a href={github_repo_link} target="_blank" rel="noreferrer">
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
