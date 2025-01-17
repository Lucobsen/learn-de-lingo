import { Button, Card } from "@mui/material";
import { useLocalStorage } from "usehooks-ts";
import { TestItem } from "./TestItem";
import { Word } from "./Home";

type TestCardProps = {
  testWords: Word[];
  updateIsTestingState: () => void;
};

export const TestCard = ({
  testWords,
  updateIsTestingState,
}: TestCardProps) => {
  const [words, setWords] = useLocalStorage<Word[]>("words", []);

  const updateWord = (
    updatedWordId: string,
    score: number = 0,
    value: boolean
  ) => {
    const index = words.findIndex(({ id }) => id === updatedWordId);

    if (index >= 0) {
      if (value === true) {
        const result = score + 25;
        words[index].score = result > 100 ? 100 : result;
      } else if (value === false) {
        const result = score - 25;
        words[index].score = result < 0 ? 0 : result;
      }

      setWords(words);
    }
  };

  return (
    <Card
      sx={{
        p: 1,
        width: 300,
        borderRadius: 1,
        border: ({ palette }) => `1px solid ${palette.primary.main}`,
      }}
    >
      {testWords.map(({ knownWord, newWord, id, score }) => (
        <TestItem
          key={id}
          knownWord={knownWord}
          newWord={newWord}
          updateScore={(value) => updateWord(id, score, value)}
        />
      ))}
      <Button
        color="error"
        sx={{ float: "right" }}
        onClick={updateIsTestingState}
      >
        Close
      </Button>
    </Card>
  );
};
