import { createTheme, AppBar } from "@mui/material";
import { red } from "@nextui-org/react";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: "#49c5b6",
    },
    error: {
      main: red.red400,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "black",
          elevation: 0,
        },
      },
    },
  },
});
