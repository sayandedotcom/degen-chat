import { atom } from "recoil";

export const websiteThemeState = atom({
  key: "websiteThemeState",
  default: { bgColor: "#0000FF", textColor: "#ffffff", buttonColor: "#0000FF" },
});
