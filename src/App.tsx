import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Toolbar,
  Typography,
} from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

const App = () => {
  return (
    <>
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

      <Container
        sx={{ display: "flex", marginTop: 5, justifyContent: "center" }}
      >
        <Stack direction="column" gap={2}>
          <Button variant="contained" color="success">
            Add Vocabulary
          </Button>
          <Button variant="contained">Test Vocabulary</Button>
        </Stack>
      </Container>
    </>
  );
};

export default App;
