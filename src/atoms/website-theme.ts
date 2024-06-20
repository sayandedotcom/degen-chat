import { atom } from "recoil";
import winMusic from "../assets/win.mp3";
// import synthMusic from "../assets/synth.mp3";
export const websiteThemeState = atom({
  key: "websiteThemeState",
  default: { bgColor: "#0000FF", textColor: "#ffffff", buttonColor: "#0000FF" },
});

export const websiteAudioState = atom({
  key: "websiteAudioState",
  default: winMusic,
});
