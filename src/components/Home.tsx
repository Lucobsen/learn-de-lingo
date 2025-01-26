import { Container, Stack } from "@mui/material";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { TestCard } from "./TestCard";
import { WordCard } from "./WordCard";
import { Category } from "./modals/AddCategoryModal";

export type Word = {
  id: string;
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
  const [categories] = useLocalStorage<Record<string, Category>>(
    "categories",
    {}
  );

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
            {Object.entries(categories).map(([key, { id, title, words }]) => (
              <WordCard
                key={key}
                id={id}
                title={title}
                words={words}
                updateIsTestingState={() => {
                  setTestWords(getRandom(words));
                  setTestingId(key);
                }}
              />
            ))}
          </Stack>
        )}
      </Container>
    </>
  );
};
