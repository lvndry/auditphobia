import { Input } from ".";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";

test("It should render input component", () => {
	const renderedComponent = render(<Input aria-label="test-input" />);
	const input = renderedComponent.getByLabelText(
		"test-input"
	) as HTMLInputElement;
	fireEvent.change(input, { target: { value: "eslint" } });
	expect(input.value).toBe("eslint");
});
