import {
  capitalize,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { GetServerSideProps } from "next";

import { Layout } from "../../components/layouts";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { EntryState, Entry } from "../../interfaces";
import { FC, useMemo, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { dbEntries } from "../../database";
import { useUpdateEntryMutation } from "../../apis/entriesApi";
import { dateFunction } from "../../utils";
import { useConfirmDialog } from "../../components/ui/useConfirmDialog";

const validStatus: EntryState[] = ["pending", "in-progress", "done"];

interface Props {
  entry: Entry;
}

export const EntryPage: FC<Props> = ({ entry }) => {
  const [inputValue, setinputValue] = useState(entry.description);
  const [status, setStatus] = useState(entry.status);
  const [touch, setTouch] = useState(false);
  const [updateEntry, updateEntryState] = useUpdateEntryMutation();
  // const [showPopOver, setshowPopOver] = useState(false);
  const { ConfirmDialog, setShowConfirm } = useConfirmDialog(entry._id);

  const isNotValid = useMemo(
    () => inputValue.length === 0 && touch,
    [inputValue, touch]
  );

  return (
    <Layout title={inputValue.substring(0, 20) + "..."}>
      <>
        <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
          <Grid item xs={12} sm={8} md={6}>
            <Card>
              <CardHeader
                title={`Entrada:`}
                subheader={`Creada ${dateFunction.getFormatDistanceToNow(
                  Date.parse(entry.createdAt.toString())
                )}`}
              />
              <CardContent>
                <TextField
                  sx={{ marginTop: 2, marginBottom: 1 }}
                  fullWidth
                  placeholder="Nueva entrada"
                  multiline
                  autoFocus
                  label="Nueva entrada"
                  value={inputValue}
                  onChange={(e) => setinputValue(e.target.value)}
                  helperText={isNotValid ? "Campo obligatorio" : ""}
                  onBlur={() => setTouch(true)}
                  error={isNotValid}
                />
                <FormControl>
                  <FormLabel>Estado:</FormLabel>
                  <RadioGroup
                    row
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {validStatus.map((status) => (
                      <FormControlLabel
                        key={status}
                        value={status}
                        control={<Radio />}
                        label={capitalize(status)}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </CardContent>
              <CardActions>
                <LoadingButton
                  loading={updateEntryState.isLoading}
                  endIcon={<SaveOutlinedIcon />}
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() =>
                    updateEntry({
                      _id: entry._id,
                      description: inputValue,
                      status,
                    })
                  }
                  disabled={inputValue.length === 0}
                >
                  Guardar
                </LoadingButton>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        <IconButton
          onClick={() => setShowConfirm(true)}
          sx={{
            position: "fixed",
            bottom: 30,
            right: 30,
            backgroundColor: "red",
          }}
        >
          <DeleteOutlineIcon />
        </IconButton>
        <ConfirmDialog />
      </>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // const { data } = await  // your fetch function here
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);
  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { entry },
  };
};

export default EntryPage;
