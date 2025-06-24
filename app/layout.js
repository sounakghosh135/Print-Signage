import "./globals.css";
import { Inter, Roboto } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Print & Signage",
  description: "Professional printing and signage services for your business needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${roboto.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}