import { Button, TableCell, TableRow, TextField } from "@mui/material";
import { useState } from "react";
import { Word } from "./Home";

type NewItemRowProps = { addItem: (word: Word) => void };

export const NewItemRow = ({ addItem }: NewItemRowProps) => {
  const blankItem: Word = {
    id: "",
    newWord: "",
    knownWord: "",
  };
  const [newItem, setNewItem] = useState<Word>(blankItem);

  return (
    <TableRow>
      <TableCell padding="none" sx={{ pt: 0.5, pr: 1, border: "none" }}>
        <TextField
          fullWidth
          variant="standard"
          name="newWord"
          placeholder="New Word"
          value={newItem.newWord}
          onChange={({ target }) =>
            setNewItem({ ...newItem, newWord: target.value.toUpperCase() })
          }
        />
      </TableCell>

      <TableCell padding="none" sx={{ pt: 0.5, pr: 1, border: "none" }}>
        <TextField
          fullWidth
          variant="standard"
          name="knownWord"
          placeholder="Known Word"
          value={newItem.knownWord}
          onChange={({ target }) =>
            setNewItem({ ...newItem, knownWord: target.value.toUpperCase() })
          }
        />
      </TableCell>

      <TableCell padding="none" sx={{ pt: 0.5, border: "none" }}>
        <Button
          fullWidth
          size="small"
          disabled={newItem.knownWord === "" || newItem.newWord === ""}
          variant="contained"
          onClick={() => {
            addItem({
              ...newItem,
              id: `${newItem.newWord}-${newItem.knownWord}`,
              score: 0,
            });

            setNewItem(blankItem);
          }}
        >
          Add
        </Button>
      </TableCell>
    </TableRow>
  );
};
