import { describe, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Form from './Form';

vi.mock('axios');
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));
vi.mock('../../hooks', () => ({
  useAppDispatch: () => vi.fn(),
}));

describe('Form Component', () => {
  it('renders login form by default', () => {
    render(<Form />);
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'LOGIN' })).toBeInTheDocument();
  });

  it('Switch to register form on btn click', () => {
    render(<Form />);
    fireEvent.click(screen.getByText(/Sign Up here/));
    expect(screen.getByLabelText(/First Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/)).toBeInTheDocument();
  });

  it('Submits login form and call APIs', async () => {});
});
