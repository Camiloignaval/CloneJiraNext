interface seedData {
  entries: seedEntry[];
}

interface seedEntry {
  description: string;
  status: string;
}

export const seedData: seedData = {
  entries: [
    {
      description: "Learn about GraphQL",
      status: "pending",
    },
    {
      description: "Learn about React",
      status: "done",
    },
    {
      description: "Learn about Node",
      status: "in-progress",
    },
  ],
};
