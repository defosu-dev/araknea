import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import WebBackground from "@/components/web-background";

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
});
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});
const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Araknea — Stories beyond chat.",
    description:
        "Araknea — платформа для команд що перекладають манґу, ранобе і комікси. Повноцінна читалка, автоматичний ранній доступ і командна робота прямо у Telegram.",
    keywords: [
        "araknea",
        "переклади",
        "манґа",
        "ранобе",
        "комікси",
        "telegram mini app",
        "платформа для перекладачів",
    ],
    authors: [{ name: "MimiruLabs", url: "https://github.com/defosu-dev" }],
    creator: "MimiruLabs",
    openGraph: {
        title: "Araknea — Stories beyond chat.",
        description:
            "Платформа для команд перекладачів. Повноцінна читалка, ранній доступ і командна робота прямо у Telegram.",
        type: "website",
        locale: "uk_UA",
        siteName: "Araknea",
    },
    twitter: {
        card: "summary_large_image",
        title: "Araknea — Stories beyond chat.",
        description:
            "Платформа для команд перекладачів. Повноцінна читалка, ранній доступ і командна робота прямо у Telegram.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="uk"
            className={cn(
                "h-full",
                "antialiased dark",
                geistSans.variable,
                geistMono.variable,
                "font-mono",
                jetbrainsMono.variable,
            )}
        >
            <body className="min-h-full flex flex-col overflow-x-hidden bg-zinc-950">
                <WebBackground />
                <div className="relative z-10 flex flex-col flex-1">
                    {children}
                </div>
            </body>
        </html>
    );
}
