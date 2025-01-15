import {
  Button,
  Card,
  Collapse,
  Container,
  Divider,
  IconButton,
  Paper,
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

export type Word = { newWord: string; knownWord: string };

const columnHelper = createColumnHelper<Word>();

const columns = [
  columnHelper.accessor((row) => row.newWord, {
    id: "newWord",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.knownWord, {
    id: "knownWord",
    cell: (info) => <i>{info.getValue()}</i>,
  }),
];

export const Home = () => {
  const [words] = useLocalStorage<Word[]>("words", []);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const table = useReactTable({
    data: words,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (words.length === 0) return null;

  return (
    <Container
      sx={{
        display: "flex",
        marginTop: 4,
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
          {words.map(({ knownWord, newWord }, index) => (
            <TestItem key={index} knownWord={knownWord} newWord={newWord} />
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
              onClick={() => setIsTesting(true)}
            >
              Test
            </Button>
          </Stack>

          <Collapse in={isCollapsed}>
            <Divider />
            <TableContainer component={Paper}>
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
