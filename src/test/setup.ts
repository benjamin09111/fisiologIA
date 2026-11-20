import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock server-only in Vitest JSDOM environment so server services can be tested
vi.mock('server-only', () => ({}));
