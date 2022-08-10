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
import { useRouter } from "next/router";
import { dateFunction } from "../../utils";

interface props {
  entry: Entry;
}

export const EntryCard: FC<props> = ({ entry }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    dispatch(toggleDragging());
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ _id: entry._id, status: entry.status })
    );
  };

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={() => dispatch(toggleDragging())}
      onClick={() => router.push(`/entries/${entry._id}`)}
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
            {/* {dayjs(entry.createdAt).format("DD/MM/YYYY")} */}
            {dateFunction.getFormatDistanceToNow(
              Date.parse(entry.createdAt.toString())
            )}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
