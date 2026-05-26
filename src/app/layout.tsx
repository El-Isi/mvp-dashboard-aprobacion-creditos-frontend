import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dashboard Aprobación de Créditos — Konfío',
  description: 'Dashboard interno para analistas de crédito de Konfío. Visualiza, filtra y aprueba solicitudes de crédito.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
