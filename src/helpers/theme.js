
import { createTheme } from "@mui/material";


export const theme = createTheme({
  palette: {
    primary: {
      light: "#613db8b8",
      main: "#613db8",
      dark: "#542bb9",
    },
    secondary: {
      light: "#0f0e0f",
      main: "#3E363F",
      dark: "#7c737d",
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
});
