import localFont from 'next/font/local';
import { ThemeProvider } from '../providers/ThemeProvider';
import MUIWrapper from './MUIWrapper';
import './globals.css';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Smart Cart",
  description: "Next.js E-commerce Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <MUIWrapper>
            {children}
          </MUIWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}