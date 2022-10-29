import { render, screen } from "@testing-library/react";
import Button, { ButtonProps } from "./Button";

describe("Button", () => {
  const defaultButton = {
    text: "Button",
    disabled: false,
  };

  it("displays button text", () => {
    render(<Button {...defaultButton} />); // eslint-disable-line react/jsx-props-no-spreading

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Button");
  });
});
