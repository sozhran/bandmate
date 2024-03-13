"use client";
// import type { Metadata } from "next";
import "./reset.css";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import React, { useState } from "react";
import { Grid } from "@/data/interfaces";

const fontSans = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

// export const metadata: Metadata = {
//     title: "Bandmate",
//     description: "It's a drum machine - and it works in your browser!",
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [grid, setGrid] = useState<Grid | null>(null);

    return (
        <html
            lang="en"
            className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}
            suppressHydrationWarning
        >
            <body>{children}</body>
        </html>
    );
}
