import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "../components/theme-provider";

export const metadata: Metadata = {
  title: "Your App Name",
  description: "Your app description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const storedTheme = localStorage.getItem('theme');
              const systemTheme = window.matchMedia('prefers-color-scheme: dark').matched ? 'dark' : 'light';
              const theme = !storedTheme ? systemTheme : storedTheme;
              document.documentElement.classList.add(theme)
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
