export interface Entry {
  _id: string;
  description: string;
  createdAt: number;
  updatedAt: number;
  status: string;
}

export type EntryState = "pending" | "in-progress" | "done";
