import { Container, Modal, Stack } from "@mui/material";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { TestCard } from "./TestCard";
import { WordCard } from "./WordCard";
import { Category } from "./modals/AddCategoryModal";
import { AddItemModal } from "./modals/AddItemModal";

export type Word = {
  newWord: string;
  knownWord: string;
  score?: number;
};

const getRandom = (words: Word[], count = 5) => {
  const result = new Array(count);
  let length = words.length;
  const taken = new Array(length);

  if (count > length) count = length;

  while (count--) {
    const x = Math.floor(Math.random() * length);
    result[count] = words[x in taken ? taken[x] : x];
    taken[x] = --length in taken ? taken[length] : length;
  }

  return result;
};

export const Home = () => {
  const [categories, setCategories] = useLocalStorage<Record<string, Category>>(
    "categories",
    {}
  );

  const [focusedId, setFocusedId] = useState("");
  const [testWords, setTestWords] = useState<Word[]>([]);
  const [testingId, setTestingId] = useState("");

  return (
    <>
      <Container
        sx={{
          display: "flex",
          mt: 10,
          mb: 4,
          justifyContent: "center",
          p: 0,
        }}
      >
        {Boolean(testingId) ? (
          <TestCard
            testingId={testingId}
            testWords={testWords}
            updateIsTestingState={() => setTestingId("")}
          />
        ) : (
          <Stack
            gap={2}
            sx={{
              width: "90%",
            }}
          >
            {Object.entries(categories).map(([key, { title, words }]) => (
              <WordCard
                key={key}
                title={title}
                words={words}
                openAddWordModal={() => setFocusedId(key)}
                updateIsTestingState={() => {
                  setTestWords(getRandom(words));
                  setTestingId(key);
                }}
              />
            ))}
          </Stack>
        )}
      </Container>

      <Modal open={Boolean(focusedId)} onClose={() => setFocusedId("")}>
        <AddItemModal
          addItem={(value) => {
            const updatedItem = categories[focusedId];
            updatedItem.words = [...updatedItem.words, value];
            setCategories({ ...categories, [focusedId]: updatedItem });
            setFocusedId("");
          }}
        />
      </Modal>
    </>
  );
};
