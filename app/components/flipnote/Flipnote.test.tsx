import React from 'react';
import { render } from '@testing-library/react';
import { Flipnote } from './Flipnote';

const defaultProps = {
  title: "test title",
  content: "test content"
}

describe("<Flipnote />", () => {
  it("should render", () => {
    const { container } = render(<Flipnote {...defaultProps} />)
    expect(container).toBeDefined()
  })

  it("should flip after click", async () => {
    const { container, getByTestId } =render(<Flipnote {...defaultProps} />)
    expect(container).toBeDefined()

    const flipnote = getByTestId("flipnote-container")
    expect(flipnote).toBeDefined()

    const flipnoteFront = getByTestId("flipnote-front")
    expect(flipnoteFront).toBeDefined()
    expect(flipnoteFront).toHaveTextContent(defaultProps.title)

    const flipnoteBack = getByTestId("flipnote-back")
    expect(flipnoteBack).toBeDefined()
    expect(flipnoteBack).toHaveTextContent(defaultProps.content)

    await flipnote.click()
    expect(flipnoteFront).toHaveTextContent(defaultProps.title)
    expect(flipnoteBack).toHaveTextContent(defaultProps.content)
  });
});