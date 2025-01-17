import {
  Box,
  Button,
  Card,
  Collapse,
  Container,
  Divider,
  IconButton,
  LinearProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TestItem } from "./TestItem";

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

const columnHelper = createColumnHelper<Word>();

const getBarColor = (progress: number = 0) => {
  if (progress === 0) return "info";
  if (progress < 25) return "error";
  if (progress >= 25 && progress < 75) return "warning";
  if (progress >= 75) return "success";
};

const columns = [
  columnHelper.accessor((row) => row.newWord, {
    id: "newWord",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.knownWord, {
    id: "knownWord",
    cell: (info) => (
      <Box textAlign="center">
        <i>{info.getValue()}</i>
      </Box>
    ),
  }),
  columnHelper.accessor((row) => row.score, {
    id: "score",
    cell: (info) => (
      <Box sx={{ minWidth: 100 }}>
        <LinearProgress
          variant="determinate"
          color={getBarColor(info.getValue())}
          value={info.getValue()}
        />
      </Box>
    ),
  }),
];

export const Home = () => {
  const [words, setWords] = useLocalStorage<Word[]>("words", []);
  const [testWords, setTestWords] = useState<Word[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const table = useReactTable({
    data: words,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (words.length === 0) return null;

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
            onClick={() => setIsTesting(false)}
          >
            Close
          </Button>
        </Card>
      ) : (
        <Card
          sx={{
            p: 1,
            width: 300,
            borderRadius: 1,
            border: ({ palette }) => `1px solid ${palette.primary.main}`,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center">
              <IconButton
                onClick={() =>
                  setIsCollapsed((previousValue) => !previousValue)
                }
              >
                {isCollapsed ? <ExpandMoreIcon /> : <ChevronRightIcon />}
              </IconButton>
              <Typography>Vocab</Typography>
            </Stack>

            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                setTestWords(getRandom(words));
                setIsTesting(true);
              }}
            >
              Test
            </Button>
          </Stack>

          <Collapse in={isCollapsed}>
            <Divider />
            <TableContainer sx={{ maxHeight: 300 }}>
              <Table>
                <TableBody>
                  {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          padding="none"
                          sx={{ py: 1, border: "none" }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Collapse>
        </Card>
      )}
    </Container>
  );
};
