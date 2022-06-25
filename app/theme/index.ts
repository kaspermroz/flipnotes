import type { Theme } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

export const theme: Partial<Theme> = extendTheme({
  styles: {
    global: {
      "html, body": {
        background: "#e5e5e5",
        height: "100vh",
        width: "100%",
      },
    },
  },
});
