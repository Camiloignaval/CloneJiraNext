import { Box, Button, TextField } from "@mui/material";
import React, { FC } from "react";
import SaveIcon from "@mui/icons-material/Save";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addEntry } from "../../slices/entriesSlice";
import { EntryState } from "../../interfaces";
import { v4 as uuidv4 } from "uuid";

interface props {
  status: EntryState;
}

export const NewEntry: FC<props> = ({ status }) => {
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setinputValue] = useState("");
  const [touched, setTouched] = useState(false);

  const onSave = () => {
    dispatch(
      addEntry({
        description: inputValue,
        status,
        _id: uuidv4(),
        updatedAt: Date.now(),
        createdAt: Date.now(),
      })
    );
    setinputValue("");
    setIsAdding(false);
    setTouched(false);
  };

  return (
    <Box sx={{ marginBottom: 2, padding: 2 }}>
      {!isAdding ? (
        <Button
          onClick={() => setIsAdding(true)}
          startIcon={<PostAddIcon />}
          fullWidth
          variant="outlined"
        >
          Agregar Nueva Entrada
        </Button>
      ) : (
        <>
          <TextField
            required
            value={inputValue}
            onChange={(e) => setinputValue(e.target.value)}
            sx={{ marginTop: 2, marginBottom: 1 }}
            error={touched && inputValue.length === 0}
            helperText={
              touched && inputValue.length === 0 ? "Campo requerido" : ""
            }
            fullWidth
            autoFocus
            multiline
            onBlur={() => setTouched(true)}
            label="Nueva entrada"
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={() => setIsAdding(false)}
              variant="text"
              color="secondary"
            >
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveIcon />}
              disabled={inputValue.length === 0}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};
