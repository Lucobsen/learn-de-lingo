import { Container } from "@mui/material";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { TestCard } from "./TestCard";
import { WordCard } from "./WordCard";

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
  const [words] = useLocalStorage<Word[]>("words", []);
  const [testWords, setTestWords] = useState<Word[]>([]);
  const [isTesting, setIsTesting] = useState(false);

  if (words.length === 0) return null;

  return (
    <Container
      sx={{
        display: "flex",
        mt: 10,
        mb: 4,
        justifyContent: "center",
        p: 0,
      }}
    >
      {isTesting ? (
        <TestCard
          testWords={testWords}
          updateIsTestingState={() => setIsTesting(false)}
        />
      ) : (
        <WordCard
          updateTestWords={() => setTestWords(getRandom(words))}
          updateIsTestingState={() => setIsTesting(true)}
        />
      )}
    </Container>
  );
};
