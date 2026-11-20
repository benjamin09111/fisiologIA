import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import {
  Button,
  Card,
  Badge,
  ProgressBar,
  SectionHeader,
  Avatar,
  ChoiceGroup,
  Table,
} from '@/components/ui';

describe('UI Primitives Unit Tests', () => {
  it('renders Button with variants and handles click', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Acción</Button>);

    const button = screen.getByRole('button', { name: /acción/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders Button as link when href is passed', () => {
    render(<Button href="/cursos">Ir a cursos</Button>);
    const link = screen.getByRole('link', { name: /ir a cursos/i });
    expect(link).toHaveAttribute('href', '/cursos');
  });

  it('renders Card with specific tone', () => {
    const { container } = render(<Card tone="mint">Contenido</Card>);
    expect(container.firstChild).toHaveClass('bg-accent-mint');
  });

  it('renders Badge with correct text and tone', () => {
    render(<Badge tone="success">Completado</Badge>);
    expect(screen.getByText('Completado')).toHaveClass('text-emerald-800');
  });

  it('renders ProgressBar with accessible role and clamped value', () => {
    render(<ProgressBar value={120} showLabel />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '100');
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('renders SectionHeader with title and action link', () => {
    render(
      <SectionHeader
        title="Nuestros módulos"
        actionText="Ver todos"
        actionHref="/cursos"
      />,
    );
    expect(screen.getByText('Nuestros módulos')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /ver todos/i })).toHaveAttribute(
      'href',
      '/cursos',
    );
  });

  it('renders Avatar with user initials', () => {
    render(<Avatar name="Angholy Fernandez" />);
    expect(screen.getByText('AF')).toBeInTheDocument();
  });

  it('renders ChoiceGroup and handles selection', () => {
    const handleChange = vi.fn();
    const options = [
      { value: 'opt1', label: 'Opción 1' },
      { value: 'opt2', label: 'Opción 2' },
    ];
    render(
      <ChoiceGroup
        name="test-choice"
        options={options}
        value="opt1"
        onChange={handleChange}
      />,
    );

    const radio2 = screen.getByDisplayValue('opt2');
    fireEvent.click(radio2);
    expect(handleChange).toHaveBeenCalledWith('opt2');
  });

  it('renders Table with headers and data', () => {
    type TestRow = { id: number; name: string; score: number };
    const data: TestRow[] = [
      { id: 1, name: 'Cuestionario 1', score: 85 },
      { id: 2, name: 'Cuestionario 2', score: 90 },
    ];
    const columns = [
      { key: 'name', header: 'Nombre' },
      {
        key: 'score',
        header: 'Puntaje',
        render: (item: TestRow) => `${item.score}%`,
      },
    ];

    render(
      <Table<TestRow>
        data={data}
        columns={columns}
        keyExtractor={(item) => item.id}
      />,
    );

    expect(screen.getAllByText('Cuestionario 1').length).toBeGreaterThan(0);
    expect(screen.getAllByText('85%').length).toBeGreaterThan(0);
  });
});
