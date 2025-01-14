import { Box, Button, Container, Modal, Stack } from "@mui/material";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  border: "1px solid #1976d2",
  borderRadius: 2,
};

export const Home = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const form = useForm({
    defaultValues: {
      foreignWord: "",
      nativeWord: "",
    },
    onSubmit: ({ value }) => {
      console.log(value);
      handleClose();
    },
  });

  return (
    <>
      <Container
        sx={{ display: "flex", marginTop: 5, justifyContent: "center" }}
      >
        <Stack direction="column" gap={2}>
          <Button variant="contained" onClick={handleOpen}>
            Add Vocabulary
          </Button>
          <Button variant="contained">Test Vocabulary</Button>
        </Stack>
      </Container>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div>
              <form.Field
                name="foreignWord"
                children={(field) => (
                  <>
                    <label htmlFor={field.name}>Foreign Word:</label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </>
                )}
              />
            </div>

            <div>
              <form.Field
                name="nativeWord"
                children={(field) => (
                  <>
                    <label htmlFor={field.name}>Native Word:</label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </>
                )}
              />
            </div>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button disabled={!canSubmit} type="submit">
                  {isSubmitting ? "..." : "Submit"}
                </Button>
              )}
            />
          </form>
        </Box>
      </Modal>
    </>
  );
};
