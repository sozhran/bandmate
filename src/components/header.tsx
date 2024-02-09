"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { default_Patterns } from "./global-defaults";

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
                {/* <button className="button main-button line-through">DEMO</button> */}
                {/* {location === "about" ? (
                    <></>
                ) : (
                    <Link href="/about">
                        <button className="button main-button">About</button>
                    </Link>
                )} */}
                {/* <ModeToggle /> */}
            </span>
        </div>
    );
}
