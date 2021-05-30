import { render } from '@testing-library/react';
import Component from '../index';

describe('[Component] App', () => {
  it('should render', () => {
    const { container } = render(<Component />);
    expect(container).toBeDefined();
  });
});
