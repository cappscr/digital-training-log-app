import { expect, test } from 'vitest';
import { render } from '../vitest.setup';
import { waitFor } from '@testing-library/dom';
import { PageTitle } from '@/components/PageTitle';

test('should set the title to the default when no pageName prop is passed', () => {
  render(<PageTitle />);

  // Check the page title
  waitFor(() => {
    expect(document.title).toBe('Digital Training Log App');
  });
});

test('should prefix the default title with the page name when a pageName prop is passed', () => {
  render(<PageTitle pageName="About" />);

  // Check the page title
  waitFor(() => {
    expect(document.title).toBe('About | Digital Training Log App');
  });
});
