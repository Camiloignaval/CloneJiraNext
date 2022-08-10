import { Card, CardHeader, Grid, Typography } from "@mui/material";
import type { NextPage } from "next";
import { Layout } from "../components/layouts";
import { EntryList, NewEntry } from "../components/ui";
import { useGetEntriesQuery } from "../apis/entriesApi";
import { useDispatch } from "react-redux";

const HomePage: NextPage = () => {
  const dispatch = useDispatch();
  const { data } = useGetEntriesQuery();

  return (
    <Layout title="Home CloneJira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader
              title="Pendientes"
              sx={{ flexDirection: "column", alignItems: "center" }}
            />
            <NewEntry status="pending" />
            <EntryList status="pending" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader
              sx={{
                height: 150,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              title="En Progreso"
            />
            {/* <NewEntry status="in-progress" /> */}

            <EntryList status="in-progress" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader
              title="Completadas"
              sx={{
                height: 150,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            />
            {/* <NewEntry status="done" /> */}

            <EntryList status="done" />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;
