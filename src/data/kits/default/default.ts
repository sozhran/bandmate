import { SAMPLE_URL } from "@/data/global-defaults";
import { Drumkit } from "@/data/interfaces";

export const drumkitDefault = [
    { name: "kick", buttonName: "Kick" },
    { name: "snare", buttonName: "Snare" },
    { name: "hihat_closed", buttonName: "Hi-Hat (closed)" },
    { name: "hihat_open", buttonName: "Hi-Hat (open)" },
    { name: "ride", buttonName: "Ride" },
    { name: "ride_bell", buttonName: "Ride (bell)" },
    { name: "crash1", buttonName: "Crash #1" },
    { name: "crash2", buttonName: "Crash #2" },
    { name: "splash", buttonName: "Splash" },
    { name: "tom1", buttonName: "Tom #1" },
    { name: "tom2", buttonName: "Tom #2" },
    { name: "tom3", buttonName: "Tom #3" },
    { name: "tom4", buttonName: "Tom #4" }
];

export function getDrumSamplesList(drumkit: Drumkit[]): string[] {
    const result: string[] = []

    drumkit.forEach((elm) => result.push(`${elm.name}_1`, `${elm.name}_2`, `${elm.name}_3`));

    ["kick", "snare"].forEach((elm: string) => result.push(`${elm}_1_extra`, `${elm}_2_extra`, `${elm}_3_extra`))

    return result
}

export function preloadDrumkit(input: string[]) {
    const preloader: Record<string, string> = {}

    input.map((elm: string) => preloader[elm] = require(SAMPLE_URL + elm))

    return preloader
}

//export const drumkitPreloader = {
//    kick_1: require("@/data/kits/default/mp3/kick_1.mp3"),
//    kick_2: require("@/data/kits/default/mp3/kick_2.mp3"),
//    kick_3: require("@/data/kits/default/mp3/kick_3.mp3"),
//    snare_1: require("@/data/kits/default/mp3/snare_1.mp3"),
//    snare_2: require("@/data/kits/default/mp3/snare_2.mp3"),
//    snare_3: require("@/data/kits/default/mp3/snare_3.mp3"),
//    hihat_closed_1: require("@/data/kits/default/mp3/hihat_closed_1.mp3"),
//    hihat_closed_2: require("@/data/kits/default/mp3/hihat_closed_2.mp3"),
//    hihat_closed_3: require("@/data/kits/default/mp3/hihat_closed_3.mp3"),
//    hihat_open_1: require("@/data/kits/default/mp3/hihat_open_1.mp3"),
//    hihat_open_2: require("@/data/kits/default/mp3/hihat_open_2.mp3"),
//    hihat_open_3: require("@/data/kits/default/mp3/hihat_open_3.mp3"),
//    ride_1: require("@/data/kits/default/mp3/ride_1.mp3"),
//    ride_2: require("@/data/kits/default/mp3/ride_2.mp3"),
//    ride_3: require("@/data/kits/default/mp3/ride_3.mp3"),
//    ride_bell_1: require("@/data/kits/default/mp3/ride_bell_1.mp3"),
//    ride_bell_2: require("@/data/kits/default/mp3/ride_bell_2.mp3"),
//    ride_bell_3: require("@/data/kits/default/mp3/ride_bell_3.mp3"),
//    crash1_1: require("@/data/kits/default/mp3/crash1_1.mp3"),
//    crash1_2: require("@/data/kits/default/mp3/crash1_2.mp3"),
//    crash1_3: require("@/data/kits/default/mp3/crash1_3.mp3"),
//    crash2_1: require("@/data/kits/default/mp3/crash2_1.mp3"),
//    crash2_2: require("@/data/kits/default/mp3/crash2_2.mp3"),
//    crash2_3: require("@/data/kits/default/mp3/crash2_3.mp3"),
//    splash_1: require("@/data/kits/default/mp3/splash_1.mp3"),
//    splash_2: require("@/data/kits/default/mp3/splash_2.mp3"),
//    splash_3: require("@/data/kits/default/mp3/splash_3.mp3"),
//    tom1_1: require("@/data/kits/default/mp3/tom1_1.mp3"),
//    tom1_2: require("@/data/kits/default/mp3/tom1_2.mp3"),
//    tom1_3: require("@/data/kits/default/mp3/tom1_3.mp3"),
//    tom2_1: require("@/data/kits/default/mp3/tom2_1.mp3"),
//    tom2_2: require("@/data/kits/default/mp3/tom2_2.mp3"),
//    tom2_3: require("@/data/kits/default/mp3/tom2_3.mp3"),
//    tom3_1: require("@/data/kits/default/mp3/tom3_1.mp3"),
//    tom3_2: require("@/data/kits/default/mp3/tom3_2.mp3"),
//    tom3_3: require("@/data/kits/default/mp3/tom3_3.mp3"),
//    tom4_1: require("@/data/kits/default/mp3/tom4_1.mp3"),
//    tom4_2: require("@/data/kits/default/mp3/tom4_2.mp3"),
//    tom4_3: require("@/data/kits/default/mp3/tom4_3.mp3"),
//    extra_crash: require("@/data/kits/extra/extra_crash.mp3"),
//    extra_snare: require("@/data/kits/extra/extra_snare.mp3")
//};
