import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoMono = Roboto_Mono({
    subsets: ["latin"],
    variable: "--font-roboto-mono",
});

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
            <body className={`${robotoMono.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
