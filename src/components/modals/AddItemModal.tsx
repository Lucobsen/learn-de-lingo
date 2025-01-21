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

type AddItemModalProps = { addItem: (word: Word) => void };

export const AddItemModal = ({ addItem }: AddItemModalProps) => {
  const form = useForm<Pick<Word, "newWord" | "knownWord">>({
    defaultValues: {
      newWord: "",
      knownWord: "",
    },
    onSubmit: ({ value }) => {
      addItem({ ...value, score: 0, id: crypto.randomUUID() });
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
            name="newWord"
            children={(field) => (
              <TextField
                id={field.name}
                fullWidth
                name={field.name}
                label="New Word"
                value={field.state.value}
                onChange={({ target }) =>
                  field.handleChange(target.value.toUpperCase())
                }
              />
            )}
          />
        </div>

        <div style={{ paddingTop: 16 }}>
          <form.Field
            name="knownWord"
            children={(field) => (
              <TextField
                fullWidth
                id={field.name}
                name={field.name}
                label="Known Word"
                value={field.state.value}
                onChange={({ target }) =>
                  field.handleChange(target.value.toUpperCase())
                }
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
