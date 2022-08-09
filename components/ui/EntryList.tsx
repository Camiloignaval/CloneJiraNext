import { List, Paper } from "@mui/material";
import React, { FC, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChargingScreen } from ".";
import {
  useGetEntriesQuery,
  useUpdateEntryMutation,
} from "../../apis/entriesApi";
import { EntryState } from "../../interfaces";
import { toggleDragging } from "../../slices/UISlice";
import { RootState } from "../../store";
import { EntryCard } from "./EntryCard";
import styles from "./EntryList.module.css";

interface EntryListProps {
  status: EntryState;
}
export const EntryList: FC<EntryListProps> = ({ status }) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetEntriesQuery();
  const [updateEntry] = useUpdateEntryMutation();

  const { isDragging } = useSelector((state: RootState) => state.UI);

  const entriesByStatus = useMemo(
    () => (data ?? []).filter((entry) => entry.status === status),
    [data, status]
  );

  const onDropEntry = (e: React.DragEvent<HTMLDivElement>) => {
    const entryId = e.dataTransfer.getData("text/plain");
    dispatch(toggleDragging());
    updateEntry({ _id: entryId, status });
  };

  return (
    <div onDrop={onDropEntry} onDragOver={(e) => e.preventDefault()}>
      {isLoading && <ChargingScreen />}

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
