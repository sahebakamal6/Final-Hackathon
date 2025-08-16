import "./globals.css";

export const metadata = {
  title: "Next.js Auth App",
  description: "Signup and Login with MongoDB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
