import React from "react";
import { render, screen } from "@testing-library/react";
import { Flipnote } from "./Flipnote";

const defaultProps = {
  title: "test title",
  content: "test content",
};

describe("<Flipnote />", () => {
  it("should render", () => {
    const { container } = render(<Flipnote {...defaultProps} />);
    expect(container).toBeDefined();
  });

  it("should flip after click", async () => {
    const { container } = render(<Flipnote {...defaultProps} />);
    expect(container).toBeDefined();

    const flipnote = screen.getByTestId("flipnote-container");
    expect(flipnote).toBeInTheDocument();

    const flipnoteFront = screen.getByTestId("flipnote-front");
    expect(flipnoteFront).toBeInTheDocument();
    expect(flipnoteFront).toHaveTextContent(defaultProps.title);

    const flipnoteBack = screen.getByTestId("flipnote-back");
    expect(flipnoteBack).toBeInTheDocument();
    expect(flipnoteBack).toHaveTextContent(defaultProps.content);
    expect(container).toMatchSnapshot();

    await flipnote.click();
    expect(flipnoteFront).toHaveTextContent(defaultProps.title);
    expect(flipnoteBack).toHaveTextContent(defaultProps.content);
    expect(container).toMatchSnapshot();
  });
});
