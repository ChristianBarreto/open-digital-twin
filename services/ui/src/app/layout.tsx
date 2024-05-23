import type { Metadata } from "next";
import styles from './layout.module.css';

export const metadata: Metadata = {
  title: "Open Digital Twin",
  description: "Create models of reality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{
        margin: '0px',
        padding: '0px',
      }}>{children}</body>
    </html>
  );
}
