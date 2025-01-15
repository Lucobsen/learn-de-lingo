import { AppBar, Box, SvgIcon, Toolbar, Typography } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

export const TopBar = () => (
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
);
