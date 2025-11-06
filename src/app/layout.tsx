import type { Metadata } from "next";
import "./reset.css";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import React from "react";
import Footer from "@/components/Footer";

const fontSans = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "Bandmate",
	description: "A drum machine that works in your browser",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
			<body className="flex flex-col min-h-screen">
				<div className="flex-grow">{children}</div>
				<Footer />
			</body>
		</html>
	);
}
