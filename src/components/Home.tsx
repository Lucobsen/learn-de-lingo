import {
  Card,
  Collapse,
  Container,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
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

export type Word = { newWord: string; knownWord: string };

const columnHelper = createColumnHelper<Word>();

const columns = [
  columnHelper.accessor((row) => row.newWord, {
    id: "newWord",
    cell: (info) => info.getValue(),
    header: () => <span>New Word</span>,
  }),
  columnHelper.accessor((row) => row.knownWord, {
    id: "knownWord",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Known Word</span>,
  }),
];

export const Home = () => {
  const [words] = useLocalStorage<Word[]>("words", []);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const table = useReactTable({
    data: words,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Container
      sx={{
        display: "flex",
        marginTop: 5,
        justifyContent: "center",
        p: 0,
      }}
    >
      <Stack direction="column" gap={2} alignItems="center">
        {words.length > 0 && (
          <Card
            sx={{
              p: 1,
              width: 300,
              borderRadius: 1,
              border: ({ palette }) => `1px solid ${palette.primary.main}`,
            }}
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

            <Collapse in={isCollapsed}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableCell
                            key={header.id}
                            padding="none"
                            sx={{ pb: 1 }}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableHead>
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
      </Stack>
    </Container>
  );
};
