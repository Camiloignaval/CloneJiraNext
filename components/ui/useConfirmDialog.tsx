import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useDeleteEntryMutation } from "../../apis/entriesApi";
import { useRouter } from "next/router";

export const useConfirmDialog = (id: string) => {
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [deleteEntry] = useDeleteEntryMutation();
  const router = useRouter();

  const aceptDialog = async () => {
    setShowConfirm(false);

    const resp = await deleteEntry({ _id: id });
    if (resp.data) {
      router.push("/");
    }
  };

  const ConfirmDialog = () => (
    <div>
      <Dialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Estás seguro de eliminar esta tarea?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta acción sera irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirm(false)}>Cancelar</Button>
          <Button onClick={aceptDialog} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  return { ConfirmDialog, setShowConfirm };
};
