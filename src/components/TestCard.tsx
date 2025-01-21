import { Button, Card } from "@mui/material";
import { useLocalStorage } from "usehooks-ts";
import { TestItem } from "./TestItem";
import { Word } from "./Home";
import { Category } from "./modals/AddCategoryModal";

type TestCardProps = {
  testingId: string;
  testWords: Word[];
  updateIsTestingState: () => void;
};

export const TestCard = ({
  testingId,
  testWords,
  updateIsTestingState,
}: TestCardProps) => {
  const [categories, setCategories] = useLocalStorage<Record<string, Category>>(
    "categories",
    {}
  );

  const updateWord = (
    updatedWord: string,
    score: number = 0,
    value: boolean
  ) => {
    const updatedCategory = categories[testingId];
    const index = updatedCategory.words.findIndex(
      ({ newWord }) => newWord === updatedWord
    );

    if (index >= 0) {
      if (value === true) {
        const result = score + 25;
        updatedCategory.words[index].score = result > 100 ? 100 : result;
      } else if (value === false) {
        const result = score - 25;
        updatedCategory.words[index].score = result < 0 ? 0 : result;
      }

      setCategories({ ...categories, [testingId]: updatedCategory });
    }
  };

  return (
    <Card
      sx={{
        p: 1,
        width: "60%",
        borderRadius: 1,
        border: ({ palette }) => `1px solid ${palette.primary.main}`,
      }}
    >
      {testWords.map(({ knownWord, newWord, score }, index) => (
        <TestItem
          key={index}
          knownWord={knownWord}
          newWord={newWord}
          updateScore={(value) => updateWord(newWord, score, value)}
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
