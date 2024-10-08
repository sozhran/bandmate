"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import Combobox from "./ui/combobox";
import UploadFile from "@/components/upload-file";
import useNuclearButton from "@/functions/nuclear";

export default function Header() {
    // const location = usePathname();

    return (
        <div className="header">
            <span className="logo">
                <Image src="/icons/icon.png" width={35} height={35} alt="Drummer"></Image>
                <h1 className="text-3xl font-bold">BANDMATE</h1>
                <Button variant="ghost" className="w-[4rem] h-[4rem] opacity-0 hover:opacity-100 bg-opacity-90 line-through" onClick={useNuclearButton}>
                    <Image src="https://i.imgur.com/mgifSOk.png" width={50} height={50} alt=""></Image>
                </Button>
            </span>
            <span className="logo">
                <Combobox />
                {/* <button className="button main-button hover:bg-gray-700">Save</button> */}
                {/* <UploadFile /> */}
            </span>
        </div>
    );
}
