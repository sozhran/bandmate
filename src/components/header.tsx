"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { default_Patterns } from "./global-defaults";
import Link from "next/link";
import loadDemoPattern from "./load-demo";
import { Grid } from "@/app/page";
import * as Tone from "tone";
import * as demo1 from "@/data/demo/pattern1.json";
import * as demo2 from "@/data/demo/pattern2.json";
import * as demo3 from "@/data/demo/pattern3.json";
import * as demo4 from "@/data/demo/pattern4.json";
import * as demo5 from "@/data/demo/pattern5.json";
import * as demo6 from "@/data/demo/pattern6.json";

// delete all saved patterns in local storage
const nuclearPurge = () => {
    default_Patterns.map((x) => {
        const storageKey: string = "BeateRRR_" + "Pattern" + x.toString();
        localStorage.removeItem(storageKey);
    });
};

// interface HeaderProps {
//     location: string;
// }

const handleDemo = () => {
    loadDemoPattern(demo1, 1);
    loadDemoPattern(demo2, 2);
    loadDemoPattern(demo3, 3);
    loadDemoPattern(demo4, 4);
    loadDemoPattern(demo5, 5);
    loadDemoPattern(demo6, 6);
    // setGrid(demo1);
};

export default function Header() {
    return (
        <div className="header">
            <span className="logo">
                <Image src="/icons/icon.png" width={35} height={35} alt="Drummer"></Image>
                <h1 className="text-3xl font-bold">BANDMATE</h1>
                <Button
                    variant="ghost"
                    className="w-[4rem] h-[4rem] opacity-0 hover:opacity-100 bg-opacity-90 line-through"
                    onClick={nuclearPurge}
                >
                    <Image src="https://i.imgur.com/mgifSOk.png" width={50} height={50} alt=""></Image>
                </Button>
            </span>
            <span className="logo">
                {window.location.pathname === "/about" ? (
                    <></>
                ) : (
                    <Link href="/about">
                        <button className="button main-button">About</button>
                    </Link>
                )}
                <button className="button main-button" onClick={handleDemo}>
                    DEMO
                </button>
            </span>
        </div>
    );
}
