import { Button, styled, TextField } from "@mui/material";
import { Word } from "../Home";
import { useState } from "react";

const StyledBox = styled("div")`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 16px;
  border: ${({ theme }) => `1px solid ${theme.palette.primary.main}`};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

export type Category = { id: string; title: string; words: Word[] };

type AddCategoryModalProps = { addCategory: (category: Category) => void };

export const AddCategoryModal = ({ addCategory }: AddCategoryModalProps) => {
  const [categoryTitle, setCategoryTitle] = useState("");

  return (
    <StyledBox>
      <TextField
        fullWidth
        placeholder="New Category Title"
        name="categoryTitle"
        value={categoryTitle}
        onChange={({ target }) => setCategoryTitle(target.value)}
      />

      <Button
        onClick={() =>
          addCategory({
            id: crypto.randomUUID(),
            title: categoryTitle,
            words: [],
          })
        }
        disabled={!categoryTitle}
        variant="contained"
        sx={{ mt: 2 }}
      >
        Add
      </Button>
    </StyledBox>
  );
};
