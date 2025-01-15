import { createTheme, ThemeProvider } from "@mui/material";
import { Home } from "./components/Home";
import { TopBar } from "./components/TopBar";

const App = () => {
  const theme = createTheme({
    colorSchemes: {
      light: true,
      dark: true,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <TopBar />
      <Home />
    </ThemeProvider>
  );
};

export default App;
