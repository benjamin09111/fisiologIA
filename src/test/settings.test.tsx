import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ThemeSelector } from '@/features/settings/ThemeSelector';
import { ProfileForm } from '@/features/settings/ProfileForm';
import type { User } from '@/schemas/user';

vi.mock('@/features/settings/actions', () => ({
  setTheme: vi.fn().mockResolvedValue({ success: true }),
}));

describe('ThemeSelector and ProfileForm', () => {
  it('renders all 5 theme options', () => {
    render(<ThemeSelector currentTheme="lavanda" />);
    expect(screen.getByText('Lavanda')).toBeInTheDocument();
    expect(screen.getByText('Océano')).toBeInTheDocument();
    expect(screen.getByText('Menta')).toBeInTheDocument();
    expect(screen.getByText('Rosa')).toBeInTheDocument();
    expect(screen.getByText('Oscuro')).toBeInTheDocument();
  });

  it('updates data-theme attribute on document when theme is clicked', async () => {
    render(<ThemeSelector currentTheme="lavanda" />);
    const mentaOption = screen.getByText('Menta');
    await act(async () => {
      fireEvent.click(mentaOption);
    });
    expect(document.documentElement.getAttribute('data-theme')).toBe('menta');
  });

  it('renders user details in ProfileForm', () => {
    const mockUser: User = {
      id: 'u-1',
      name: 'Angholy F.',
      email: 'angholy@correo.cl',
      initials: 'AF',
      role: 'student',
      career: 'Medicina',
    };
    render(<ProfileForm user={mockUser} />);
    expect(screen.getByDisplayValue('Angholy F.')).toBeInTheDocument();
    expect(screen.getByDisplayValue('angholy@correo.cl')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Medicina')).toBeInTheDocument();
  });
});
