
import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    brand: {
      bg: "#0D1520",
      componentbg: "#111927",
      componentbghover: "#0D2847",
      componentbgonclck: "#003362",
      border: "#004074",
      border1: "#104D87",
      border3: "#205D9E",
      solidbg: "#0090FF",
      solidbghover: "#3B9EFF",
      text1: "#70B8FF",
      text2: "#C2E6FF",
    },
  },
  fonts: {
    heading: "'Mallana', sans-serif",
    body: "'Mallana', sans-serif",
  },
});

export default customTheme;
