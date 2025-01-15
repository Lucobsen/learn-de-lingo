import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";

type TestItemProps = {
  knownWord: string;
  newWord: string;
};

export const TestItem = ({ newWord, knownWord }: TestItemProps) => {
  const [reveal, setReveal] = useState(false);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      py={1}
    >
      <Typography>{newWord}</Typography>
      {reveal ? (
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "0.875rem",
            alignContent: "center",
            lineHeight: 1.75,
            fontWeight: 500,
            minWidth: 100,
            py: "5px",
            borderRadius: 1,
            color: ({ palette }) => palette.success.main,
            border: ({ palette }) => `1px solid ${palette.success.main}}`,
          }}
        >
          {knownWord}
        </Typography>
      ) : (
        <Button
          sx={{ minWidth: 100 }}
          variant="outlined"
          onClick={() => setReveal(true)}
        >
          Reveal
        </Button>
      )}
    </Stack>
  );
};
