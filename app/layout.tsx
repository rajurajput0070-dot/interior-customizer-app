import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sri Majisa Plywood & Interior Hardware',
  description: 'Interior customization experience for showroom visitors.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
