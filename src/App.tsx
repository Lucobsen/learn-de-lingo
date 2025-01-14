import {
  AppBar,
  Box,
  createTheme,
  SvgIcon,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { Home } from "./components/Home";

const App = () => {
  const theme = createTheme({
    colorSchemes: {
      light: true,
      dark: true,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <SvgIcon fontSize="large" component={AutoStoriesIcon} />
            <Typography variant="h6" sx={{ flexGrow: 1 }} pl={2}>
              Learn De Lingo
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Home />
    </ThemeProvider>
  );
};

export default App;
