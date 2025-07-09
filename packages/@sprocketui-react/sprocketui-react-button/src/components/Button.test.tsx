import { describe, expect, test } from 'vitest';
import { Button } from '@sprocketui-react/button';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Sprocket UI - Button', () => {
  test('render children', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeDefined();
  });

  test('has role="button"', () => {
    render(<Button>Role Test</Button>);
    expect(screen.getByRole('button')).toBeDefined();
  });
});