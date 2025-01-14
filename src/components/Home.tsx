import {
  Button,
  Container,
  Modal,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { AddItemModal } from "./AddItemModal";
import { useLocalStorage } from "usehooks-ts";

const StyledBox = styled("div")`
  justify-content: center;
  min-width: 168px;
  padding: 16px;
  border: ${({ theme }) => `1px solid ${theme.palette.primary.main}`};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

export type Word = { newWord: string; knownWord: string };

export const Home = () => {
  const [words, setWords] = useLocalStorage<Word[]>("words", []);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Container
        sx={{ display: "flex", marginTop: 5, justifyContent: "center" }}
      >
        <Stack direction="column" gap={2} alignItems="center">
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{ minWidth: "200px" }}
          >
            Add New Words
          </Button>

          {words.length > 0 ? (
            <StyledBox>
              {words.map(({ knownWord, newWord }, index) => (
                <Stack key={index}>
                  <Typography>
                    {newWord} = {knownWord}
                  </Typography>
                </Stack>
              ))}
            </StyledBox>
          ) : null}
        </Stack>
      </Container>

      <Modal open={open} onClose={handleClose}>
        <div>
          <AddItemModal
            addItem={(value) => {
              setWords((previousValue) => [...previousValue, value]);
              handleClose();
            }}
          />
        </div>
      </Modal>
    </>
  );
};
