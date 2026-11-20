export const THEMES = [
  'lavanda',
  'oceano',
  'menta',
  'rosa',
  'oscuro',
] as const;

export type ThemeName = (typeof THEMES)[number];

export interface ThemeConfig {
  id: ThemeName;
  name: string;
  description: string;
  swatches: [string, string, string]; // [soft, mid, strong]
}

export const THEME_CONFIGS: Record<ThemeName, ThemeConfig> = {
  lavanda: {
    id: 'lavanda',
    name: 'Lavanda',
    description: 'Paleta principal serena y balanceada',
    swatches: ['#E1D9FC', '#A79AF2', '#6351B8'],
  },
  oceano: {
    id: 'oceano',
    name: 'Océano',
    description: 'Tonos azules frescos y profesionales',
    swatches: ['#CBE6F9', '#70B6E7', '#2F71AA'],
  },
  menta: {
    id: 'menta',
    name: 'Menta',
    description: 'Tonos verdes orgánicos y descansados',
    swatches: ['#D7EFEB', '#8CD0B2', '#307555'],
  },
  rosa: {
    id: 'rosa',
    name: 'Rosa',
    description: 'Tonos pasteles cálidos y amigables',
    swatches: ['#F6D7E3', '#E692B8', '#9E4F76'],
  },
  oscuro: {
    id: 'oscuro',
    name: 'Oscuro',
    description: 'Modo oscuro de alto contraste y baja fatiga',
    swatches: ['#2D3346', '#7C72DF', '#BDB5FF'],
  },
};
