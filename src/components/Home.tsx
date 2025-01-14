import { Button, Container, Modal, Stack } from "@mui/material";
import { useState } from "react";
import { AddItemModal } from "./AddItemModal";

export const Home = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Container
        sx={{ display: "flex", marginTop: 5, justifyContent: "center" }}
      >
        <Stack direction="column" gap={2}>
          <Button variant="contained" onClick={handleOpen}>
            Add New Word Group
          </Button>
        </Stack>
      </Container>

      <Modal open={open} onClose={handleClose}>
        <div>
          <AddItemModal close={handleClose} />
        </div>
      </Modal>
    </>
  );
};
