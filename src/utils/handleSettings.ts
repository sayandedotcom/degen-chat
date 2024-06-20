interface Settings {
  visual: string;
  audio: string;
  motion: string;
}
// import { useSetRecoilState } from "recoil";
// import { websiteAudioState } from "../atoms/website-theme";

export const handleSettingsSave = (
  settingsState: Settings,
  websiteTheme: any,
  setWebsiteTheme: any
) => {
  switch (settingsState.visual) {
    case "rem":
      setWebsiteTheme({
        ...websiteTheme,
        bgColor: "#0000FF",
        textColor: "#ffffff",
        buttonColor: "#0000FF",
      });
      break;
    case "neo":
      setWebsiteTheme({
        ...websiteTheme,
        bgColor: "#000000",
        textColor: "#00FF00",
        buttonColor: "#000000",
      });
      break;
    case "oen":
      setWebsiteTheme({
        ...websiteTheme,
        bgColor: "#00FF00",
        textColor: "#000000",
        buttonColor: "#00FF00",
      });
      break;
    case "hmmm":
      setWebsiteTheme({
        ...websiteTheme,
        bgColor: "#FF5959",
        textColor: "#ffffff",
        buttonColor: "#000000",
      });
      break;
    case "b/w":
      setWebsiteTheme({
        ...websiteTheme,
        bgColor: "#ffffff",
        textColor: "#000000",
        buttonColor: "#000000",
      });
      break;
  }

  
};
