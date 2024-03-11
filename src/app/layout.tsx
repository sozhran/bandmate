import type { Metadata } from "next";
import "./reset.css";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
// import GridContext from "@/contexts/grid-context";
// import { GridProvider } from "@/contexts/grid-context";

const fontSans = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "Bandmate",
    description: "It's a drum machine - and it works in your browser!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        // <GridContext.Provider value={[grid, setGrid]}>
        <html
            lang="en"
            className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}
            suppressHydrationWarning
        >
            <body>{children}</body>
        </html>
        // </GridContext.Provider>
    );
}
