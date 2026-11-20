import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { THEME_SCRIPT } from '@/lib/theme-script';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'FisiologIA — Aprende · Comprende y Evoluciona',
  description:
    'Plataforma interactiva para el estudio de fisiología humana asistida por IA.',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-theme="lavanda"
      className={plusJakartaSans.variable}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-screen bg-background font-sans text-text antialiased">
        {children}
      </body>
    </html>
  );
}
