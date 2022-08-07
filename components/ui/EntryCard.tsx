import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { FC } from "react";
import { Entry } from "../../interfaces";
import { useDispatch } from "react-redux";
import { toggleDragging } from "../../slices/UISlice";

interface props {
  entry: Entry;
}

export const EntryCard: FC<props> = ({ entry }) => {
  const dispatch = useDispatch();

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    dispatch(toggleDragging());
    e.dataTransfer.setData("text/plain", entry._id);
  };

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={() => dispatch(toggleDragging())}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
        >
          <Typography variant="body2">
            {dayjs(entry.createdAt).format("DD/MM/YYYY")}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
