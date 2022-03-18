import styles from "./styles.css";

type InputProps = React.HTMLProps<HTMLInputElement>;

export const links = () => [{ rel: "stylesheet", href: styles }];

export const Input = (
	{ type, name, placeholder, className, onChange, ...props }: InputProps = {
		type: "string",
	}
) => {
	return (
		<input
			data-input
			type={type}
			className={`audph-input dark:bg-slate-900 ${className}`}
			onChange={onChange}
			name={name}
			placeholder={placeholder}
			{...props}
		/>
	);
};
