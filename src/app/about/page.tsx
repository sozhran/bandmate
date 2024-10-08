"use client";
import Header from "@/components/header";
import Link from "next/link";

export default function About() {
    return (
        <>
            <Header />
            <main>
                <div className="about-full-container">
                    <div className="about-left">
                        <p>Yay</p>
                        <p>Nay</p>
                    </div>

                    <div className="about-right"></div>

                    <h1>Welcome to Bandmate.</h1>

                    <p>Bandmate is a drum machine</p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <h5>I found the hidden button. What does it do?</h5>
                    <p>It purges the local storage, where Bandmate saves presets.</p>
                </div>
            </main>
            <Link href="/">
                <button className="button main-button hover:bg-gray-700">Back</button>
            </Link>
        </>
    );
}
