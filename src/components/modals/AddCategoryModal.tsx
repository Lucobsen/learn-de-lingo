import { Button, styled, TextField } from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { Word } from "../Home";

const StyledBox = styled("div")`
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 16px;
  border: ${({ theme }) => `1px solid ${theme.palette.primary.main}`};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

const StyledForm = styled("form")`
  display: flex;
  flex-direction: column;
`;

export type Category = { id: string; title: string; words: Word[] };

type AddCategoryModalProps = { addCategory: (category: Category) => void };

export const AddCategoryModal = ({ addCategory }: AddCategoryModalProps) => {
  const form = useForm<{ title: string }>({
    defaultValues: { title: "" },
    onSubmit: ({ value }) => {
      addCategory({ title: value.title, id: crypto.randomUUID(), words: [] });
    },
  });

  return (
    <StyledBox>
      <StyledForm
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div>
          <form.Field
            name="title"
            children={(field) => (
              <TextField
                id={field.name}
                fullWidth
                name={field.name}
                label="New Category"
                value={field.state.value}
                onChange={({ target }) => field.handleChange(target.value)}
              />
            )}
          />
        </div>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              disabled={!canSubmit}
              type="submit"
              variant="contained"
              sx={{ mt: 2 }}
            >
              {isSubmitting ? "..." : "Submit"}
            </Button>
          )}
        />
      </StyledForm>
    </StyledBox>
  );
};
