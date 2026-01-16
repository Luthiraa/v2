import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Luthira Abeykoon",
    description: "Personal website of Luthira Abeykoon",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}

