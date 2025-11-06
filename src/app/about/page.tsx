"use client";
import BeatMapControl from "@/components/BeatMapControl";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Slider from "@/components/ui/Slider";
import { DEFAULT_PATTERNS } from "@/data/global-defaults";

export default function About() {
	return (
		<>
			<Header />
			<main className="flex justify-center items-center self-start">
				<div className="about">
					<div>
						<button className={"button main-controls font-bold"} disabled>
							PLAY
						</button>
						/
						<button className={"button main-controls font-bold text-amber-600"} disabled>
							STOP
						</button>
					</div>
					<div>Start/stop playback.</div>

					<div>
						<button className="button main-controls" disabled>
							4/4
						</button>
						/
						<button className="button main-controls" disabled>
							3/4
						</button>
					</div>
					<div>
						Change between quadruple and triple meter. It's purely cosmetic and does not affect playback.
						Just changes gaps between cells to make beats in different meters easier to type.
					</div>

					<div>
						<BeatMapControl label={"⬛⬛⬛⬛"} rowIndex={0} extraCss={"text-[4px]"} disabled={true} />
						<BeatMapControl label={"♪"} rowIndex={0} extraCss={"font-extrabold text-xl"} disabled={true} />
						<BeatMapControl label={"♪"} rowIndex={0} extraCss={"font-extralight text-xs"} disabled={true} />
						<BeatMapControl label={"X"} rowIndex={0} extraCss={""} disabled={true} />
					</div>
					<div>
						These controls allow to manipulate their entire respective rows: to fill them with notes
						(currently chosen dynamics will be used), fill only strong or weak beats, or clear them,
						respectively.
					</div>

					<div>
						<button className="button main-controls" disabled>
							CLEAR
						</button>
					</div>
					<div>
						<p>Clear the whole beat map and reset it to default.</p>
					</div>

					<div>
						<div>
							<button className={"button w-[4rem] h-[2.5rem] text-amber-950 font-bold"} disabled>
								1
							</button>
							<button className={"button w-[4rem] h-[2.5rem] text-amber-600 font-bold"} disabled>
								2
							</button>
							<button className={"button w-[4rem] h-[2.5rem] text-red-700 font-bold"} disabled>
								3
							</button>
						</div>
					</div>
					<div>
						<p>
							Change the dynamics of notes you will be typing.
							<br />
							<span className="text-[#451a03] font-bold">1</span>'s are the quietest.{" "}
							<span className="text-[#d97706] font-bold">2</span>'s are typed by default.{" "}
							<span className="text-[#b91c1c] font-bold">3</span>'s are the loudest.
						</p>
					</div>

					<div>
						BPM{" "}
						<Slider
							className="w-[75px] bg-slate-700 ml-[10px] mr-[10px]"
							value={[4]}
							min={0}
							max={5}
							step={1}
						/>
					</div>
					<div>Change tempo (range: 30-300).</div>

					<div>
						Steps{" "}
						<Slider
							className="w-[75px] bg-slate-700 ml-[10px] mr-[10px]"
							value={[4]}
							min={0}
							max={5}
							step={1}
						/>
					</div>
					<div>Change the number of steps on the beat map (and the time signature as a result).</div>

					<div>
						<button className="button savepattern" disabled>
							Save 1-{DEFAULT_PATTERNS.length}
						</button>
						/
						<button className="button savepattern" disabled>
							Load 1-{DEFAULT_PATTERNS.length}
						</button>
					</div>
					<div>
						Save preset to your browser's local storage. Use Load buttons to load these presets back in
						Bandmate.
					</div>

					<div>
						<button className={"button w-[120px] h-[2.5rem]"} disabled>
							Add accent
						</button>
					</div>
					<div>Adds a crash cymbal at the start of the first loop, and repeats every 2, 4, or 8 loops.</div>

					<div>
						<button className={"button w-[120px] h-[2.5rem]"} disabled>
							Add fill
						</button>
					</div>
					<div>
						Adds a fill at the end of every 2nd, 4th, or 8th loop (replaces the last 3 beats with snare
						hits).
					</div>
				</div>
			</main>
		</>
	);
}
