"use client";
import Image from "next/image";
import { Button } from "./ui/Button";
import Combobox from "./ui/Combobox";
import UploadFile from "@/components/UploadFile";
import cleanLocalStorage from "@/functions/clean-local-storage";
import { usePathname } from "next/navigation";

export default function Header() {
	const location = usePathname();

	return (
		<div className="header">
			<span className="logo">
				<a href="/">
					<Image src="/icons/icon.png" width={35} height={35} alt="Drummer"></Image>
				</a>
				<a href="/">
					<h1 className="text-3xl font-bold">BANDMATE</h1>
				</a>
				<Button variant="ghost" className="w-[4rem] h-[4rem] opacity-0 hover:opacity-100 " onClick={cleanLocalStorage}>
					<Image src="https://i.imgur.com/mgifSOk.png" width={50} height={50} alt=""></Image>
				</Button>
			</span>
			<span className="logo">
				{/*<button className="button main-controls" onClick={downloadPreset}>Save</button>*/}
				{location === "/about" ? (
					<a href="/">
						<button className="button main-controls">Back</button>
					</a>
				) : (
					<a href="/about">
						<button className="button main-controls">About</button>
					</a>
				)}
				<Combobox />

				{/* <UploadFile /> */}
			</span>
		</div>
	);
}
