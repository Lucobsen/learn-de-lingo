import {
  Button,
  Container,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { AddItemModal } from "./AddItemModal";
import { useLocalStorage } from "usehooks-ts";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

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
  const [words, setWords] = useLocalStorage<Word[]>("words", []);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const table = useReactTable({
    data: words,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Container
        sx={{
          display: "flex",
          marginTop: 5,
          justifyContent: "center",
          p: 0,
        }}
      >
        <Stack direction="column" gap={2} alignItems="center">
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{ minWidth: "200px" }}
          >
            Add New Vocab
          </Button>

          <TableContainer
            component={Paper}
            sx={{
              p: 2,
              borderRadius: 1,
              border: ({ palette }) => `1px solid ${palette.primary.main}`,
            }}
          >
            <Table sx={{ maxWidth: 300 }}>
              <TableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableCell key={header.id} padding="none" sx={{ pb: 1 }}>
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
        </Stack>
      </Container>

      <Modal open={open} onClose={handleClose}>
        <div>
          <AddItemModal
            addItem={(value) => {
              setWords((previousValue) => [...previousValue, value]);
              handleClose();
            }}
          />
        </div>
      </Modal>
    </>
  );
};
