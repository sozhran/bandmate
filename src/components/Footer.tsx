"use client";
import Image from "next/image";

export default function Footer() {
	return (
		<div className="flex justify-center items-center w-full h-[45px] mt-[20px]">
			<span className="opacity-30 hover:opacity-70">
				<a href="https://github.com/sozhran/bandmate" target="_blank">
					<Image
						alt="github share icon"
						src="https://i.imgur.com/5Qr1cEC.png"
						width="25"
						height="25"
						className="share"
					/>
				</a>
			</span>
		</div>
	);
}
