"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { default_Patterns } from "@/data/global-defaults";
import Demo from "@/functions/load-demo";
import createEmptyGrid from "@/functions/create-empty-grid";
import { useDrumkitStore } from "@/data/global-state-store";

export default function Header() {
    // delete all saved patterns in local storage
    const useNuclearButton = () => {
        const drumkit = useDrumkitStore((state) => state.drumkit);

        default_Patterns.map((x) => {
            const storageKey: string = "BeateRRR_" + "Pattern" + x.toString();
            localStorage.removeItem(storageKey);
        });
        createEmptyGrid(drumkit, 32);
    };

    return (
        <div className="header">
            <span className="logo">
                <Image src="/icons/icon.png" width={35} height={35} alt="Drummer"></Image>
                <h1 className="text-3xl font-bold">BANDMATE</h1>
                <Button
                    variant="ghost"
                    className="w-[4rem] h-[4rem] opacity-0 hover:opacity-100 bg-opacity-90 line-through"
                    onClick={useNuclearButton}
                >
                    <Image src="https://i.imgur.com/mgifSOk.png" width={50} height={50} alt=""></Image>
                </Button>
            </span>
            <span className="logo">
                {/* {window.location.pathname === "/about" ? (
                    <></>
                ) : (
                    <Link href="/about">
                        <button className="button main-button">About</button>
                    </Link>
                )} */}
                <Demo />
            </span>
        </div>
    );
}
