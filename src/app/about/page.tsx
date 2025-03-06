"use client";
import Header from "@/components/Header";
import Link from "next/link";
import { Slider } from "@/components/ui/Slider";
import { default_Patterns } from "@/data/global-defaults";

export default function About() {
	return (
		<>
			<Header />
			<div className="text-lg font-bold mb-5">Legend</div>
			<main>
				<div className="about">
					<div>
						<button className={"button main-button font-bold"} disabled>
							PLAY
						</button>
						/
						<button className={"button main-button font-bold text-amber-600"} disabled>
							STOP
						</button>
					</div>
					<div>Start/stop playback.</div>

					<div>
						<button className="button main-button" disabled>
							4/4
						</button>
						/
						<button className="button main-button " disabled>
							3/4
						</button>
					</div>
					<div>Change between quadruple and triple meter. It's purely cosmetic and does not affect playback. Just changes gaps in the beat map so beats in different time signatures would be easier to type.</div>

					<div>
						<button className="button main-button" disabled>
							CLEAR
						</button>
					</div>
					<div>
						<p>
							Clear the beat map and reset it to default. Or use X buttons{" "}
							<button className="button cell-size w-[2rem]" disabled>
								X
							</button>
							to the right of each kit element's names to clear only lines for these kit elements.
						</p>
					</div>

					<div>
						<div>
							<button className={"button-dynamic w-[4rem] h-[2.5rem] text-amber-950 font-bold"} disabled>
								1
							</button>
							<button className={"button-dynamic w-[4rem] h-[2.5rem] text-amber-600 font-bold"} disabled>
								2
							</button>
							<button className={"button-dynamic w-[4rem] h-[2.5rem] text-red-700 font-bold"} disabled>
								3
							</button>
						</div>
					</div>
					<div>
						<p>
							Change the dynamics of notes you will be typing.
							<span className="text-[#451a03] font-bold">1</span>'s are the quietest. <span className="text-[#d97706] font-bold">2</span>'s are typed by default. <span className="text-[#b91c1c] font-bold">3</span>'s are the
							loudest.
						</p>
					</div>

					<div>
						BPM <Slider className="w-[75px] bg-slate-700 ml-[10px] mr-[10px]" value={[4]} min={0} max={5} step={1} />
					</div>
					<div>Change tempo (range: 30-300).</div>

					<div>
						Steps <Slider className="w-[75px] bg-slate-700 ml-[10px] mr-[10px]" value={[4]} min={0} max={5} step={1} />
					</div>
					<div>Change the number of steps on the beat map (and the time signature as a result).</div>

					<div>
						<button className="button savepattern" disabled>
							Save 1-{default_Patterns.length}
						</button>
						/
						<button className="button savepattern" disabled>
							Load 1-{default_Patterns.length}
						</button>
					</div>
					<div>Save preset to your browser's local storage. Use Load buttons to load these presets back in Bandmate.</div>

					<div>
						<button className={"button-dynamic w-[120px] h-[2.5rem]"} disabled>
							Add accent
						</button>
					</div>
					<div>Add a crash cymbal at the start of the first loop, and repeats every 2, 4, or 8 loops.</div>

					<div>
						<button className={"button-dynamic w-[120px] h-[2.5rem]"} disabled>
							Add fill
						</button>
					</div>
					<div>Add a fill at the end of every 2nd, 4th, or 8th loop by replacing the last 3 steps with 3 snare hits.</div>
				</div>
			</main>
			<br />
			<Link href="/">
				<button className="button-dynamic main-button hover:bg-gray-700">Back</button>
			</Link>
		</>
	);
}
