import { Button, IconButton, Palette, Stack } from "@mui/material";
import { useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const getColor = (palette: Palette, passed: boolean | undefined) => {
  if (passed === true) return palette.success.main;

  if (passed === false) return palette.error.main;

  return palette.info.main;
};

type TestItemProps = {
  knownWord: string;
  newWord: string;
  updateScore: (value: boolean) => void;
};

export const TestItem = ({
  newWord,
  knownWord,
  updateScore,
}: TestItemProps) => {
  const [reveal, setReveal] = useState(false);
  const [passed, setPassed] = useState<boolean>();

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      py={1}
    >
      <Button
        sx={{
          minWidth: 100,
          color: ({ palette }) => getColor(palette, passed),
        }}
        variant="outlined"
        onClick={() => {
          setReveal((previousValue) => !previousValue);
          if (reveal === true && passed !== undefined) setPassed(undefined);
        }}
      >
        {reveal ? knownWord : newWord}
      </Button>
      <Stack direction="row">
        <IconButton
          disabled={!reveal}
          color="success"
          onClick={() => {
            setPassed(true);
            updateScore(true);
          }}
        >
          <CheckCircleOutlineIcon />
        </IconButton>
        <IconButton
          disabled={!reveal}
          color="error"
          onClick={() => {
            setPassed(false);
            updateScore(false);
          }}
        >
          <CancelOutlinedIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};
