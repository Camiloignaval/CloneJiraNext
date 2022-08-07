import { List, Paper } from "@mui/material";
import React, { FC, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntryState } from "../../interfaces";
import { changeStatus } from "../../slices/entriesSlice";
import { toggleDragging } from "../../slices/UISlice";
import { RootState } from "../../store";
import { EntryCard } from "./EntryCard";
import styles from "./EntryList.module.css";

interface EntryListProps {
  status: EntryState;
}
export const EntryList: FC<EntryListProps> = ({ status }) => {
  const dispatch = useDispatch();
  const {
    UI: { isDragging },
    entries: { entries },
  } = useSelector((state: RootState) => state);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status]
  );

  const onDropEntry = (e: React.DragEvent<HTMLDivElement>) => {
    const entryId = e.dataTransfer.getData("text/plain");
    dispatch(toggleDragging());
    dispatch(changeStatus({ id: entryId, status }));
  };

  return (
    <div onDrop={onDropEntry} onDragOver={(e) => e.preventDefault()}>
      <Paper
        sx={{
          height: "calc(100vh - 180px)",
          overflow: "auto",
          backgroundColor: "transparent",
          padding: "1px 5px",
        }}
        className={isDragging ? styles.dragging : ""}
      >
        <List>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default EntryList;
