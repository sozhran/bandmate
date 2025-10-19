import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

({ accept: { "application/json": [".bandmate"] } });

export default function Dropzone() {
	const [isDragging, setIsDragging] = useState(false);

	return <div className="w-[40px] h-[40px] bg-zinc-600 border-2 border-cyan-700 flex flex-col items-center justify-center text-center"></div>;
}
