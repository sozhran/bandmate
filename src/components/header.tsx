"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { default_Patterns } from "@/data/global-defaults";
import Demo from "@/functions/load-demo";
import createEmptyGrid from "@/functions/create-empty-grid";
import UploadFile from "@/components/upload-file";
import useNuclearButton from "@/functions/nuclear";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const location = usePathname();

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
                {/* <button className="button main-button hover:bg-gray-700">Save</button> */}
                <UploadFile />
                {/* {location === "/about" ? (
                    <></>
                ) : (
                    <Link href="/about">
                        <button className="button main-button hover:bg-gray-700">About</button>
                    </Link>
                )} */}
                <Demo />
            </span>
        </div>
    );
}
