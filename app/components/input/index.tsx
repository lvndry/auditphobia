type InputProps = React.HTMLProps<HTMLInputElement>;

export const Input = (
	{ type, name, placeholder, className, onChange, ...props }: InputProps = {
		type: "string",
	}
) => {
	return (
		<input
			type={type}
			className={className}
			onChange={onChange}
			name={name}
			placeholder={placeholder}
			{...props}
		/>
	);
};
