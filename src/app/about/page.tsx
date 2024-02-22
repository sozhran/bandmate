"use client";
import Header from "@/components/header";
import Link from "next/link";

export default function About() {
    return (
        <>
            <Header />
            <div>Welcome to Bandmate.</div>
            <Link href="/">
                <button className="button main-button">Back</button>
            </Link>
        </>
    );
}
