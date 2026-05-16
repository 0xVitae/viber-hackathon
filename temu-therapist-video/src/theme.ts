import { loadFont as loadDisplay } from "@remotion/google-fonts/Bungee";
import { loadFont as loadBody } from "@remotion/google-fonts/Inter";

const { fontFamily: displayFontFamily } = loadDisplay();
const { fontFamily: bodyFontFamily } = loadBody("normal", {
  weights: ["700", "900"],
  subsets: ["latin"],
});

export const fonts = {
  display: displayFontFamily,
  body: bodyFontFamily,
};

export const colors = {
  orange: "#ff7a00",
  orangeDeep: "#e85d00",
  orangeLight: "#ffd9b0",
  cream: "#fff4e6",
  black: "#0b0b0b",
  white: "#ffffff",
  neon: "#c6ff00",
  yellow: "#ffd400",
  gold: "#f5b942",
  pink: "#ff3ea5",
  red: "#ef2b2b",
  purple: "#7c4dff",
  green: "#16c47f",
};

export const shadow = (offset = 8, color = colors.black) =>
  `${offset}px ${offset}px 0 ${color}`;
