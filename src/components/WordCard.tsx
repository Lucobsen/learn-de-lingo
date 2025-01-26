import {
  Box,
  Button,
  Card,
  Collapse,
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
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Word } from "./Home";
import { NewItemRow } from "./NewItemRow";
import { useLocalStorage } from "usehooks-ts";
import { Category } from "./modals/AddCategoryModal";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const columnHelper = createColumnHelper<Word>();

const getBarColor = (progress: number = 0) => {
  if (progress === 0) return "info";
  if (progress >= 25 && progress < 50) return "error";
  if (progress >= 50 && progress < 75) return "warning";
  if (progress >= 75) return "success";
};

const columns = [
  columnHelper.accessor((row) => row.newWord, {
    id: "newWord",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.knownWord, {
    id: "knownWord",
    cell: (info) => <i>{info.getValue()}</i>,
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

type WordCardProps = {
  id: string;
  title: string;
  words: Word[];
  updateIsTestingState: () => void;
};

export const WordCard = ({
  id,
  title,
  words,
  updateIsTestingState,
}: WordCardProps) => {
  const [categories, setCategories] = useLocalStorage<Record<string, Category>>(
    "categories",
    {}
  );
  const [isCollapsed, setIsCollapsed] = useState(false);

  const table = useReactTable({
    data: words,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDeleteWord = (wordId: string) => {
    const updatedItem = categories[id];
    const updatedWords = updatedItem.words.filter((word) => word.id !== wordId);

    setCategories({
      ...categories,
      [id]: { ...updatedItem, words: updatedWords },
    });
  };

  return (
    <Card
      sx={{
        p: 1,
        borderRadius: 1,
        border: ({ palette }) => `1px solid ${palette.primary.main}`,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center">
          <IconButton
            onClick={() => setIsCollapsed((previousValue) => !previousValue)}
          >
            {isCollapsed ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </IconButton>
          <Typography>{title}</Typography>
        </Stack>

        <Button
          variant="contained"
          disabled={words.length === 0}
          size="small"
          onClick={updateIsTestingState}
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
                  <TableCell padding="none" sx={{ py: 1, border: "none" }}>
                    <IconButton
                      sx={{ pr: 0 }}
                      color="error"
                      size="small"
                      onClick={() => handleDeleteWord(row.original.id)}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <NewItemRow
                addItem={(value) => {
                  const updatedItem = categories[id];
                  updatedItem.words = [...updatedItem.words, value];
                  setCategories({ ...categories, [id]: updatedItem });
                }}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>
    </Card>
  );
};
