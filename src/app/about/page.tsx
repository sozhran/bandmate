"use client";
import Header from "@/components/header";
import { Link } from "lucide-react";
import Image from "next/image";

export default function About() {
    return (
        <>
            <Header />
            <div>Welcome to Beater.</div>
            <Link href="/">
                <button className="button main-button">Back</button>
            </Link>
        </>
    );
}
