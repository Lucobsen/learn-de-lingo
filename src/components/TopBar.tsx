import {
  AppBar,
  Box,
  Fab,
  Modal,
  SvgIcon,
  Toolbar,
  Typography,
} from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import AddIcon from "@mui/icons-material/Add";
import { AddCategoryModal, Category } from "./modals/AddCategoryModal";

export const TopBar = () => {
  const [categories, setCategories] = useLocalStorage<Record<string, Category>>(
    "categories",
    {}
  );
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <AppBar
          position="fixed"
          sx={{
            zIndex: 1000,
            borderBottom: ({ palette }) => `1px solid ${palette.primary.main}`,
          }}
        >
          <Toolbar>
            <SvgIcon fontSize="large" component={AutoStoriesIcon} />
            <Typography variant="h6" sx={{ flexGrow: 1 }} pl={2}>
              Learn De Lingo
            </Typography>

            <Fab
              size="small"
              sx={{
                width: 30,
                height: 30,
                minHeight: 30,
                color: ({ palette }) => palette.primary.main,
                backgroundColor: ({ palette }) => palette.background.paper,
                border: ({ palette }) => `1px solid ${palette.primary.main}`,
                "&:hover": {
                  backgroundColor: ({ palette }) => palette.background.paper,
                },
              }}
              color="primary"
              onClick={handleOpen}
            >
              <AddIcon />
            </Fab>
          </Toolbar>
        </AppBar>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <AddCategoryModal
          addCategory={(value) => {
            setCategories({ ...categories, [value.id]: value });
            handleClose();
          }}
        />
      </Modal>
    </>
  );
};
