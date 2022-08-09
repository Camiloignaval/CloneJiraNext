import { Card, CardHeader, Grid, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useEffect } from "react";
import { Layout } from "../components/layouts";
import { EntryList, NewEntry } from "../components/ui";
import { useGetEntriesQuery } from "../apis/entriesApi";
import { useDispatch } from "react-redux";
import { addEntry } from "../slices/entriesSlice";

const HomePage: NextPage = () => {
  const dispatch = useDispatch();
  const { data } = useGetEntriesQuery();

  useEffect(() => {
    // if (data && data?.length > 0) {
    //   data.map((entry) => dispatch(addEntry(entry)));
    // }
  }, [data, dispatch]);

  // setTimeout(() => {
  //   refetch();
  // }, 5000);

  return (
    <Layout title="Home CloneJira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Pendientes" />
            <NewEntry status="pending" />
            <EntryList status="pending" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="En Progreso" />
            <NewEntry status="in-progress" />

            <EntryList status="in-progress" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Completadas" />
            <NewEntry status="done" />

            <EntryList status="done" />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;
