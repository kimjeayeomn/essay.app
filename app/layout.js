import './globals.css';

export const metadata = {
  title: 'Essay English Master',
  description: 'English Essay Practice App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}